/**
 * @jest-environment jsdom
 */
/**
 * Enhanced element style update function
 * @param {string} selector - CSS selector string (must be a valid CSS selector)
 * @param {Object} cssStyles - Style object, supports kebab-case properties (like background-color) and function values
 * @param {Object} [options] - Configuration options
 * @param {string} [options.transition] - CSS transition property (e.g. "all 0.3s ease")
 * @returns {number} Number of elements that were successfully updated with styles
 * @throws {Error} Throws error for invalid selector or cssStyles parameters
 */
function enhancedUpdateElementStyles(selector, cssStyles, options = {}) {
    // 1. Parameter validation
    if (typeof selector !== 'string' || selector.trim() === '') {
        throw new Error('Selector must be a valid non-empty string');
    }
    if (typeof cssStyles !== 'object' || cssStyles === null || Array.isArray(cssStyles)) {
        throw new Error('CSS styles must be a non-array object');
    }

    // 2. Get elements
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) {
        console.warn(`No elements found matching selector: "${selector}"`);
        return 0;
    }

    // 3. Configuration options
    const { transition } = options;

    // 4. Convert CSS property names from kebab-case to camelCase
    const kebabToCamelCase = (str) => {
        // Handle vendor prefixes properly
        return str
            .replace(/^-ms-/, 'ms-') // Special case for -ms-
            .replace(/^-/, '')
            .replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
    };

    // 5. Iterate through elements and apply styles
    let updatedCount = 0;
    elements.forEach(element => {
        try {
            // Set transition if provided
            if (transition) {
                element.style.transition = transition;
            }

            // Apply each style property
            Object.entries(cssStyles).forEach(([prop, value]) => {
                const camelProp = kebabToCamelCase(prop);

                // Handle function-type style values (dynamic calculation)
                const finalValue = typeof value === 'function'
                    ? value(element, camelProp)  // Function receives current element and camelCase property name
                    : value;

                // Validate style value (null/undefined are invalid)
                if (finalValue == null) {
                    throw new Error(`Invalid value for style property "${prop}": ${finalValue}`);
                }

                // Apply the style
                element.style[camelProp] = finalValue;
            });

            updatedCount++;
        } catch (err) {
            console.error(`Failed to update styles for element ${element.tagName}:`, err.message);
        }
    });

    return updatedCount;
}
