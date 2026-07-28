interface MockElement {
  offsetWidth: number;
  offsetHeight: number;
  style: { [key: string]: string };
}

describe('positionElementsInArc', () => {
  let mockElements: MockElement[];

  beforeEach(() => {
    mockElements = [
      {
        offsetWidth: 50,
        offsetHeight: 50,
        style: {}
      },
      {
        offsetWidth: 50,
        offsetHeight: 50,
        style: {}
      },
      {
        offsetWidth: 50,
        offsetHeight: 50,
        style: {}
      },
      {
        offsetWidth: 50,
        offsetHeight: 50,
        style: {}
      },
      {
        offsetWidth: 50,
        offsetHeight: 50,
        style: {}
      }
    ];
  });

  test('should position elements along a semicircle arc', () => {
    positionElementsInArc(mockElements as unknown as HTMLElement[], { radius: 100, arcAngle: 180 });

    const middleElement = mockElements[2];
    expect(middleElement.style.position).toBe('absolute');
    expect(middleElement.style.left).toBeDefined();
    expect(middleElement.style.top).toBeDefined();
    expect(middleElement.style.zIndex).toBe('5');

    expect(middleElement.style.transform).toBe('rotate(0deg)');
  });

  test('should use container center when container is provided', () => {
    const mockContainer = {
      clientWidth: 400,
      clientHeight: 300
    };

    positionElementsInArc(mockElements as unknown as HTMLElement[], {
      radius: 80,
      container: mockContainer as unknown as HTMLElement
    });

    const firstElement = mockElements[0];
    expect(firstElement.style.position).toBe('absolute');
    expect(firstElement.style.left).toBeDefined();
    expect(firstElement.style.top).toBeDefined();
  });

  test('should respect custom center coordinates', () => {
    positionElementsInArc(mockElements as unknown as HTMLElement[], {
      radius: 60,
      centerX: 200,
      centerY: 150,
      arcAngle: 90
    });

    const middleElement = mockElements[2];
    expect(middleElement.style.position).toBe('absolute');
    expect(middleElement.style.transform).toBe('rotate(0deg)');
  });

  test('should not rotate elements when rotateElements is false', () => {
    positionElementsInArc(mockElements as unknown as HTMLElement[], {
      radius: 100,
      rotateElements: false
    });

    mockElements.forEach(element => {
      expect(element.style.transform).toBe('none');
    });
  });

  test('should reject non-array elements input', () => {
    expect(() => positionElementsInArc(null as unknown as HTMLElement[])).toThrow('Elements must be an array');
  });
});
