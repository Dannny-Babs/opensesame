import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface MacroNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: { label: string };
}

export interface MacroEdge {
  id: string;
  source: string;
  target: string;
}

export interface Macro {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused" | "draft";
  lastRun: string;
  executions: number;
  nodes: MacroNode[];
  edges: MacroEdge[];
}

export interface MacroMetrics {
  macroId: string;
  totalRuns: number;
  successRate: number;
  averageRunTime: number;
  lastRun: string;
  errorCount: number;
  dailyRuns: Array<{
    date: string;
    runs: number;
    successes: number;
    failures: number;
  }>;
  nodeMetrics: Array<{
    nodeId: string;
    name: string;
    executions: number;
    successRate: number;
    averageTime: number;
  }>;
}

// Hook to fetch all macros
export function useMacros() {
  return useQuery({
    queryKey: ["macros"],
    queryFn: async (): Promise<Macro[]> => {
      const response = await fetch("/api/macros");
      if (!response.ok) {
        throw new Error("Failed to fetch macros");
      }
      return response.json();
    },
  });
}

// Hook to fetch macro metrics by ID
export function useMacroMetrics(macroId: string) {
  return useQuery({
    queryKey: ["macros", macroId, "metrics"],
    queryFn: async (): Promise<MacroMetrics> => {
      const response = await fetch(`/api/macros/${macroId}/metrics`);
      if (!response.ok) {
        throw new Error("Failed to fetch macro metrics");
      }
      return response.json();
    },
    enabled: !!macroId,
  });
}

// Hook to create a new macro
export function useCreateMacro() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newMacro: Partial<Macro>): Promise<Macro> => {
      const response = await fetch("/api/macros", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMacro),
      });
      if (!response.ok) {
        throw new Error("Failed to create macro");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["macros"] });
    },
  });
}
