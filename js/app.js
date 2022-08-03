// HTML ELEMENTS
const resultDiv = document.querySelector('#result');
const brandSelect = document.querySelector('#brand'); 
const yearsSelect = document.querySelector('#year');
const minSelect = document.querySelector('#min');
const maxSelect = document.querySelector('#max');
const doorsSelect = document.querySelector('#doors');
const transmisionSelect = document.querySelector('#transmision');
const colorSelect = document.querySelector('#color');

// -------------

const DATA = {
    brand: '',
    year: '',
    min: '',
    max: '',
    doors: '',
    transmission: '',
    color: ''
}

// EVENTS
document.addEventListener('DOMContentLoaded', () => {
    showCars( cars );
    fillYearsSelect();
});

brandSelect.addEventListener('change', (e) => {
    DATA.brand = e.target.value;
    getCarsByFilters();
});

yearsSelect.addEventListener('change', (e) => {
    DATA.year = e.target.value;
    getCarsByFilters();
});
minSelect.addEventListener('change', (e) => {
    DATA.min = e.target.value;
    getCarsByFilters();
});
maxSelect.addEventListener('change', (e) => {
    DATA.max = e.target.value;
    getCarsByFilters();
});
doorsSelect.addEventListener('change', (e) => {
    DATA.doors = e.target.value;
    getCarsByFilters();
});
transmisionSelect.addEventListener('change', (e) => {
    DATA.transmission = e.target.value;
    getCarsByFilters();
});
colorSelect.addEventListener('change', (e) => {
    DATA.color = e.target.value;
    getCarsByFilters();
});


// FUNCTIONS
function showCars( carsArr ) {
    clearCarsHtml();

    carsArr.forEach( car => {
        const { brand, model, year, doors, transmission, price, color } = car;
        const carHtml = document.createElement('p');
        
        carHtml.textContent = `
        ${ brand } ${ model } - ${ year } - ${ doors} DOORS - 
        TRANSMISSION: ${ transmission } - PRICE: ${ price} - COLOR: ${ color}
        `;
        
        resultDiv.appendChild(carHtml);
    });
}

function emptySearch() {
    const errorP = document.createElement('p');
    errorP.classList.add('alerta', 'error')
    errorP.textContent = 'There are not cars with those requirements!';

    clearCarsHtml();
    resultDiv.appendChild(errorP);
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

function clearCarsHtml() {
    resultDiv.textContent = '';
}

// FILTER FUNCTIONS 
function getCarsByFilters() {
    const result = cars.filter( getCarsByBrand )
                            .filter( getCarsByYear )
                                .filter( getCarsByMin )
                                    .filter( getCarsByMax )
                                        .filter( getCarsByDoors )
                                            .filter( getCarsByTrans )
                                                .filter( getCarsByColor );
    console.log(result); 
    
    if ( result.length > 0 ) {
        showCars( result );
    } else {
        emptySearch();
    }
}

function getCarsByBrand( car ) {
    if( DATA.brand ) {
        return car.brand === DATA.brand
    }
    return car;
}

function getCarsByYear( car ) {
    const { year } = DATA;
    if( year ) {
        return car.year == year;
    }
    return car;
}

function getCarsByMin( car ) {
    const { min } = DATA;
    if( min ) {
        return car.price >= min;
    }
    return car;
}

function getCarsByMax( car ) {
    const { max } = DATA;
    if( max ) {
        return car.price <= max;
    }
    return car;
}

function getCarsByDoors( car ) {
    const { doors } = DATA;
    if( doors ) {
        return car.doors == doors;
    }
    return car;
}

function getCarsByTrans( car ) {
    const { transmission } = DATA;
    if( transmission ) {
        return car.transmission == transmission;
    }
    return car;
}

function getCarsByColor( car ) {
    const { color } = DATA;

    if( color ) {
        return car.color == color;
    }
    return car;
}