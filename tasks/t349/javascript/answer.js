/**
 * Positions elements along an arc path with optional rotation.
 *
 * @param {HTMLElement[]} elements - Array of DOM elements to position
 * @param {Object} options - Configuration options
 * @param {number} [options.radius=100] - Arc radius in pixels
 * @param {number} [options.arcAngle=180] - Total arc angle in degrees
 * @param {HTMLElement} [options.container] - Container element for center calculation
 * @param {number} [options.centerX] - Custom center X coordinate (defaults to container center or 0)
 * @param {number} [options.centerY] - Custom center Y coordinate (defaults to container center or 0)
 * @param {number} [options.yOffset=0] - Additional Y axis offset
 * @param {boolean} [options.rotateElements=true] - Whether to rotate elements according to their position angle
 *
 * @example
 * // Position 5 elements along a semicircle
 * const elements = document.querySelectorAll('.arc-item');
 * positionElementsInArc(Array.from(elements), {
 *   radius: 150,
 *   arcAngle: 180,
 *   container: document.getElementById('arc-container')
 * });
 *
 * @example
 * // Position elements with custom center and no rotation
 * positionElementsInArc(elements, {
 *   radius: 100,
 *   centerX: 200,
 *   centerY: 150,
 *   rotateElements: false
 * });
 */
function positionElementsInArc(elements, options = {}) {
  // Validate input
  if (!Array.isArray(elements)) {
    throw new Error('Elements must be an array');
  }

  if (elements.length === 0) return;

  // Default configuration
  const {
    radius = 100,
    arcAngle = 180,
    container,
    centerX,
    centerY,
    yOffset = 0,
    rotateElements = true
  } = options;

  // Calculate center coordinates
  let finalCenterX = centerX;
  let finalCenterY = centerY;

  if (centerX === undefined && container) {
    finalCenterX = container.clientWidth / 2;
  } else if (centerX === undefined) {
    finalCenterX = 0;
  }

  if (centerY === undefined && container) {
    finalCenterY = container.clientHeight / 2;
  } else if (centerY === undefined) {
    finalCenterY = 0;
  }

  const n = elements.length;
  const middleIndex = Math.floor(n / 2);

  for (let i = 0; i < n; i++) {
    // Calculate angle for current element (-arcAngle/2 to +arcAngle/2)
    const angle = (arcAngle / (n > 1 ? n - 1 : 1)) * (i - middleIndex);
    const radians = (Math.PI / 180) * angle;

    // Calculate position along the arc
    const x = finalCenterX + radius * Math.sin(radians) - (elements[i].offsetWidth || 0) / 2;
    const y = finalCenterY - radius * Math.cos(radians) - (elements[i].offsetHeight || 0) / 2 + yOffset;

    // Apply positioning styles
    elements[i].style.position = 'absolute';
    elements[i].style.left = `${x}px`;
    elements[i].style.top = `${y}px`;

    // Apply rotation if enabled
    elements[i].style.transform = rotateElements ? `rotate(${angle}deg)` : 'none';

    // Set z-index (middle element on top)
    elements[i].style.zIndex = (i === middleIndex ? n : n - Math.abs(i - middleIndex));
  }
}