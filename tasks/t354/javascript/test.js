/**
 * @jest-environment jsdom
 */
describe('enhancedUpdateElementStyles', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        if (container && container.parentNode) {
            container.parentNode.removeChild(container);
        }
        jest.clearAllMocks();
    });

    test('should update styles with static values and return correct count', () => {
        container.innerHTML = `
            <div class="test-element" id="el1"></div>
            <div class="test-element" id="el2"></div>
            <div class="other-element" id="el3"></div>
        `;
        const result = enhancedUpdateElementStyles('.test-element', {
            'background-color': 'red',
            'font-size': '16px'
        });

        expect(result).toBe(2);
        const el1 = document.getElementById('el1');
        const el2 = document.getElementById('el2');
        expect(el1.style.backgroundColor).toBe('red');
        expect(el1.style.fontSize).toBe('16px');
        expect(el2.style.backgroundColor).toBe('red');
        expect(el2.style.fontSize).toBe('16px');
    });

    test('should handle function values for dynamic style calculation', () => {
        container.innerHTML = `
            <div class="dynamic-element" data-color="blue"></div>
            <div class="dynamic-element" data-color="green"></div>
            <div class="dynamic-element"></div>
        `;

        const result = enhancedUpdateElementStyles('.dynamic-element', {
            color: (element, property) => {
                return element.dataset.color || 'black';
            },
            'font-size': '14px'
        });

        expect(result).toBe(3);
        const elements = document.querySelectorAll('.dynamic-element');
        expect(elements[0].style.color).toBe('blue');
        expect(elements[1].style.color).toBe('green');
        expect(elements[2].style.color).toBe('black');
        expect(elements[0].style.fontSize).toBe('14px');
    });

    test('should apply transition styles when options.transition is provided', () => {
        container.innerHTML = '<div class="transition-element"></div>';
        const element = document.querySelector('.transition-element');
        const result = enhancedUpdateElementStyles('.transition-element', {
            opacity: '0.5'
        }, {
            transition: 'opacity 0.3s ease-in-out'
        });

        expect(result).toBe(1);
        expect(element.style.opacity).toBe('0.5');
        expect(element.style.transition).toBe('opacity 0.3s ease-in-out');
    });

    test('should throw error for invalid selector or cssStyles parameters', () => {
        expect(() => {
            enhancedUpdateElementStyles('', { color: 'red' });
        }).toThrow();

        expect(() => {
            enhancedUpdateElementStyles('.test', null);
        }).toThrow();

        expect(() => {
            enhancedUpdateElementStyles('.test', ['color', 'red']);
        }).toThrow();
    });

    test('should return 0 and warn when no elements match selector', () => {
        const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
        const result = enhancedUpdateElementStyles('.non-existent', {
            color: 'red'
        });
        expect(result).toBe(0);
        consoleWarnSpy.mockRestore();
    });

    test('should correctly convert kebab-case properties to camelCase', () => {
        container.innerHTML = '<div class="convert-test"></div>';

        const result = enhancedUpdateElementStyles('.convert-test', {
            'background-color': 'blue',
            'font-size': '18px',
            'margin-top': '10px',
            '-webkit-transform': 'translateX(10px)'
        });

        expect(result).toBe(1);
        const element = document.querySelector('.convert-test');
        expect(element.style.backgroundColor).toBe('blue');
        expect(element.style.fontSize).toBe('18px');
        expect(element.style.marginTop).toBe('10px');
        expect(element.style.webkitTransform).toBe('translateX(10px)');
    });
});