import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  // Mock metrics data - replace with actual database queries
  const metrics = {
    macroId: id,
    totalRuns: Math.floor(Math.random() * 1000) + 100,
    successRate: Math.random() * 30 + 70, // 70-100%
    averageRunTime: Math.floor(Math.random() * 30) + 5, // 5-35 seconds
    lastRun: new Date(
      Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
    ).toISOString(),
    errorCount: Math.floor(Math.random() * 20),
    dailyRuns: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      runs: Math.floor(Math.random() * 50) + 10,
      successes: Math.floor(Math.random() * 40) + 8,
      failures: Math.floor(Math.random() * 5),
    })).reverse(),
    nodeMetrics: [
      {
        nodeId: "start-1",
        name: "Send Welcome Email",
        executions: Math.floor(Math.random() * 500) + 100,
        successRate: Math.random() * 20 + 80,
        averageTime: Math.floor(Math.random() * 10) + 2,
      },
      {
        nodeId: "decision-1",
        name: "User Responded?",
        executions: Math.floor(Math.random() * 500) + 100,
        successRate: Math.random() * 15 + 85,
        averageTime: Math.floor(Math.random() * 5) + 1,
      },
    ],
  };

  return NextResponse.json(metrics);
}
