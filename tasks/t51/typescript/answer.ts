type Edge = { source: any; target: any } | [any, any];

class Graph {
  private adj = new Map<any, Set<any>>();

  constructor(edges: Edge[]) {
    edges.forEach(edge => {
      const [source, target] = Array.isArray(edge) ? edge : [edge.source, edge.target];
      if (!this.adj.has(source)) this.adj.set(source, new Set());
      if (!this.adj.has(target)) this.adj.set(target, new Set());
      this.adj.get(source)!.add(target);
    });
  }

  public cyclesBySize(filterRepeatNodes: boolean = true): Record<number, SimpleSubgraph[]> {
    const allCycles = this.findAllSimpleCycles().filter(cycle => cycle.length > 2);
    const cycles = filterRepeatNodes
      ? allCycles.filter(cycle => new Set(cycle).size === cycle.length)
      : allCycles;
    const seen = new Set<string>();
    const result: Record<number, SimpleSubgraph[]> = {};

    cycles.forEach(cycle => {
      const key = canonicalCycle(cycle).map(String).join(',');
      if (seen.has(key)) return;
      seen.add(key);
      const size = cycle.length;
      if (!result[size]) result[size] = [];
      result[size].push(new SimpleSubgraph(cycle));
    });

    return result;
  }

  private findAllSimpleCycles(): any[][] {
    const cycles: any[][] = [];
    for (const start of this.adj.keys()) {
      const stack = [start];
      const visit = (node: any) => {
        for (const next of this.adj.get(node) || []) {
          if (next === start && stack.length > 1) {
            cycles.push([...stack]);
          } else if (!stack.includes(next)) {
            stack.push(next);
            visit(next);
            stack.pop();
          }
        }
      };
      visit(start);
    }
    return cycles;
  }
}

class SimpleSubgraph {
  constructor(private readonly values: any[]) {}

  public nodes(): any[] {
    return this.values;
  }
}

function canonicalCycle(cycle: any[]): any[] {
  let best = cycle;
  for (let i = 1; i < cycle.length; i++) {
    const rotated = cycle.slice(i).concat(cycle.slice(0, i));
    if (JSON.stringify(rotated) < JSON.stringify(best)) best = rotated;
  }
  return best;
}
