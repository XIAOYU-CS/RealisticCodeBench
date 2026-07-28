/**
 * @jest-environment jsdom
 */

/**
 * Update element style function
 * @param {string} selector - Element selector (supports ID, class, tag and other selectors)
 * @param {Object} styles - Style key-value pair object
 * @returns {boolean} Whether the operation was successful
 */
function updateElementStyle(selector, styles) {
    // Parameter validation
    if (!selector) {
        console.error('Selector cannot be empty');
        return false;
    }

    if (!styles || typeof styles !== 'object' || Array.isArray(styles)) {
        console.error('Style parameter must be a non-array object');
        return false;
    }

    try {
        // Get elements through querySelectorAll uniformly
        const elements = Array.from(document.querySelectorAll(selector));

        // Check if elements are found
        if (elements.length === 0) {
            console.warn(`No elements found matching selector "${selector}"`);
            return false;
        }

        let success = true;

        // Apply styles to all matching elements
        elements.forEach(element => {
            // Iterate through style object and apply each style property
            Object.keys(styles).forEach(property => {
                try {
                    // Handle camelCase and kebab-case naming
                    const cssProperty = camelToKebab(property);
                    element.style.setProperty(cssProperty, styles[property]);
                } catch (styleError) {
                    console.warn(`Error setting style property "${property}":`, styleError);
                    success = false;
                }
            });
        });

        return success;

    } catch (error) {
        console.error('Error occurred while updating element styles:', error);
        return false;
    }
}

/**
 * Convert camelCase to kebab-case
 * @param {string} str - CamelCase string
 * @returns {string} Converted string
 */
function camelToKebab(str) {
    return str.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
}
