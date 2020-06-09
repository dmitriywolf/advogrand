/*Modals*/
const modals = () => {

    let btnPress = false;

    function bindModal(triggerSelector, modalSelector, closeSelector) {

        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('.popup'),
            scroll = calcScroll();

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                btnPress = true;

                //Скрываем все открытые окна если такие есть
                windows.forEach(item => {
                    item.classList.remove('show');
                });

                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
            });
        });

        close.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = '';
            document.body.style.marginRight = '0px';

        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                windows.forEach(item => {
                    item.classList.remove('show');
                });

                modal.classList.remove('show');
                document.body.style.overflow = '';
                document.body.style.marginRight = '0px';
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function () {

            let display;

            document.querySelectorAll('.popup').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = 'block';
                }
            });

            if (!display) {
                document.querySelector(selector).classList.add('show');
                document.body.style.overflow = 'hidden';
                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`;
            }
        }, time);
    }

    //Получаем ширину скролла
    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';

        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        return scrollWidth;
    }

    //Показывать окно когда пользователь пролистает до конца не нажмет ни одну кнопку
    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

            if (!btnPress && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {
                document.querySelector(selector).click();
            }
        });
    }

    bindModal('.button--callback', '.popup--callback', '.popup--callback .popup__close');
    bindModal('.button--consultation', '.popup--consultation', '.popup--consultation .popup__close');
    bindModal('.button--feature', '.popup--feature', '.popup--feature .popup__close');

    //showModalByTime('.popup--callback', 60000);

    openByScroll('.button--feature');
};

export {modals};