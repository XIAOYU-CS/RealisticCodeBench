describe('TestGraphCycles', () => {
  it('test_empty_graph', () => {
    const g = new Graph([]);
    const expected = {};
    expect(g.cyclesBySize()).toEqual(expected);
  });

  it('test_graph_no_cycles', () => {
    const g = new Graph([{ source: 1, target: 2 }, { source: 2, target: 3 }]);
    const expected = {};
    expect(g.cyclesBySize()).toEqual(expected);
  });

  it('test_ignores_self_loops_and_two_node_cycles', () => {
    const g = new Graph([{ source: 1, target: 1 }, { source: 1, target: 2 }, { source: 2, target: 1 }]);
    expect(g.cyclesBySize()).toEqual({});
  });

  it('test_simple_cycles', () => {
    const g = new Graph([{ source: 1, target: 2 }, { source: 2, target: 3 }, { source: 3, target: 1 }]);
    const results = g.cyclesBySize();
    expect(Object.keys(results)).toContain('3');
    expect(results[3]).toHaveLength(1);
    expect(results[3][0].nodes()).toEqual([1, 2, 3]);
  });

  it('test_multiple_cycles', () => {
    const g = new Graph([
      { source: 1, target: 2 },
      { source: 2, target: 3 },
      { source: 3, target: 1 },
      { source: 3, target: 4 },
      { source: 4, target: 1 }
    ]);
    const results = g.cyclesBySize();
    expect(Object.keys(results)).toContain('3');
    expect(results[3]).toHaveLength(1);
    expect(Object.keys(results)).toContain('4');
    expect(results[4]).toHaveLength(1);
  });
});
