describe('getBoundingRectWithDescendants', () => {
  const document: {
    body: { innerHTML: string; appendChild(child: Element): void };
    createElement(tagName: string): HTMLElement;
  } = {
    body: { innerHTML: '', appendChild() {} },
    createElement: (): HTMLElement => ({
      children: [] as Element[],
      appendChild(child: Element): Element {
        this.children.push(child);
        return child;
      }
    } as unknown as HTMLElement)
  };

  function mockRect(element: HTMLElement, rect: Partial<BoundingRect>): void {
    (element as any).getBoundingClientRect = jest.fn(() => ({
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
      ...rect
    }));
  }

  beforeEach(() => {
    document.body.innerHTML = '';
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should include self and all children when includeSelf is true', () => {
    const parent = document.createElement('div');
    const child = document.createElement('div');
    parent.appendChild(child);
    document.body.appendChild(parent);
    mockRect(parent, { left: 10, top: 20, right: 110, bottom: 120 });
    mockRect(child, { left: 30, top: 40, right: 80, bottom: 90 });
    const result = getBoundingRectWithDescendants(parent, true);
    expect(result.left).toBe(10);
    expect(result.top).toBe(20);
    expect(result.right).toBe(110);
    expect(result.bottom).toBe(120);
    expect(result.width).toBe(100);
    expect(result.height).toBe(100);
  });

  test('should exclude self and only consider children when includeSelf is false', () => {
    const parent = document.createElement('div');
    const child1 = document.createElement('div');
    const child2 = document.createElement('div');
    parent.appendChild(child1);
    parent.appendChild(child2);
    document.body.appendChild(parent);

    mockRect(parent, { left: 100, top: 100, right: 200, bottom: 200 }); // Outside children
    mockRect(child1, { left: 10, top: 20, right: 60, bottom: 70 });
    mockRect(child2, { left: 30, top: 40, right: 80, bottom: 90 });

    const result = getBoundingRectWithDescendants(parent, false);

    expect(result.left).toBe(10);
    expect(result.top).toBe(20);
    expect(result.right).toBe(80);
    expect(result.bottom).toBe(90);
    expect(result.width).toBe(70);
    expect(result.height).toBe(70);
  });

  test('should return element bounds when there are no children and includeSelf is true', () => {
    const element = document.createElement('div');
    document.body.appendChild(element);
    mockRect(element, { left: 50, top: 60, right: 150, bottom: 260 });
    const result = getBoundingRectWithDescendants(element, true);
    expect(result.left).toBe(50);
    expect(result.top).toBe(60);
    expect(result.right).toBe(150);
    expect(result.bottom).toBe(260);
    expect(result.width).toBe(100);
    expect(result.height).toBe(200);
  });

  test('should correctly compute bounding box for widely spaced children', () => {
    const container = document.createElement('div');
    const child1 = document.createElement('div');
    const child2 = document.createElement('div');
    const child3 = document.createElement('div');

    container.appendChild(child1);
    container.appendChild(child2);
    container.appendChild(child3);
    document.body.appendChild(container);

    mockRect(child1, { left: 0, top: 0, right: 10, bottom: 10 });
    mockRect(child2, { left: 100, top: 200, right: 150, bottom: 250 });
    mockRect(child3, { left: -50, top: -30, right: 0, bottom: 0 });

    mockRect(container, { left: 200, top: 200, right: 300, bottom: 300 });
    const result = getBoundingRectWithDescendants(container, false);
    expect(result.left).toBe(-50);
    expect(result.top).toBe(-30);
    expect(result.right).toBe(150);
    expect(result.bottom).toBe(250);
    expect(result.width).toBe(200);
    expect(result.height).toBe(280);
  });

  test('should return zero-sized rectangle when no children and includeSelf is false', () => {
    const element = document.createElement('div');
    document.body.appendChild(element);
    mockRect(element, { left: 10, top: 20, right: 30, bottom: 40 });

    const result = getBoundingRectWithDescendants(element, false);

    expect(result.left).toBe(0);
    expect(result.top).toBe(0);
    expect(result.right).toBe(0);
    expect(result.bottom).toBe(0);
    expect(result.width).toBe(0);
    expect(result.height).toBe(0);
  });
});
