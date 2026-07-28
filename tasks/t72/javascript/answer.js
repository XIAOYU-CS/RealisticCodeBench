function BitSequenceEncoder() {
}

BitSequenceEncoder.prototype.encode = function(obj) {
    return JSON.stringify(obj, (key, value) => {
        if (key === 'bits' && Number.isInteger(value)) {
            return value.toString(2).padStart(8, '0');
        }
        return value;
    });
};
