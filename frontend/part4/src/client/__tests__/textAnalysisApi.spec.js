const textAnalysisApi = require('../js/textAnalysisApi');

describe('textAnalysisApi', () => {
    describe('getPostOptions', () => {
        test('it should return POST method and stringified input text', () => {
            const input = 'http://www.google.com';
            const output = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({url: input})
            };

            expect(textAnalysisApi.setPostOptions(input)).toEqual(output);
        })
    })
})