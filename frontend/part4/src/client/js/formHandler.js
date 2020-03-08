const sentimentDiv = document.getElementById('sentiment');
const classificationDiv = document.getElementById('classification');

async function handleSubmit(event) {
    event.preventDefault();
    
    // check what text was put into the form field
    let formText = document.getElementById('name').value.trim();
    resetResults();

    if(validateInput(formText)) {

        const sentiment = await Client.getSentiment(formText);
        const classification = await Client.getClassification(formText);

        let polarityTxt = sentiment.polarity || '';
        let subjectivityTxt = sentiment.subjectivity || '';
        let sentimentHtml = `
        <table>
            <caption>Sentiment</caption>
            <tr>
                <th>Polarity</th><td>${polarityTxt}</td>
            </tr>
            <tr>
                <th>Subjectivity</th><td>${subjectivityTxt}</td>
            </tr>
        </table>`;

        let labelTxt = classification.categories[0] ? classification.categories[0].label : '';
        let classificationHtml = `
        <table>
            <caption>Classification</caption>
            <tr>
                <th>Label</th><td>${labelTxt}</td>
            </tr>
        </table>`;

        sentimentDiv.innerHTML = sentimentHtml;
        classificationDiv.innerHTML = classificationHtml;
    } else {
        sentimentDiv.innerHTML = '<p class="alert">Field must NOT be blank!</p>';
    }

}

function resetResults() {
    sentimentDiv.innerHTML = '<p>Analysis in progress...</p>';
    classificationDiv.innerHTML = '';
}

function validateInput(inputText) {
    if(inputText === '') {
        return false;
    } else {
        return true;
    }
}

module.exports = { handleSubmit, validateInput }
