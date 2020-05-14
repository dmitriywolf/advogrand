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
        function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {

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
                //Скрываем все открытые окна если такие есть
                windows.forEach(item => {
                    item.classList.remove('show');
                });

                modal.classList.remove('show');
                document.body.style.overflow = '';
                document.body.style.marginRight = '0px';

            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal && closeClickOverlay) {
                    windows.forEach(item => {
                        item.classList.remove('show');
                    });

                    document.body.style.overflow = '';
                    document.body.style.marginRight = '0px';
                }
            });
        }

        //
        // function showModalBuTime(selector, time) {
        //     setTimeout(function () {
        //         document.querySelector(selector).classList.add('show', 'animated', 'bounceIn');
        //         document.body.classList.add('show-popup');
        //         document.querySelector(selector).addEventListener('click', (e) => {
        //             let elem = e.target;
        //             if (elem === document.querySelector(selector) || elem.closest('.popup__close')) {
        //                 document.querySelector(selector).classList.remove('show');
        //                 document.body.classList.remove('show-popup');
        //             }
        //         })
        //     }, time);
        // }

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


        bindModal('.button--callback', '.popup--callback', '.popup--callback .popup__close');
        bindModal('.button--consultation', '.popup--consultation', '.popup--consultation .popup__close');

        // showModalBuTime('.popup--feature', 10000);
    };

    modals();


    /*Filter
    * =====================================*/


});