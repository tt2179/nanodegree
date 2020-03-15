const http = require('http');
const https = require('https');

/**
 * Perform remote HTTP request
 */
module.exports.httpHelper = async function (options) {
    return new Promise((resolve, reject) => {
        let data = '';

        const req = (options.protocol === 'https:' ? https : http).request(options, res => {
            res.on('data', chunk => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(JSON.parse(data));
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.end();
    });
};

/**
 * Delimit array of values with specified delimiter
 */
module.exports.delimitValues = function(values, delimiter = ',') {
    const regExp = new RegExp(`${delimiter}$`);
    return values.join(delimiter).replace(regExp,'');
};