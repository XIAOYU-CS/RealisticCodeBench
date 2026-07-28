describe('TestRemoveCommonIndentation', () => {
    it('should return an empty string for an empty input', () => {
        expect(removeCommonIndentation("")).toEqual("");
    });

    it('should return the same string as input for a single line with no indentation', () => {
        expect(removeCommonIndentation("No indentation here")).toEqual("No indentation here");
    });

    it('should remove common leading indentation for multiple lines with uniform indentation', () => {
        const inputText = "    Line one\n    Line two\n    Line three";
        const expectedOutput = "Line one\nLine two\nLine three";
        expect(removeCommonIndentation(inputText)).toEqual(expectedOutput);
    });

    it('should remove the minimum common indentation for lines with mixed indentation', () => {
        const inputText = "  Line one\n  Line two\n  Line three";
        const expectedOutput = "Line one\nLine two\nLine three";
        expect(removeCommonIndentation(inputText)).toEqual(expectedOutput);
    });

    it('should ignore blank lines and preserve trailing spaces', () => {
        const inputText = "    Line one  \n\n      Line two  ";
        const expectedOutput = "Line one  \n\n  Line two  ";
        expect(removeCommonIndentation(inputText)).toEqual(expectedOutput);
    });
});
