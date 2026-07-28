/**
 * @jest-environment jsdom
 */

/**
 * Update element style function
 * @param {string} selector - Element selector (supports ID, class, tag and other selectors)
 * @param {Object} styles - Style key-value pair object
 * @returns {boolean} Whether the operation was successful
 */
function updateElementStyle(selector: string, styles: Record<string, string | number>): boolean {
  if (!selector || !styles || typeof styles !== 'object' || Array.isArray(styles)) {
    return false;
  }

  try {
    const elements = Array.from(document.querySelectorAll(selector));
    if (elements.length === 0) {
      return false;
    }

    elements.forEach(element => {
      Object.keys(styles).forEach(key => {
        (element as HTMLElement).style.setProperty(camelToKebab(key), styles[key].toString());
      });
    });

    return true;
  } catch (error) {
    console.error('Error updating element style:', error);
    return false;
  }
}

function camelToKebab(str: string): string {
  return str.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
}
