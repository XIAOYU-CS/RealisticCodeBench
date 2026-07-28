function findAllShortestPathsUsingDijkstra(
    graph: Record<string, Array<[string, number]>>,
    start: string
): Record<string, number> {
    const distances: Record<string, number> = {};
    for (const node of Object.keys(graph)) {
        distances[node] = Infinity;
    }
    distances[start] = 0;

    const queue: Array<[number, string]> = [[0, start]];
    while (queue.length > 0) {
        queue.sort((a, b) => a[0] - b[0]);
        const [currentDistance, currentNode] = queue.shift()!;
        if (currentDistance > distances[currentNode]) {
            continue;
        }

        for (const [neighbor, weight] of graph[currentNode] || []) {
            const nextDistance = currentDistance + weight;
            if (nextDistance < distances[neighbor]) {
                distances[neighbor] = nextDistance;
                queue.push([nextDistance, neighbor]);
            }
        }
    }

    return distances;
}
