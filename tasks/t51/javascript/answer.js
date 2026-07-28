class Graph {
  constructor(edges) {
    this.adj = new Map();
    edges.forEach(([source, target]) => {
      if (!this.adj.has(source)) this.adj.set(source, new Set());
      if (!this.adj.has(target)) this.adj.set(target, new Set());
      this.adj.get(source).add(target);
    });
  }

  cyclesBySize(filterRepeatNodes = true) {
    const allCycles = this.findAllSimpleCycles().filter(cycle => cycle.length > 2);
    const cycles = filterRepeatNodes
      ? allCycles.filter(cycle => new Set(cycle).size === cycle.length)
      : allCycles;
    const seen = new Set();
    const uniqueCycles = [];
    cycles.forEach(cycle => {
      const key = canonicalCycle(cycle).join(',');
      if (!seen.has(key)) {
        seen.add(key);
        uniqueCycles.push(cycle);
      }
    });
    const uniqueCyclesBySize = {};

    uniqueCycles.forEach(cycle => {
      const size = cycle.length;
      if (!uniqueCyclesBySize[size]) {
        uniqueCyclesBySize[size] = [];
      }
      uniqueCyclesBySize[size].push(new SimpleSubgraph(cycle));
    });

    return uniqueCyclesBySize;
  }

  findAllSimpleCycles() {
    const cycles = [];
    const nodes = [...this.adj.keys()];
    nodes.forEach(start => {
      const stack = [start];
      const visit = node => {
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
    });
    return cycles;
  }
}

class SimpleSubgraph {
  constructor(nodes) {
    this._nodes = nodes;
  }

  nodes() {
    return this._nodes;
  }
}

function canonicalCycle(cycle) {
  let best = cycle;
  for (let i = 1; i < cycle.length; i++) {
    const rotated = cycle.slice(i).concat(cycle.slice(0, i));
    if (JSON.stringify(rotated) < JSON.stringify(best)) {
      best = rotated;
    }
  }
  return best;
}
