import { defineStore } from "pinia";
import type { Node, Edge, XYPosition } from "@vue-flow/core";

// Interface para os dados extras dos nós
export interface MindMapNodeData {
  label: string;
  children?: MindMapNode[];
  isExpanded?: boolean;
}

// Definindo o tipo para os nossos nós, que terão dados extras
export interface MindMapNode extends Node<MindMapNodeData> {
  data: MindMapNodeData;
  position: XYPosition;
  id: string;
  type?: string;
}

// Type guard para verificar se um nó é um MindMapNode
function isMindMapNode(node: any): node is MindMapNode {
  return node && 
         typeof node === 'object' && 
         'id' in node && 
         'data' in node && 
         'position' in node &&
         typeof node.position === 'object' &&
         node.position !== null &&
         'x' in node.position &&
         'y' in node.position;
}

// Dados iniciais para o mind map (mock)
const initialNodes: MindMapNode[] = [
  {
    id: "health",
    type: "custom",
    data: {
      label: "Saúde",
      children: [
        {
          id: "nutrition",
          type: "custom",
          data: { label: "Nutrição e Dieta", children: [] },
          position: { x: 0, y: 0 },
        },
        {
          id: "mental-wellness",
          type: "custom",
          data: { label: "Bem estar mental", children: [] },
          position: { x: 0, y: 0 },
        },
        {
          id: "fitness",
          type: "custom",
          data: { label: "Fitness e Atividade Física", children: [] },
          position: { x: 0, y: 0 },
        },
      ],
    },
    position: { x: 50, y: 200 },
  },
  {
    id: "wealth",
    type: "custom",
    data: { label: "Prosperidade", children: [] },
    position: { x: 50, y: 300 },
  },
  {
    id: "relationships",
    type: "custom",
    data: { label: "Relacionamentos", children: [] },
    position: { x: 50, y: 400 },
  },
];

export const useMindMapStore = defineStore("mindMap", {
  state: () => ({
    nodes: initialNodes as MindMapNode[],
  }),

  getters: {
    // Getter que "achata" a árvore de nós e calcula as arestas dinamicamente
    visibleElements: (state): (MindMapNode | Edge)[] => {
      const elements: (MindMapNode | Edge)[] = [];
      const nodeMap = new Map<string, MindMapNode>(state.nodes.map((n: MindMapNode) => [n.id, n]));

      function traverse(
        node: MindMapNode,
        parentPosition: XYPosition,
        level = 0
      ) {
        // Lógica de layout simples para o mind map
        const xOffset = 250;
        const yGap = 120;

        node.position = {
          x: parentPosition.x + xOffset * level,
          y: parentPosition.y,
        };

        elements.push(node);

        if (node.data.isExpanded && node.data.children) {
          const childrenCount = node.data.children.length;
          const totalHeight = (childrenCount - 1) * yGap;
          let startY = node.position.y - totalHeight / 2;

          node.data.children.forEach((childNode) => {
            const existingNode = nodeMap.get(childNode.id);
          const childFull = existingNode || {
            ...childNode,
            position: { x: 0, y: 0 },
            data: { 
              ...childNode.data,
              children: childNode.data.children || []
            }
          } as MindMapNode;
          
          childFull.position = { 
            x: node.position.x + xOffset, 
            y: startY 
          };

          elements.push({
            id: `edge-${node.id}-${childFull.id}`,
            source: node.id,
            target: childFull.id,
            type: "smoothstep",
          });

            traverse(
              childFull,
              { x: node.position.x + xOffset, y: startY },
              level + 1
            );
            startY += yGap;
          });
        }
      }

      // Itera sobre os nós raiz
      state.nodes.forEach((rootNode: MindMapNode, index: number) => {
        if (isMindMapNode(rootNode)) {
          const rootYPosition = 200 + index * 150; // Espaçamento vertical entre os nós raiz
          traverse(rootNode, { x: 50, y: rootYPosition }, 0);
        }
      });

      return elements;
    },
  },

  actions: {
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
  },
});
