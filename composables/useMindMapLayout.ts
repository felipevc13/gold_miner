import type { Node, Edge, XYPosition } from "@vue-flow/core";

// Semantic levels supported when present in node.data.level
export type NodeLevel =
  | "CoreMarket"
  | "Category"
  | "Subcategory"
  | "Niche"
  | "SubNiche";

const LEVEL_ORDER: Record<NodeLevel, number> = {
  CoreMarket: 0,
  Category: 1,
  Subcategory: 2,
  Niche: 3,
  SubNiche: 4,
};

type LayoutOpts = {
  rootId: string;
  /** Base horizontal distance between columns (used if no levelGaps provided) */
  levelGap?: number;
  /** Base vertical distance between siblings (used if no rowGaps provided) */
  rowGap?: number;
  /** Where to place the root */
  center?: XYPosition;
  /** Optional per-column horizontal gaps; index == column */
  levelGaps?: number[];
  /** Optional per-column vertical gaps; index == column */
  rowGaps?: number[];
};

export function layoutMindMap(
  nodes: Node[],
  edges: Edge[],
  opts: LayoutOpts
): Node[] {
  const baseLevelGap = opts.levelGap ?? 280;
  const baseRowGap = opts.rowGap ?? 100;
  const center = opts.center ?? { x: 200, y: 200 };
  const levelGaps = opts.levelGaps ?? [];
  const rowGaps = opts.rowGaps ?? [];

  const getLevelGap = (col: number) => levelGaps[col] ?? baseLevelGap;
  const getRowGap = (col: number) => rowGaps[col] ?? baseRowGap;

  // Quick indices
  const nodeById = new Map<string, Node>();
  nodes.forEach((n) => nodeById.set(n.id, n));

  const children = new Map<string, string[]>();
  const parentOf = new Map<string, string>();
  edges.forEach((e) => {
    if (!children.has(e.source)) children.set(e.source, []);
    children.get(e.source)!.push(e.target);
    parentOf.set(e.target, e.source);
  });

  // BFS fallback levels starting at root
  const bfsLevel = new Map<string, number>();
  const q: Array<[string, number]> = [[opts.rootId, 0]];
  const seen = new Set<string>();
  while (q.length) {
    const [id, lvl] = q.shift()!;
    if (seen.has(id)) continue;
    seen.add(id);
    bfsLevel.set(id, lvl);
    const kids = children.get(id) ?? [];
    for (const kid of kids) q.push([kid, lvl + 1]);
  }

  // Column by semantic level when available, otherwise BFS
  const colOf = (id: string): number => {
    const n = nodeById.get(id);
    const lvlName = (n?.data as any)?.level as NodeLevel | undefined;
    if (lvlName && lvlName in LEVEL_ORDER) return LEVEL_ORDER[lvlName];
    return bfsLevel.get(id) ?? 0;
  };

  // Precompute cumulative X offsets per column
  const maxCol = Math.max(
    0,
    ...nodes.map((n) => {
      const lvlName = (n.data as any)?.level as NodeLevel | undefined;
      if (lvlName && lvlName in LEVEL_ORDER) return LEVEL_ORDER[lvlName];
      return bfsLevel.get(n.id) ?? 0;
    })
  );
  const colOffsetX: number[] = new Array(maxCol + 1).fill(0);
  for (let c = 1; c <= maxCol; c++) {
    colOffsetX[c] = colOffsetX[c - 1] + getLevelGap(c - 1);
  }

  // Position map we will fill
  const positioned = new Map<string, XYPosition>();

  // Place root so its visual center aligns to `center.y`
  const rootNode = nodeById.get(opts.rootId) as any;
  const rootLevel: string | undefined = rootNode?.data?.level;
  const fallbackRootH = rootLevel === "CoreMarket" ? 88 : 24;
  const rootH: number = rootNode?.dimensions?.height ?? fallbackRootH;
  positioned.set(opts.rootId, { x: center.x, y: center.y - rootH / 2 });

  // Walk columns from 1..max, group children by parent and stack around parent.y
  for (let c = 1; c <= maxCol; c++) {
    // collect all nodes that belong to column c
    const idsAtCol = nodes.map((n) => n.id).filter((id) => colOf(id) === c);

    if (!idsAtCol.length) continue;

    // group by parent to keep siblings together
    const groups = new Map<string, string[]>();
    for (const id of idsAtCol) {
      const p = parentOf.get(id);
      if (!p) continue;
      if (!groups.has(p)) groups.set(p, []);
      groups.get(p)!.push(id);
    }

    // position each group near its parent
    for (const [parentId, group] of groups) {
      // parent might not be in same column; ensure we have its position
      const pPos = positioned.get(parentId) ?? {
        x: center.x + colOffsetX[colOf(parentId)],
        y: center.y,
      };
      positioned.set(parentId, pPos);

      const x = center.x + colOffsetX[c];
      const gapY = getRowGap(c);
      const total = (group.length - 1) * gapY;

      // Parent visual midline
      const parentNode = nodeById.get(parentId) as any;
      const parentLevel: string | undefined = parentNode?.data?.level;
      // Fallback heights by level to approximate visual center when dimensions are not yet available
      const fallbackParentH =
        parentLevel === "CoreMarket"
          ? 88
          : /* Category / Subcategory / Niche / SubNiche (lightweight text) */ 24;

      const parentH: number = parentNode?.dimensions?.height ?? fallbackParentH;
      const parentCenterY = pPos.y + parentH / 2;

      // Provisional positions using tops spaced by gapY and a generic child height
      const firstChild = nodeById.get(group[0]) as any;
      const approxChildH: number = firstChild?.dimensions?.height ?? 24;
      const startY = parentCenterY - total / 2 - approxChildH / 2;

      // Stage provisional positions in an array to compute visual bbox
      const provisional = group.map((id, idx) => ({
        id,
        x,
        y: startY + idx * gapY,
      }));

      // Compute group visual bbox using measured heights when available
      let minY = Number.POSITIVE_INFINITY;
      let maxY = Number.NEGATIVE_INFINITY;
      const heights = new Map<string, number>();
      for (const { id, y } of provisional) {
        const child = nodeById.get(id) as any;
        const h = child?.dimensions?.height ?? approxChildH;
        heights.set(id, h);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y + h);
      }

      // Center group bbox midline to parent's center
      const groupCenterY = (minY + maxY) / 2;
      const deltaY = parentCenterY - groupCenterY;

      // Persist final positions (shifted by deltaY)
      for (const { id, x, y } of provisional) {
        const finalY = y + deltaY;
        positioned.set(id, { x, y: finalY });
      }
    }
  }

  // Ensure any nodes without parents (or ungrouped) still get a position by their column, stacking progressively
  const fallbackCountPerCol = new Map<number, number>();
  for (const n of nodes) {
    if (positioned.has(n.id)) continue;
    const c = colOf(n.id);
    const x = center.x + colOffsetX[c];
    const i = fallbackCountPerCol.get(c) ?? 0;
    const y = center.y + (i - 0.5) * getRowGap(c);
    fallbackCountPerCol.set(c, i + 1);
    positioned.set(n.id, { x, y });
  }

  // Return nodes with position applied
  return nodes.map((n) => {
    const p = positioned.get(n.id);
    return p ? { ...n, position: p, draggable: false } : n;
  });
}
