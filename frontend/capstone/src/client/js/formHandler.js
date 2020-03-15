const form = document.getElementById('travelForm');
const inputPlace = document.getElementById('travelPlace');
const inputDate = document.getElementById('travelDate');
const buttonSubmit = document.getElementById('travelSubmit');

function handleForm () {
    form.addEventListener('submit', (event) => {
        submitForm(event);
    });

    inputPlace.addEventListener('focus', (event) => {
        inputPlace.value = '';
    });

    inputDate.addEventListener('focus', (event) => {
        inputDate.value = '';
    });

    buttonSubmit.addEventListener('click', (event) => {
        submitForm(event);
    });

    function submitForm(event) {
        event.preventDefault();

        if(inputPlace.value !== '') {
            inputPlace.style.borderColor = '';
            Client.processInput(inputPlace, inputDate);
        } else {
            inputPlace.focus();
            inputPlace.style.borderColor = 'red';
        }
    }
}

export {
    handleForm
};