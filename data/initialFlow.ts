import { Node, Edge } from "@xyflow/react";

export const initialNodes: Node[] = [
  {
    id: "1",
    type: "apiAgent",
    data: { label: "Start" },
    position: { x: 100, y: 100 },
  },
  {
    id: "2",
    type: "decision",
    data: { label: "Check Status" },
    position: { x: 400, y: 200 },
  },
  {
    id: "3",
    type: "llmAgent",
    data: { label: "Send Email" },
    position: { x: 700, y: 100 },
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
