/**
 * Generate a specified number of random subsets
 *
 * @param {number} start - Start value of the integer range (inclusive)
 * @param {number} stop - End value of the integer range (exclusive)
 * @param {number} size - Number of elements in each subset
 * @param {number} count - Number of subsets to generate
 * @param {Object} options - Additional options
 * @param {number} [options.step=1] - Step size between elements
 * @param {boolean} [options.allowDuplicates=true] - Whether to allow duplicate subsets
 * @param {boolean} [options.shuffle=false] - Whether to randomly shuffle elements within subsets
 * @param {Array} [options.dataSource=null] - Optional data source list
 * @returns {Array<Array>} A list containing multiple subsets
 */
function generateRandomSubsets(start, stop, size, count, options = {}) {
    const {
        step = 1,
        allowDuplicates = true,
        shuffle = false,
        dataSource = null
    } = options;

    // Handle data source
    let population;
    if (dataSource !== null) {
        population = [...dataSource];
        if (population.length < size) {
            throw new Error("Length of data source is smaller than subset size");
        }
    } else {
        // Generate integer range
        population = range(start, stop, step);
        if (population.length < size) {
            throw new Error("Specified range cannot produce a subset of the required size");
        }
    }

    const subsets = [];
    const maxAttempts = count * 10; // Maximum number of attempts to prevent infinite loops
    let attempts = 0;

    while (subsets.length < count && attempts < maxAttempts) {
        attempts++;

        let subset;
        // Select a continuous segment or random elements from the data source
        if (dataSource === null && step === 1) {
            // Maintain original logic: select a continuous segment
            const maxStartIdx = population.length - size;
            const startIdx = getRandomInt(0, maxStartIdx);
            subset = population.slice(startIdx, startIdx + size);
        } else {
            // Randomly sample elements (possibly non-consecutive)
            subset = sample(population, size);
        }

        // Handle sorting
        if (!shuffle && dataSource === null) {
            subset.sort((a, b) => a - b);
        }

        // Handle deduplication
        if (!allowDuplicates) {
            // Check if the subset already exists
            const subsetSet = new Set(subset);
            const isDuplicate = subsets.some(existing => {
                const existingSet = new Set(existing);
                if (subsetSet.size !== existingSet.size) return false;
                for (const item of subsetSet) {
                    if (!existingSet.has(item)) return false;
                }
                return true;
            });

            if (isDuplicate) {
                continue;
            }
        }

        subsets.push(subset);
    }

    if (subsets.length < count) {
        console.warn(`Could not generate enough unique subsets; only generated ${subsets.length}`);
    }

    return subsets;
}
/**
 * Generate a range of numbers
 * @param {number} start - Start value (inclusive)
 * @param {number} stop - Stop value (exclusive)
 * @param {number} step - Step size
 * @returns {number[]} Array of numbers in the range
 */
function range(start, stop, step = 1) {
    const result = [];
    for (let i = start; i < stop; i += step) {
        result.push(i);
    }
    return result;
}

/**
 * Get a random integer between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sample random elements from an array
 * @param {Array} array - Source array
 * @param {number} size - Number of elements to sample
 * @returns {Array} Sampled elements
 */
function sample(array, size) {
    if (size > array.length) {
        throw new Error("Sample size cannot be greater than array length");
    }

    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, size);
}