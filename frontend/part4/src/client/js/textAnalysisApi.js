const apiPrefix = 'http://localhost:8081';

module.exports.getSentiment = async function(text) {
    let endpoint = `${apiPrefix}/sentiment/phrase/${text}`;
    let res = '';

    if(Client.isUrl(text)) {
        endpoint = `${apiPrefix}/sentiment/url`;
        res = await fetch(endpoint, Client.setPostOptions(text));
    } else {
        res = await fetch(endpoint);
    }

    try {
        return await res.json();
    } catch (error) {
        console.log(error);
    }
};

module.exports.getClassification = async function(text) {
    let endpoint = `${apiPrefix}/classify/phrase/${text}`;
    let res = '';

    if(Client.isUrl(text)) {
        endpoint = `${apiPrefix}/classify/url`;
        res = await fetch(endpoint, Client.setPostOptions(text));
    } else {
        res = await fetch(endpoint);
    }

    try {
        return await res.json();
    } catch (error) {
        console.log(error);
    }
};

module.exports.setPostOptions = function(text) {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({url: text})
    };
}