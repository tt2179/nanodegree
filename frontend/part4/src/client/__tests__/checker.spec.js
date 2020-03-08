const checker = require('../js/checker');

describe("checker", () => {
    describe("isUrl", () => {
        test("it should return true when text starts with 'http[s]://'", () => {
            const input = 'https://www.google.com';

            const output = true;

            expect(checker.isUrl(input)).toEqual(output);
        });

        test("it should return false when text does NOT start with 'http[s]://'", () => {
            const input = 'How is the Weather?';

            const output = false;

            expect(checker.isUrl(input)).toEqual(output);
        });
    });
});