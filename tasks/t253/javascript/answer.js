class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    distanceTo(other) {
        return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
    }
}

function findKNearestNeighbors(points, queryPoint, k) {
    return [...points]
        .map((point, index) => ({ point, index, distance: point.distanceTo(queryPoint) }))
        .sort((a, b) => a.distance - b.distance || a.index - b.index)
        .slice(0, Math.max(0, k))
        .map((entry) => entry.point);
}

function containsPoint(points, point) {
    return points.some((p) => Math.abs(p.x - point.x) < 0.001 && Math.abs(p.y - point.y) < 0.001);
}
