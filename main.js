// global variables

let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const employeeCard = document.getElementsByClassName("card");
const modalArrowPrev = document.querySelector(".modal-arrowprev");
const modalArrowNext = document.querySelector(".modal-arrownext");
let index = "";
const modalClose = document.querySelector(".modal-close");


// use fetch to retreive info from the API

fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))

// display employees function with paramater employeeData

function displayEmployees(employeeData) {

    employees = employeeData;

    // store the employee HTML as created
    let employeeHTML = '';

    // loop through each employee & create HTML markup
    employeeData.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

    employeeHTML += `
        <div class = "card" data-index ="${index}">
            <img class="avatar" src="${picture.large}">
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>
    `

    });

    gridContainer.innerHTML = employeeHTML;
}

// display modal function with parameter index
function displayModal(index) {
    let { name, dob, phone, email, location: {city, street, state, postcode}, picture } = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `
        <img class="avatar" src="${picture.large}" alt="employee photo">
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p class="phone">${phone}</p>
            <p class="address">${street.number} ${street.name}, ${state}, ${postcode}</p>
            <p class="birthday">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}


// searchforuser input (searchbar functionality)

const selectEmployee = document.getElementById('searchBar');

let employeesearchIndex = [];

function searchForEmployee() {

let employee = selectEmployee.value.toLowerCase();
let html = '';
employeesearchIndex = [];
for(let i = 0; i < employees.length; i++) {
    let checkName = `${employees[i].name.first} ${employees[i].name.last}`;
    if (checkName.toLowerCase().includes(employee)) {
        employeesearchIndex.push(i);
        let employeeHTML = `
            <div class="card">
                <img class="avatar" src="${employees[i].picture.large}" alt="employee photo">
                <div class="text-container">
                    <h2 class="name">${employees[i].name.first} ${employees[i].name.last}</h2>
                    <p class="email">${employees[i].email}</p>
                    <p class="address">${employees[i].location.city}</p>
                </div>
            </div>`;
            html = html + employeeHTML;
    }
} gridContainer.innerHTML = html;
}


// Event Listeners


//search bar

selectEmployee.addEventListener('keyup', searchForEmployee);

// display modal

gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer){

        const card = e.target.closest(".card");
        const index = card.getAttribute("data-index");

        displayModal(index);
    }

});

// display modal from search results

// gridContainer.addEventListener('click', e => {
//     if (e.target !== gridContainer){

//         const card = e.target.closest(".card");
//         const index = card.getAttribute("data-index");

//         displayModal(index);
//     }

// });

//modal scroll

let showPreviousEmployee = () => {
    if (index != 0) {
        index = Number.parseInt(index, 10) -1;
        displayModal(index)
    } else {    
        index = 11;
        displayModal(11);
    }
}


let showNextEmployee = () => {
    if (index < 12) {
        index = Number.parseInt(index, 10) +1;
        displayModal(index)
    } else {    
        index = 0;
        displayModal(0);
    }
}

modalArrowPrev.addEventListener('click', e => {
    showPreviousEmployee();
});

modalArrowNext.addEventListener('click', e => {
    showNextEmployee();
});

//modalClose


modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});
