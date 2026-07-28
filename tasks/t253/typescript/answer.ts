class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    distanceTo(other: Point): number {
        return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
    }
}

function findKNearestNeighbors(points: Point[], queryPoint: Point, k: number): Point[] {
    return [...points]
        .map((point, index) => ({ point, index, distance: point.distanceTo(queryPoint) }))
        .sort((a, b) => a.distance - b.distance || a.index - b.index)
        .slice(0, Math.max(0, k))
        .map((entry) => entry.point);
}
