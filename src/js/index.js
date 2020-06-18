document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    const navHeader = () => {
        let headerTop = document.querySelector('.header__top');
        let intro = document.getElementById('intro');
        let burger = document.querySelector('.burger');
        let nav = document.querySelector('.nav__list ');
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
        burger.addEventListener('click', function () {
            if (!this.classList.contains('burger--close')) {
                this.classList.add('burger--close');
                nav.classList.add('show', 'bounceInLeft');
            } else {
                this.classList.remove('burger--close');
                nav.classList.remove('show', 'bounceInLeft');
            }
        });

        nav.addEventListener('click', function (event) {
            let element = event.target;
            if (element.classList.contains('nav__link') && nav.classList.contains('show')) {
                nav.classList.remove('show');
                burger.classList.remove('burger--close');
            }
        });

    };
    navHeader();

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
    modals();

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
    tariffs();

    const forms = () => {

        let form = document.querySelectorAll('form');
        let inputs = document.querySelectorAll('input');
        let textFields = document.querySelectorAll('textarea');
        let phoneFields = document.querySelectorAll('input[type="tel"]');

        //В полях номера телефона вводить только цифры
        phoneFields.forEach(input => {
            input.addEventListener('input', () => {
                input.value = input.value.replace(/\D/, '');
            });
        });

        //Ответы для пользователя
        const answers = {
            loadingMessage: 'Загрузка...',
            successMessage: 'Спасибо! Мы ответим Вам в течении 10 минут',
            failMessage: 'Извините! Что-то пошло не так...',
            loadingImg: './img/loading.gif',
            successImg: './img/success.png'
        };

        //Функция отправки запроса
        const postData = async (url, data) => {
            let response = await fetch(url, {
                method: "POST",
                body: data
            });
            return await response.text();
        };

        //Очистка полей формы после отправки
        const clearFields = () => {
            inputs.forEach(input => {
                input.value = "";
            });

            textFields.forEach(field => {
                field.value = "";
            });
        };

        //Обрабочик на отправку формы Submit
        form.forEach(item => {

            item.addEventListener('submit', (event) => {

                //Отмена стандартного поведения браузера
                event.preventDefault();

                //Блок ответа для пользователя
                let answerPopup = document.createElement('div');
                answerPopup.classList.add('popup__answer', 'animated', 'flipInX');
                document.body.append(answerPopup);

                let answerImg = document.createElement('img');
                answerImg.setAttribute('src', answers.loadingImg);
                answerPopup.append(answerImg);

                let answerText = document.createElement('p');
                answerText.textContent = answers.loadingMessage;
                answerPopup.append(answerText);

                let divFail = document.createElement('div');
                divFail.classList.add('img__failed');

                //Собрание всех данных которые ввел пользователь
                const formData = new FormData(item);

                //Осуществляем post запрос
                postData('./server.php', formData)
                //Успешное выполнение
                    .then(response => {
                        // console.log(response);
                        answerImg.setAttribute('src', answers.successImg);
                        answerText.textContent = answers.successMessage;
                    })
                    //Обработка ошибки
                    .catch(() => {
                        answerImg.remove();
                        answerPopup.prepend(divFail);
                        answerText.textContent = answers.failMessage;
                    })
                    .finally(() => {
                        clearFields();
                        setTimeout(() => {
                            answerPopup.classList.remove('flipInX');
                            answerPopup.classList.add('flipOutX');
                            // answerPopup.remove();
                        }, 4000);
                    })
            });

        });

    };
    forms();

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
    filter();

    const carousel = () => {
        const configPartners = {
            type: 'carousel',
            startAt: 0,
            perView: 4,
            breakpoints: {
                900: {
                    perView: 3,
                },
                680: {
                    perView: 2,
                },
                460: {
                    perView: 1,
                },
            }
        };
        new Glide('.glide--partners', configPartners).mount();
    };
    carousel();
});