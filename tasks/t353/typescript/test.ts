/**
 * @jest-environment jsdom
 */

describe('updateElementStyle', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    test('should update styles for element by ID selector', () => {
        document.body.innerHTML = '<div id="test-element">Test</div>';
        const selector: string = '#test-element';
        const styles: Record<string, string | number> = { backgroundColor: 'red', fontSize: '16px' };
        const result: boolean = updateElementStyle(selector, styles);
        const element = document.getElementById('test-element') as HTMLElement;
        expect(result).toBe(true);
        expect(element.style.backgroundColor).toBe('red');
        expect(element.style.fontSize).toBe('16px');
    });

    test('should update styles for elements by class selector', () => {
        document.body.innerHTML = `
            <div class="test-class">Test 1</div>
            <p class="test-class">Test 2</p>
        `;
        const selector: string = '.test-class';
        const styles: Record<string, string | number> = { color: 'blue', marginTop: '10px' };
        const result: boolean = updateElementStyle(selector, styles);
        const elements: HTMLCollectionOf<Element> = document.getElementsByClassName('test-class');
        expect(result).toBe(true);
        expect((elements[0] as HTMLElement).style.color).toBe('blue');
        expect((elements[1] as HTMLElement).style.color).toBe('blue');
        expect((elements[0] as HTMLElement).style.marginTop).toBe('10px');
    });

    test('should return false when selector is empty', () => {
        const selector: string = '';
        const styles: Record<string, string | number> = { color: 'red' };
        const result: boolean = updateElementStyle(selector, styles);
        expect(result).toBe(false);
    });

    test('should return false when no elements match the selector', () => {
        document.body.innerHTML = '<div id="existing">Test</div>';
        const selector: string = '#non-existent';
        const styles: Record<string, string | number> = { color: 'green' };
        const result: boolean = updateElementStyle(selector, styles);
        expect(result).toBe(false);
    });

    test('should handle numeric style values', () => {
        document.body.innerHTML = '<div id="test">Test</div>';
        const selector: string = '#test';
        const styles: Record<string, string | number> = { opacity: 0.5, zIndex: 10 };
        const result: boolean = updateElementStyle(selector, styles);
        const element = document.getElementById('test') as HTMLElement;
        expect(result).toBe(true);
        expect(element.style.opacity).toBe('0.5');
        expect(element.style.zIndex).toBe('10');
    });

    test('should handle CSS custom properties', () => {
        document.body.innerHTML = '<div id="test">Test</div>';
        const selector: string = '#test';
        const styles: Record<string, string | number> = { '--custom-color': 'blue' };
        const result: boolean = updateElementStyle(selector, styles);
        const element = document.getElementById('test') as HTMLElement;
        expect(result).toBe(true);
        expect(element.style.getPropertyValue('--custom-color')).toBe('blue');
    });
});