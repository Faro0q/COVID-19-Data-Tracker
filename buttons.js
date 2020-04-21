
let countriesToTrack = [];
let countryData = {};

fetch('https://pomber.github.io/covid19/timeseries.json')
    .then(response => response.json())
    .then(data => {
        countryData = data;

        const countries = Object.keys(data);
        const countryDatalist = document.querySelector('#countries');
        countries.forEach(country => {
            const countryOption = document.createElement('option');
            countryOption.setAttribute('value', country);
            countryDatalist.appendChild(countryOption);
        });
    });

const countryAddButton = document.querySelector('button#add-country');
countryAddButton.addEventListener('click', () => {
    const countryChoice = document.querySelector('#country-input').value;

    const isActualCountry = Object.keys(countryData).includes(countryChoice);
    const isNotAlreadyTracked = !countriesToTrack.includes(countryChoice);
    const isNotEmpty = countryChoice !== '';

    if (isActualCountry && isNotAlreadyTracked && isNotEmpty) {
        countriesToTrack.push(countryChoice);
        const newCountryListItem = createCountryListItem(countryChoice);
        document.querySelector('ul.country-tracking-list').appendChild(newCountryListItem);
        console.log('Now tracking ' + countryChoice);
    }
    else {
        console.log('Invalid choice, ignoring...');
    }

    document.querySelector('#country-input').value = '';
});

const createCountryListItem = countryName => {
    const listItem = document.createElement('li');
    listItem.classList.add('mdc-list-item');

    // Create text
    const countryText = document.createElement('span');
    countryText.classList.add('mdc-list-item__text');
    countryText.textContent = countryName;

    const graphic = document.createElement('span');
    graphic.classList.add('mdc-list-item__graphic');
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('mdc-icon-button', 'material-icons');
    deleteButton.textContent = 'delete';
    graphic.appendChild(deleteButton);

    deleteButton.addEventListener('click', (e) => {
        const countryToDelete = e.target.parentNode.parentNode.childNodes[0].textContent;

        countriesToTrack = countriesToTrack.filter(country => country !== countryToDelete);
        e.target.parentNode.parentNode.remove();
        console.log('Untracking ' + countryToDelete);
    });

    listItem.appendChild(graphic);
    listItem.appendChild(countryText);

    return listItem;
}