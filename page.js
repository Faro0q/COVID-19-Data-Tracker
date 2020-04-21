const urlHash = window.location.hash;
const pages = ['#search', '#table', '#chart'];
const hideViews = () => {
    const views = document.querySelectorAll('div.view');
    views.forEach(view => view.classList.remove('active'));
}
const pageToShow = pages.includes(urlHash) ? urlHash : '#search';
document.querySelector(pageToShow).classList.add('active');

const topAppBarButtons = document.querySelectorAll('a.mdc-top-app-bar__action-item--unbounded');
topAppBarButtons.forEach(button => {
    button.addEventListener('click', () => {
        hideViews();
        const destination = button.getAttribute('href');
        document.querySelector(destination).classList.add('active');
        
        console.log('going to: ' + destination);
    });
});
const textField = new mdc.textField.MDCTextField(document.querySelector('.mdc-text-field'));
