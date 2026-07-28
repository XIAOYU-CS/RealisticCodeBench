function convertDecimalToBinary(decimalValue, bitLength) {
    if (bitLength === 32) {
        const buffer = new ArrayBuffer(4);
        const view = new DataView(buffer);
        view.setFloat32(0, decimalValue, false);
        return view.getUint32(0, false).toString(2).padStart(32, '0');
    } else if (bitLength === 64) {
        const buffer = new ArrayBuffer(8);
        const view = new DataView(buffer);
        view.setFloat64(0, decimalValue, false);
        return view.getUint32(0, false).toString(2).padStart(32, '0') +
            view.getUint32(4, false).toString(2).padStart(32, '0');
    } else {
        throw new Error("Invalid bit length. Please specify either 32 or 64.");
    }
}
