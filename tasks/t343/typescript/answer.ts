/**
 * Options for generateRandomSubsets function
 */
interface GenerateRandomSubsetsOptions<T = any> {
    /** Step size between elements, default is 1 */
    step?: number;
    /** Whether to allow duplicate subsets, default is true */
    allowDuplicates?: boolean;
    /** Whether to randomly shuffle elements within subsets, default is false */
    shuffle?: boolean;
    /** Optional data source list */
    dataSource?: T[] | null;
}

/**
 * Generate a specified number of random subsets
 *
 * @param start - Start value of the integer range (inclusive)
 * @param stop - End value of the integer range (exclusive)
 * @param size - Number of elements in each subset
 * @param count - Number of subsets to generate
 * @param options - Additional options
 * @returns A list containing multiple subsets
 */
function generateRandomSubsets<T = number>(
    start: number,
    stop: number,
    size: number,
    count: number,
    options: GenerateRandomSubsetsOptions<T> = {}
): T[][] {
    const {
        step = 1,
        allowDuplicates = true,
        shuffle = false,
        dataSource = null
    } = options;

    // Handle data source
    let population: T[] | number[];
    if (dataSource !== null) {
        population = [...dataSource] as T[];
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

    const subsets: T[][] = [];
    const maxAttempts = count * 10; // Maximum number of attempts to prevent infinite loops
    let attempts = 0;

    while (subsets.length < count && attempts < maxAttempts) {
        attempts++;

        let subset: T[] | number[];
        // Select a continuous segment or random elements from the data source
        if (dataSource === null && step === 1) {
            // Maintain original logic: select a continuous segment
            const maxStartIdx = population.length - size;
            const startIdx = getRandomInt(0, maxStartIdx);
            subset = population.slice(startIdx, startIdx + size);
        } else {
            // Randomly sample elements (possibly non-consecutive)
            subset = sample(population as T[], size);
        }

        // Handle sorting
        if (!shuffle && dataSource === null) {
            (subset as number[]).sort((a, b) => a - b);
        }

        // Handle deduplication
        if (!allowDuplicates) {
            // Check if the subset already exists
            const subsetAsString = JSON.stringify([...subset as T[]].sort());
            const isDuplicate = subsets.some(existing => {
                const existingAsString = JSON.stringify([...existing].sort());
                return subsetAsString === existingAsString;
            });

            if (isDuplicate) {
                continue;
            }
        }

        subsets.push(subset as T[]);
    }

    if (subsets.length < count) {
        console.warn(`Could not generate enough unique subsets; only generated ${subsets.length}`);
    }

    return subsets;
}
/**
 * Generate a range of numbers
 * @param start - Start value (inclusive)
 * @param stop - Stop value (exclusive)
 * @param step - Step size
 * @returns Array of numbers in the range
 */
function range(start: number, stop: number, step: number = 1): number[] {
    const result: number[] = [];
    for (let i = start; i < stop; i += step) {
        result.push(i);
    }
    return result;
}

/**
 * Get a random integer between min and max (inclusive)
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random integer
 */
function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sample random elements from an array
 * @param array - Source array
 * @param size - Number of elements to sample
 * @returns Sampled elements
 */
function sample<T>(array: T[], size: number): T[] {
    if (size > array.length) {
        throw new Error("Sample size cannot be greater than array length");
    }

    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, size);
}