/*Filter*/
const filter = () => {

    const menu = document.querySelector('.reviews-menu'),
        items = menu.querySelectorAll('li'),
        btnAll = menu.querySelector('.all'),
        btnHealth = menu.querySelector('.health'),
        btnBusiness = menu.querySelector('.business'),
        btnFamily = menu.querySelector('.family'),
        btnCommunal = menu.querySelector('.communal'),
        btnProperty = menu.querySelector('.property'),

        wrapper = document.querySelector('.reviews__list'),
        markAll = wrapper.querySelectorAll('.all'),
        markHealth = wrapper.querySelectorAll('.health'),
        markBusiness = wrapper.querySelectorAll('.business'),
        markFamily = wrapper.querySelectorAll('.family'),
        markCommunal = wrapper.querySelectorAll('.communal'),
        markProperty = wrapper.querySelectorAll('.property');

    //Функция фильтрации элементов
    const typeFilter = (markType) => {
        markAll.forEach(mark => {
            mark.style.display = 'none';
            mark.classList.remove('animated', 'fadeIn');
        });

        if (markType) {
            markType.forEach(mark => {
                mark.style.display = 'block';
                mark.classList.add('animated', 'fadeIn');
            });
        }
    };

    //Обработчики
    btnAll.addEventListener('click', () => {
        typeFilter(markAll);
    });

    btnHealth.addEventListener('click', () => {
        typeFilter(markHealth);
    });

    btnBusiness.addEventListener('click', () => {
        typeFilter(markBusiness);
    });

    btnFamily.addEventListener('click', () => {
        typeFilter(markFamily);
    });

    btnCommunal.addEventListener('click', () => {
        typeFilter(markCommunal);
    });

    btnProperty.addEventListener('click', () => {
        typeFilter(markProperty);
    });

    menu.addEventListener('click', (e) => {
        let target = e.target;

        if (target && target.tagName === 'LI') {
            items.forEach(btn => btn.classList.remove('is-active'));
            target.classList.add('is-active');
        }
    })


};

export {filter};