const formHandler = require('../js/formHandler');

describe("formHandler", () => {
    describe("validateInput", () => {
        test("it should return true when input field is NOT blank", () => {
            const input = 'https://www.google.com';

            const output = true;

            expect(formHandler.validateInput(input)).toEqual(output);
        });

        test("it should return false when input field is blank", () => {
            const input = '';

            const output = false;

            expect(formHandler.validateInput(input)).toEqual(output);
        });
    });
});