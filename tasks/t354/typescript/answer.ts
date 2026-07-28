/**
 * @jest-environment jsdom
 */
/**
 * A function that dynamically calculates a CSS style value.
 * @param element - The DOM element the style is being applied to.
 * @param property - The camelCase name of the CSS property.
 * @returns The calculated CSS value as a string.
 */
type StyleFunction = (element: HTMLElement, property: string) => string;

/**
 * An object representing CSS styles to apply.
 * Keys are CSS property names (kebab-case or camelCase).
 * Values can be static strings or functions that return strings.
 */
interface CssStyles {
  [key: string]: string | StyleFunction;
}

/**
 * Options for configuring the style update behavior.
 */
interface UpdateOptions {
  /**
   * A CSS transition string (e.g., "all 0.3s ease").
   */
  transition?: string;
}

/**
 * Enhanced element style update function.
 * Applies specified styles to all elements matching a CSS selector.
 *
 * @param selector - CSS selector string (must be a valid CSS selector).
 * @param cssStyles - Style object, supports kebab-case properties (like background-color) and function values.
 * @param options - Configuration options.
 * @param options.transition - CSS transition property (e.g. "all 0.3s ease").
 * @returns The number of elements that were successfully updated with styles.
 * @throws {Error} Throws an error for invalid selector or cssStyles parameters.
 */
function enhancedUpdateElementStyles(
  selector: string,
  cssStyles: CssStyles,
  options: UpdateOptions = {}
): number {
  // 1. Parameter validation
  if (typeof selector !== 'string' || selector.trim() === '') {
    throw new Error('Selector must be a valid non-empty string');
  }
  if (
    typeof cssStyles !== 'object' ||
    cssStyles === null ||
    Array.isArray(cssStyles)
  ) {
    throw new Error('CSS styles must be a non-array object');
  }

  // 2. Get elements
  // Note: Type assertion is used here as we know the selector is valid.
  // In a more robust setup, you might want more specific error handling.
  let elements: NodeListOf<HTMLElement>;
  try {
    elements = document.querySelectorAll<HTMLElement>(selector);
  } catch (e) {
    // This can happen if the selector string is invalid CSS syntax
    throw new Error(`Invalid CSS selector provided: "${selector}"`);
  }

  if (elements.length === 0) {
    console.warn(`No elements found matching selector: "${selector}"`);
    return 0;
  }

  // 3. Configuration options
  const { transition } = options;

  // 4. Convert CSS property names from kebab-case to camelCase
  const kebabToCamelCase = (str: string): string => {
    // Handle vendor prefixes properly
    return str
      .replace(/^-ms-/, 'ms-') // Special case for -ms-
      .replace(/^-/, '')
      .replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
  };

  // 5. Iterate through elements and apply styles
  let updatedCount = 0;
  elements.forEach((element) => {
    try {
      // Set transition if provided
      if (transition) {
        element.style.transition = transition;
      }

      // Apply each style property
      for (const [prop, value] of Object.entries(cssStyles)) {
        const camelProp: string = kebabToCamelCase(prop);

        // Handle function-type style values (dynamic calculation)
        let finalValue: string;
        if (typeof value === 'function') {
          // Function receives current element and camelCase property name
          finalValue = value(element, camelProp);
        } else {
          finalValue = value;
        }

        // Validate style value (null/undefined are invalid)
        // Note: Using == to catch both null and undefined
        if (finalValue == null) {
          throw new Error(
            `Invalid value for style property "${prop}": ${finalValue}`
          );
        }

        // Apply the style
        // We use index signature access for dynamic property setting
        // The type assertion ensures TypeScript knows it's a valid style property
        (element.style as any)[camelProp] = finalValue;
      }

      updatedCount++;
    } catch (err: any) {
      console.error(
        `Failed to update styles for element ${element.tagName}:`,
        err.message
      );
    }
  });

  return updatedCount;
}
