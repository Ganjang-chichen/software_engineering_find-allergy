const search_dir = document.querySelector(".search_box");
const search_form = search_dir.querySelector(".form-search");
const search_input = search_form.querySelector("input");

const allergy_explorer  = "allergy_explorer";

function searchHandler(event) {
    event.preventDefault();
    console.log(search_input.value);
    
    localStorage.setItem(allergy_explorer, search_input.value);

    location.href = "./searched_page.html";
}


function init() {
    search_dir.addEventListener("submit", searchHandler);
}

init();