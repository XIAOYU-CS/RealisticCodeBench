function buildDegBasedRotationPoseMatrix(angleDeg: number, axis: string): number[][] {
    /**
     * Create a pose matrix representing a rotation about a given axis.
     *
     * @param {number} angleDeg - Rotation angle in degrees.
     * @param {string} axis - Axis to rotate about, must be one of 'X', 'Y', or 'Z'.
     * @returns {THREE.Matrix4} - 4x4 pose matrix representing the rotation.
     */

    const angleRad = angleDeg * (Math.PI / 180);
    let rotationMatrix: number[][];

    switch (axis.toLowerCase()) {
        case 'x':
            rotationMatrix = [
                [1, 0, 0, 0],
                [0, Math.cos(angleRad), -Math.sin(angleRad), 0],
                [0, Math.sin(angleRad), Math.cos(angleRad), 0],
                [0, 0, 0, 1],
            ];
            break;
        case 'y':
            rotationMatrix = [
                [Math.cos(angleRad), 0, Math.sin(angleRad), 0],
                [0, 1, 0, 0],
                [-Math.sin(angleRad), 0, Math.cos(angleRad), 0],
                [0, 0, 0, 1],
            ];
            break;
        case 'z':
            rotationMatrix = [
                [Math.cos(angleRad), -Math.sin(angleRad), 0, 0],
                [Math.sin(angleRad), Math.cos(angleRad), 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1],
            ];
            break;
        default:
            throw new Error("Invalid axis. Must be 'X', 'Y', or 'Z'.");
    }

    return rotationMatrix;
}
