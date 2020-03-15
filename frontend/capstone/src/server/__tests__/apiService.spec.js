const apiService = require('../apiService');

jest.mock('../apiService');

describe('apiService', () => {
    describe('geonamesApi', () => {
        it('should return JSON data when searchTerm = \'Quincy\'', async () => {
            const req = {
                params: {
                    searchTerm: 'Quincy'
                }
            };

            expect.assertions(2);
            const data = await apiService.geonamesApi(req);

            expect(data.geonames.length).toEqual(1);
            expect(data.geonames[0].name).toMatch('Quincy');
        });
    });

    describe('darkskyApi', () => {
        it('should return JSON data when latitude = 42.25288 and longitude = -71.00227', async () => {
            const req = {
                params: {
                    latitude: 42.25288,
                    longitude: -71.00227
                }
            };

            expect.assertions(2);
            const data = await apiService.darkskyApi(req);

            expect(data.timezone).toMatch('America/New_York');
            expect(data.currently.summary).toMatch('Clear');
        });
    });

    describe('pixabayApi', () => {
        it('should return JSON data when searchTerm = \'Quincy\'', async () => {
            const req = {
                params: {
                    searchTerm: 'Quincy'
                }
            };

            expect.assertions(2);
            const data = await apiService.pixabayApi(req);
            expect(data.hits.length).toEqual(1);
            expect(data.hits[0].largeImageURL).toMatch('https://pixabay.com/get/52e9d54b4255ae14f6da8c7dda79367b103bdbe15a566c4870277fd6974cc559bf_1280.png');
        });
    });
});