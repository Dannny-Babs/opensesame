import { Node, Edge } from "@xyflow/react";

export const initialNodes: Node[] = [
  {
    id: "1",
    type: "action",
    data: { label: "Start" },
    position: { x: 100, y: 100 },
  },
  {
    id: "2",
    type: "condition",
    data: { label: "Check Status" },
    position: { x: 300, y: 200 },
  },
  {
    id: "3",
    type: "action",
    data: { label: "Send Email" },
    position: { x: 500, y: 100 },
  },
];

export const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: true,
  },
];
