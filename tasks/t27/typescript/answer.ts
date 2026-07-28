function transformPointCloudToReferenceFrame(
    pointCloud: number[][],
    refFramePoints: number[][]
): number[][] {
    if (pointCloud.length === 0 || pointCloud[0].length !== 3) {
        throw new Error('pointCloud must be a non-empty Nx3 array.');
    }
    if (refFramePoints.length !== 3 || refFramePoints.some(p => p.length !== 3)) {
        throw new Error('refFramePoints must be an array of three 3D points.');
    }

    const [A, B, C] = refFramePoints;
    const u = normalize(subtract(B, A));
    const w = normalize(crossProduct(u, subtract(C, A)));
    const v = normalize(crossProduct(w, u));
    const rotationMatrix = [u, v, w];
    const translationVector = rotationMatrix.map(row => -dotProduct(row, A));

    return pointCloud.map(point => add(
        multiplyMatrixVector(rotationMatrix, subtract(point, A)),
        translationVector
    ));
}

function subtract(a: number[], b: number[]): number[] {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function add(a: number[], b: number[]): number[] {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function dotProduct(a: number[], b: number[]): number {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function crossProduct(a: number[], b: number[]): number[] {
    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
    ];
}

function normalize(vector: number[]): number[] {
    const norm = Math.sqrt(dotProduct(vector, vector));
    return vector.map(value => value / norm);
}

function multiplyMatrixVector(matrix: number[][], vector: number[]): number[] {
    return matrix.map(row => dotProduct(row, vector));
}
