/*Tariffs*/
const tariffs = () => {

    let tariffsContent = document.querySelector('.tariffs__list');
    let tariffLinks = document.querySelectorAll('.tariffs-menu__link');

    tariffLinks.forEach(item => {
        item.addEventListener('click', (e) => {
            tariffLinks.forEach(item => {
                item.classList.remove('is-active');
            });
            item.classList.add('is-active');
            tariffsContent.classList.toggle('horizontally');
        });
    });
};

export {tariffs};