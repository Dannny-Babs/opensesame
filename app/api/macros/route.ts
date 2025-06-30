import { NextResponse } from "next/server";

export async function GET() {
  // Mock data - replace with actual database queries
  const macros = [
    {
      id: "1",
      name: "Welcome Flow",
      description: "Automated onboarding sequence for new users",
      status: "active",
      lastRun: "2 hours ago",
      executions: 45,
      nodes: [
        {
          id: "start-1",
          type: "apiAgent",
          position: { x: 100, y: 100 },
          data: { label: "Send Welcome Email" },
        },
        {
          id: "decision-1",
          type: "decision",
          position: { x: 300, y: 100 },
          data: { label: "User Responded?" },
        },
      ],
      edges: [
        {
          id: "e1-2",
          source: "start-1",
          target: "decision-1",
        },
      ],
    },
    {
      id: "2",
      name: "Order Processing",
      description: "Handle customer orders and send notifications",
      status: "active",
      lastRun: "30 minutes ago",
      executions: 128,
      nodes: [],
      edges: [],
    },
    {
      id: "3",
      name: "Email Campaign",
      description: "Send marketing emails to segmented audiences",
      status: "paused",
      lastRun: "1 day ago",
      executions: 89,
      nodes: [],
      edges: [],
    },
  ];

  return NextResponse.json(macros);
}

export async function POST(request: Request) {
  const body = await request.json();

  // Mock creating a new macro
  const newMacro = {
    id: Date.now().toString(),
    name: body.name || "New Macro",
    description: body.description || "",
    status: "draft",
    lastRun: "Never",
    executions: 0,
    nodes: body.nodes || [],
    edges: body.edges || [],
  };

  return NextResponse.json(newMacro, { status: 201 });
}
