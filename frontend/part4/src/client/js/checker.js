function isUrl(inputText) {
    const regex = /^http(|s):\/\//; // http[s]://
    return regex.test(inputText);
}

module.exports = { isUrl };
