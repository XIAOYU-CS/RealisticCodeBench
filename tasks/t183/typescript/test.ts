describe('determineBackgroundLightLevel', () => {
    let mainElement: HTMLElement;

    beforeEach(() => {
        mainElement = document.createElement('main');
        document.body.appendChild(mainElement);
    });

    afterEach(() => {
        document.body.removeChild(mainElement);
    });

    test('should return "dark" for a dark background color', () => {
        mainElement.style.backgroundColor = 'rgb(30, 30, 30)';

        const result = determineBackgroundLightLevel();
        expect(result).toBe('dark');
    });

    test('should return "bright" for a bright background color', () => {
        mainElement.style.backgroundColor = 'rgb(250, 250, 250)';

        const result = determineBackgroundLightLevel();
        expect(result).toBe('bright');
    });

    test('should return "normal" for a background color with normal brightness', () => {
        mainElement.style.backgroundColor = 'rgb(150, 150, 150)';
        const result = determineBackgroundLightLevel();
        expect(result).toBe('normal');
    });

    test('should correctly handle a bright color with high red component', () => {
        mainElement.style.backgroundColor = 'rgb(255, 100, 100)';
        const result = determineBackgroundLightLevel();
        expect(result).toBe('normal');
    });

    test('should correctly handle a dark color with low green and blue components', () => {
        mainElement.style.backgroundColor = 'rgb(10, 10, 100)';
        const result = determineBackgroundLightLevel();
        expect(result).toBe('dark');
    });
});