const form = document.querySelector('.form-searchbox');
const input = form.querySelector('input');


function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    localStorage.setItem('value', currentValue);
    location.href = '../searched_page';
}

function init() {
    form.addEventListener("submit", handleSubmit);
}

init();