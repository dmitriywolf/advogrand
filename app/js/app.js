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
        function bindModal(triggerSelector, modalSelector, closeSelector) {

            const trigger = document.querySelectorAll(triggerSelector),
                modal = document.querySelector(modalSelector),
                close = document.querySelector(closeSelector);

            trigger.forEach(item => {
                item.addEventListener('click', (e) => {
                    if (e.target) {
                        e.preventDefault();
                    }
                    modal.classList.add('show', 'animated', 'bounceIn');
                    document.body.classList.add('show-popup');
                });
            });

            close.addEventListener('click', () => {
                modal.classList.remove('show');
                document.body.classList.remove('show-popup');
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                    document.body.classList.remove('show-popup');
                }
            })
        }

        function showModalBuTime(selector, time) {
            setTimeout(function () {
                document.querySelector(selector).style.display = 'block';
            }, time);
        }

        bindModal('.button--callback', '.popup--callback', '.popup--callback .popup__close');
    };

    modals();


});