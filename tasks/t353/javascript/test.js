/**
 * @jest-environment jsdom
 */

describe('updateElementStyle', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    test('should update styles for element by ID selector', () => {
        document.body.innerHTML = '<div id="test-element">Test</div>';
        const selector = '#test-element';
        const styles = { backgroundColor: 'red', fontSize: '16px' };
        const result = updateElementStyle(selector, styles);
        const element = document.getElementById('test-element');
        expect(result).toBe(true);
        expect(element.style.backgroundColor).toBe('red');
        expect(element.style.fontSize).toBe('16px');
    });

    test('should update styles for elements by class selector', () => {
        document.body.innerHTML = `
            <div class="test-class">Test 1</div>
            <p class="test-class">Test 2</p>
        `;
        const selector = '.test-class';
        const styles = { color: 'blue', marginTop: '10px' };
        const result = updateElementStyle(selector, styles);
        const elements = document.getElementsByClassName('test-class');
        expect(result).toBe(true);
        expect(elements[0].style.color).toBe('blue');
        expect(elements[1].style.color).toBe('blue');
        expect(elements[0].style.marginTop).toBe('10px');
    });

    test('should return false when selector is empty', () => {
        const selector = '';
        const styles = { color: 'red' };
        const result = updateElementStyle(selector, styles);
        expect(result).toBe(false);
    });

    test('should return false when no elements match the selector', () => {
        document.body.innerHTML = '<div id="existing">Test</div>';
        const selector = '#non-existent';
        const styles = { color: 'green' };
        const result = updateElementStyle(selector, styles);
        expect(result).toBe(false);
    });

    test('should return false when styles parameter is invalid', () => {
        document.body.innerHTML = '<div id="test">Test</div>';
        const selector = '#test';
        const invalidStyles = 'not-an-object';
        const result = updateElementStyle(selector, invalidStyles);
        expect(result).toBe(false);
    });
});
