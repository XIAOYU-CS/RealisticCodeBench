/**
 * Replace values in someArr based on the nearest non-masked values in rms (or custom mask condition).
 *
 * @param {number[][]} someArr - A 2D array whose values will be replaced where maskFunc(rms) is true
 * @param {number[][]} rms - A 2D array of the same shape as someArr
 * @param {Function} maskFunc - A function that takes a value from rms and returns a boolean
 * @returns {number[][]} A copy of someArr with values replaced based on nearest non-masked neighbors
 */
function replaceByNearest(someArr, rms, maskFunc = (x) => x === 0) {
    // Validate input arrays
    if (!Array.isArray(someArr) || !Array.isArray(rms)) {
        throw new Error("some_arr and rms must be arrays.");
    }

    const rows = someArr.length;
    const cols = rows > 0 ? someArr[0].length : 0;

    // Check shape compatibility
    if (rms.length !== rows) {
        throw new Error("some_arr and rms must have the same shape.");
    }

    for (let i = 0; i < rows; i++) {
        if (!Array.isArray(someArr[i]) || !Array.isArray(rms[i])) {
            throw new Error("Input arrays must be 2D.");
        }
        if (someArr[i].length !== rms[i].length) {
            throw new Error("some_arr and rms must have the same shape.");
        }
    }

    // Handle empty array case
    if (rows === 0 || (rows > 0 && cols === 0)) {
        return someArr.map(row => [...row]);
    }

    // Generate mask using custom function
    const mask = [];
    try {
        for (let i = 0; i < rows; i++) {
            const maskRow = [];
            for (let j = 0; j < cols; j++) {
                maskRow.push(maskFunc(rms[i][j]));
            }
            mask.push(maskRow);
        }
    } catch (e) {
        throw new Error("maskFunc must return a boolean value for each element.");
    }

    // Validate mask contains only boolean values
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (typeof mask[i][j] !== 'boolean') {
                throw new Error("maskFunc must return a boolean value for each element.");
            }
        }
    }

    // Check if any replacements are needed
    let hasMasked = false;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (mask[i][j]) {
                hasMasked = true;
                break;
            }
        }
        if (hasMasked) break;
    }

    if (!hasMasked) {
        return someArr.map(row => [...row]);
    }

    // Check if all elements are masked
    let allMasked = true;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (!mask[i][j]) {
                allMasked = false;
                break;
            }
        }
        if (!allMasked) break;
    }

    if (allMasked) {
        return someArr.map(row => [...row]);
    }

    // Distance transform using BFS to find nearest non-masked indices
    const dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    const nearestIdx = Array.from({ length: rows }, () => Array(cols).fill(null));

    // Initialize queue with all non-masked points
    const queue = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (!mask[i][j]) {
                dist[i][j] = 0;
                nearestIdx[i][j] = [i, j];
                queue.push([i, j]);
            }
        }
    }

    // BFS to propagate nearest indices
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    while (queue.length > 0) {
        const [x, y] = queue.shift();
        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < rows && ny >= 0 && ny < cols) {
                const newDist = dist[x][y] + 1;
                if (newDist < dist[nx][ny]) {
                    dist[nx][ny] = newDist;
                    nearestIdx[nx][ny] = nearestIdx[x][y];
                    queue.push([nx, ny]);
                }
            }
        }
    }

    // Build result array
    const result = someArr.map(row => [...row]);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (mask[i][j]) {
                const [ni, nj] = nearestIdx[i][j];
                result[i][j] = someArr[ni][nj];
            }
        }
    }

    return result;
}