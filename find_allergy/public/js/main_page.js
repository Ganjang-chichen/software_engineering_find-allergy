const form = document.querySelector('.form-searchbox');
const input = form.querySelector('input');



function handleSubmit(event) {
    const currentValue = input.value;
    console.log(currentValue);
    if(currentValue === ''){
        alert('you must input something!');
    }
}

function init() {
    form.addEventListener("submit", handleSubmit);
}

init();