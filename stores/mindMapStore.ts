import { defineStore } from "pinia";
import type { Node, Edge } from "@vue-flow/core";
import { layoutMindMap } from "~/composables/useMindMapLayout";

type NodeLevel =
  | "CoreMarket"
  | "Category"
  | "Subcategory"
  | "Niche"
  | "SubNiche";

export interface MindMapNode extends Node {
  parentNode?: string;
  data: {
    label: string;
    level: NodeLevel;
    iconName?: string;
    children?: MindMapNode[];
    isExpanded?: boolean;
    edgeLabel?: string;
  };
}

// Start with all nodes collapsed by default
const initialNodes: MindMapNode[] = [
  {
    id: "health",
    type: "custom",
    data: {
      label: "Saúde",
      level: "CoreMarket",
      iconName: "heart",
      isExpanded: false,
      children: [
        {
          id: "nutrition",
          type: "custom",
          data: {
            label: "Nutrição e dieta",
            level: "Category",
            isExpanded: false,
            edgeLabel: "Nutrição e dieta",
            children: [
              {
                id: "diets",
                type: "custom",
                data: {
                  label: "Dietas",
                  level: "Subcategory",
                  isExpanded: false,
                  edgeLabel: "Dietas",
                  children: [
                    {
                      id: "low-carb",
                      type: "custom",
                      data: {
                        label: "Low-carb",
                        level: "Niche",
                        isExpanded: false,
                        edgeLabel: "Low-carb",
                        children: [
                          {
                            id: "low-carb-diabeticos",
                            type: "custom",
                            data: {
                              label: "Receitas low-carb para diabéticos",
                              level: "SubNiche",
                              isExpanded: false,
                              edgeLabel: "Receitas low-carb p/ diabéticos",
                              children: [],
                            },
                            position: { x: 0, y: 0 },
                          },
                        ],
                      },
                      position: { x: 0, y: 0 },
                    },
                    {
                      id: "plant-based",
                      type: "custom",
                      data: {
                        label: "Plant-based",
                        level: "Niche",
                        isExpanded: false,
                        edgeLabel: "Plant-based",
                        children: [
                          {
                            id: "cardapios-economicos",
                            type: "custom",
                            data: {
                              label: "Cardápios semanais econômicos",
                              level: "SubNiche",
                              isExpanded: false,
                              edgeLabel: "Cardápios econômicos",
                              children: [],
                            },
                            position: { x: 0, y: 0 },
                          },
                        ],
                      },
                      position: { x: 0, y: 0 },
                    },
                  ],
                },
                position: { x: 0, y: 0 },
              },
              {
                id: "supplementation",
                type: "custom",
                data: {
                  label: "Suplementação",
                  level: "Subcategory",
                  isExpanded: false,
                  edgeLabel: "Suplementação",
                  children: [
                    {
                      id: "performance",
                      type: "custom",
                      data: {
                        label: "Performance esportiva",
                        level: "Niche",
                        isExpanded: false,
                        edgeLabel: "Performance esportiva",
                        children: [
                          {
                            id: "creatina-iniciantes",
                            type: "custom",
                            data: {
                              label: "Creatina para iniciantes",
                              level: "SubNiche",
                              isExpanded: false,
                              edgeLabel: "Creatina p/ iniciantes",
                              children: [],
                            },
                            position: { x: 0, y: 0 },
                          },
                        ],
                      },
                      position: { x: 0, y: 0 },
                    },
                  ],
                },
                position: { x: 0, y: 0 },
              },
            ],
          },
          position: { x: 0, y: 0 },
        },
        {
          id: "mental-wellness",
          type: "custom",
          data: {
            label: "Bem estar mental",
            level: "Category",
            isExpanded: false,
            edgeLabel: "Bem estar mental",
            children: [],
          },
          position: { x: 0, y: 0 },
        },
        {
          id: "fitness",
          type: "custom",
          data: {
            label: "Fitness e atividade física",
            level: "Category",
            isExpanded: false,
            edgeLabel: "Fitness e atividade física",
            children: [],
          },
          position: { x: 0, y: 0 },
        },
      ],
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "wealth",
    type: "custom",
    data: {
      label: "Prosperidade",
      level: "CoreMarket",
      isExpanded: false,
      children: [],
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "relationships",
    type: "custom",
    data: {
      label: "Relacionamentos",
      level: "CoreMarket",
      isExpanded: false,
      children: [],
    },
    position: { x: 0, y: 0 },
  },
];

export const useMindMapStore = defineStore("mindMap", {
  state: () => ({
    activeNodeId: null as string | null, // Track which node should show the overlay
    nodes: initialNodes,
  }),

  getters: {
    // Nós posicionados para o Vue Flow
    flowNodes(state): Node[] {
      const allNodes: Node[] = [];

      const flattenVisible = (root: MindMapNode) => {
        const outNodes: MindMapNode[] = [];
        const outEdges: Edge[] = [];

        const walk = (node: MindMapNode) => {
          outNodes.push({ ...node });
          if (node.data.isExpanded && node.data.children?.length) {
            for (const child of node.data.children) {
              child.parentNode = node.id;
              outEdges.push({
                id: `edge-${node.id}-${child.id}`,
                source: node.id,
                target: child.id,
                type: "smoothstep",
                style: { stroke: "#6b7280", strokeWidth: 1.5 },
                animated: false,
                data: { label: child.data?.edgeLabel },
              } as Edge);
              walk(child);
            }
          }
        };

        walk(root);
        return { nodes: outNodes, edges: outEdges };
      };

      // gaps por nível (colunas) — pode ajustar à vontade
      const levelGaps = [380, 320, 260, 220, 200];
      const rowGaps = [140, 120, 100, 84, 72];

      // Para cada root, achata, faz layout e junta
      state.nodes.forEach((root: MindMapNode, idx: number) => {
        const { nodes, edges } = flattenVisible(root);
        if (!nodes.length) return;

        const positioned = layoutMindMap(nodes, edges, {
          rootId: root.id,
          levelGap: 320,
          rowGap: 120,
          levelGaps,
          rowGaps,
          center: { x: 160, y: 200 + idx * 220 },
        }) as MindMapNode[];

        // garante que ao menos o root apareça mesmo se algo falhar
        if (!positioned || positioned.length === 0) {
          allNodes.push({
            ...root,
            position: { x: 160, y: 200 + idx * 220 },
            draggable: false,
            selectable: false,
          } as MindMapNode);
          return;
        }

        positioned.forEach((n) => allNodes.push(n));
      });

      // fallback global: renderiza roots mesmo se nada vier
      if (allNodes.length === 0 && state.nodes?.length) {
        state.nodes.forEach((root: MindMapNode, idx: number) => {
          allNodes.push({
            ...root,
            position: { x: 160, y: 200 + idx * 220 },
            draggable: false,
            selectable: false,
          } as MindMapNode);
        });
      }

      return allNodes;
    },

    // Arestas derivadas dos nós visíveis/expandidos
    flowEdges(state): Edge[] {
      const allEdges: Edge[] = [];

      const collect = (root: MindMapNode) => {
        const outEdges: Edge[] = [];
        const walk = (node: MindMapNode) => {
          if (node.data.isExpanded && node.data.children?.length) {
            for (const child of node.data.children) {
              outEdges.push({
                id: `edge-${node.id}-${child.id}`,
                source: node.id,
                target: child.id,
                type: "smoothstep",
                style: { stroke: "#6b7280", strokeWidth: 1.5 },
                animated: false,
                data: { label: child.data?.edgeLabel },
              } as Edge);
              walk(child);
            }
          }
        };
        walk(root);
        return outEdges;
      };

      state.nodes.forEach((root: MindMapNode) => {
        collect(root).forEach((e) => allEdges.push(e));
      });

      return allEdges;
    },
  },

  actions: {
    setActiveNode(nodeId: string | null) {
      this.activeNodeId = nodeId;
    },
    clearActiveNode() {
      this.activeNodeId = null;
    },
    toggleNode(nodeId: string) {
      const findAndToggle = (nodes: MindMapNode[]): boolean => {
        for (const node of nodes) {
          if (node.id === nodeId) {
            node.data.isExpanded = !node.data.isExpanded;
            return true;
          }
          if (node.data.children && findAndToggle(node.data.children)) {
            return true;
          }
        }
        return false;
      };
      findAndToggle(this.nodes);
    },

    // Opcional: usados quando o Vue Flow tenta escrever via v-model
    replaceFlowNodes(_val: Node[]) {
      // no-op: posições são derivadas pelo layout
    },
    replaceFlowEdges(_val: Edge[]) {
      // no-op: edges são derivadas da árvore
    },
  },
});
