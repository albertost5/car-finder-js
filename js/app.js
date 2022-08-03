// HTML ELEMENTS
const resultDiv = document.querySelector('#result');
const yearsSelect = document.querySelector('#year');


// EVENTS
document.addEventListener('DOMContentLoaded', () => {
    showCars();
    fillYearsSelect();
});


// FUNCTIONS
function showCars() {
    cars.forEach( car => {
        const { brand, model, year, doors, transmission, price, color } = car;
        const carHtml = document.createElement('p');

        carHtml.textContent = `
            ${ brand } ${ model } - ${ year } - ${ doors} DOORS - 
            TRANSMISSION: ${ transmission } - PRICE: ${ price} - COLOR: ${ color}
        `;

        resultDiv.appendChild(carHtml);
    });

    console.log('Cars loaded from the "DB"');
}

function fillYearsSelect() {
    const YEARS = [];

    cars.forEach( ({ year }) => {
        if( !YEARS.includes(year) ) {
            YEARS.push( year );
        }
    });

    YEARS.sort( (a, b) => a > b);

    YEARS.forEach( year => {
        const yearOption = document.createElement('option');
        yearOption.value = year;
        yearOption.textContent = year;

        yearsSelect.appendChild(yearOption);
    });

    console.log('Unique years added from the "DB"');
}

