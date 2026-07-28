describe('quaternionToAngle', () => {
    it('test the identity quaternion (no rotation)', () => {
        const quaternion: [number, number, number, number] = [1.0, 0.0, 0.0, 0.0];
        const expectedAngle = 0.0;
        expect(quaternionToAngle(quaternion)).toBeCloseTo(expectedAngle);
    });

    it('test a quaternion representing a 180-degree rotation', () => {
        const quaternion: [number, number, number, number] = [0.0, 0.0, 1.0, 0.0];
        const expectedAngle = Math.PI;
        expect(quaternionToAngle(quaternion)).toBeCloseTo(expectedAngle);
    });

    it('test a quaternion representing a full 360-degree rotation', () => {
        const quaternion: [number, number, number, number] = [1.0, 0.0, 0.0, 0.0];
        const expectedAngle = 0.0;
        expect(quaternionToAngle(quaternion)).toBeCloseTo(expectedAngle);
    });

    it('test a non-unit quaternion (should still give correct angle)', () => {
        const quaternion: [number, number, number, number] = [0.5, 0.5, 0.5, 0.5];
        const norm = Math.sqrt(quaternion.reduce((acc, val) => acc + val ** 2, 0));
        const normalizedQuaternion: [number, number, number, number] = quaternion.map(x => x / norm) as [number, number, number, number];
        const expectedAngle = 2 * Math.acos(normalizedQuaternion[0]);
        expect(quaternionToAngle(normalizedQuaternion)).toBeCloseTo(expectedAngle);
    });

    it('test invalid quaternion raises an error', () => {
        expect(() => quaternionToAngle([1.0, 0.0, 0.0] as any)).toThrow();
    });
});
