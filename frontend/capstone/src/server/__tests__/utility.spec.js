const utility = require('../utility');

describe('utility', () => {
    describe('delimitValues', () => {
        it('should return values delimited by comma', () => {
            let inputValues = [75, 42, 68];

            let output = '75,42,68';

            expect(utility.delimitValues(inputValues)).toMatch(output);
        });

        it('should return values delimited by comma without trailing comma', () => {
            let inputValues = [75, 42, 68, undefined];

            let output = '75,42,68';

            expect(utility.delimitValues(inputValues)).toMatch(output);
        });

        it('should return values delimited by semi-colon', () => {
            let inputValues = [75, 42, 68];
            let inputDelimiter = ';';

            let output = '75;42;68';

            expect(utility.delimitValues(inputValues, inputDelimiter)).toMatch(output);
        });

        it('should return values delimited by semi-colon without trailing semi-colon', () => {
            let inputValues = [75, 42, 68, undefined];
            let inputDelimiter = ';';

            let output = '75;42;68';

            expect(utility.delimitValues(inputValues, inputDelimiter)).toMatch(output);
        });
    });
});