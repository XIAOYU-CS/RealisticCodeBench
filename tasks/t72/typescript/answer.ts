class BitSequenceEncoder {
    /**
     * Encodes JSON with integer values under the key "bits" rendered as 8-bit binary strings.
     */
    public encode(obj: any): string {
        return JSON.stringify(obj, (key, value) => {
            if (key === 'bits' && Number.isInteger(value)) {
                return value.toString(2).padStart(8, '0');
            }
            return value;
        });
    }
}
