document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    /*Nav Header*/
    const navHeader = () => {
        let headerTop = document.querySelector('.header__top');
        let intro = document.getElementById('intro');

        let introHeight = intro.offsetHeight;
        let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        //Fixed TopHeader
        window.addEventListener('scroll', () => {
            introHeight = intro.offsetHeight;
            scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollPosition > introHeight) {
                headerTop.classList.add('fixed', 'animated', 'bounceInLeft');
            } else {
                headerTop.classList.remove('fixed', 'bounceInLeft');
            }

        });


    };
    navHeader();

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

        showModalByTime('.popup--callback', 60000);

        openByScroll('.button--feature');
    };

    modals();

    /*Smooth Scroll*/
    const scrolling = () => {
        /*PageUp*/
        let upElement = document.querySelector('.pageup');
        window.addEventListener('scroll', () => {

            if (document.documentElement.scrollTop > 1500) {
                upElement.classList.add('fadeIn');
                upElement.classList.remove('fadeOut');

            } else {
                upElement.classList.add('fadeOut');
                upElement.classList.remove('fadeIn');
            }
        });

        //Вспомогательные переменные для кроссбраузерности
        const element = document.documentElement,
            body = document.body;

        //Якоря
        let anchors = document.querySelectorAll('[href^="#"]');

        //Подсчет расстояния скролинга
        const calcScroll = () => {

            anchors.forEach(item => {
                item.addEventListener('click', function (event) {

                    console.log(item.hash);

                    let scrollTop = Math.round(body.scrollTop || element.scrollTop);

                    if (this.hash !== '') {
                        event.preventDefault();

                        //Элемент к которому будет произведен скрол
                        let hashElement = document.querySelector(this.hash);
                        let hashElementTop = 0;

                        while (hashElement.offsetParent) {
                            hashElementTop += hashElement.offsetTop;
                            hashElement = hashElement.offsetParent;
                        }

                        hashElementTop = Math.round(hashElementTop);

                        smoothScroll(scrollTop, hashElementTop, this.hash);
                    }
                });
            })

        };

        //Функция скролинга
        const smoothScroll = (from, to, hash) => {

            let timeInterval = 1,
                prevScrollTop,
                speed;

            //Скорость
            if (to > from) {
                speed = 30;
            } else {
                speed = -30;
            }

            //Анимация скролла
            let move = setInterval(function () {
                let scrollTop = Math.round(body.scrollTop || element.scrollTop);

                if (
                    prevScrollTop === scrollTop ||
                    (to > from && scrollTop >= to) ||
                    (to < from && scrollTop <= to)
                ) {
                    clearInterval(move);
                    history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
                } else {
                    body.scrollTop += speed;
                    element.scrollTop += speed;
                    prevScrollTop = scrollTop;
                }

            }, timeInterval);
        };

        calcScroll();
    };

    scrolling();


    /*Tariffs*/
    const tariffs = () => {

        let tariffsContent = document.querySelector('.tariffs__list');
        let tariffLinks = document.querySelectorAll('.tariffs-menu__link');

        tariffLinks.forEach(item => {

        })

    };

    tariffs();


});