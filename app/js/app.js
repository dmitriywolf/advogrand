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

    /*Forms*/
    const forms = () => {

        //Все формы и поля
        const form = document.querySelectorAll('form'),
            inputs = document.querySelectorAll('input'),
            textareas = document.querySelectorAll('textarea'),
            phoneInput = document.querySelectorAll('input[name="user-phone"]');

        //Проверка ввода номера телефона: Убрать все не числовые значения
        phoneInput.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/\D/, '');
            });
        });

        //Объект сообщений
        const message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Мы свяжемся с вами в течении 5 минут!',
            failure: 'Что-то пошло не так...'
        };

        //Функция отправки запроса
        const postData = async (url, data) => {
            document.querySelector('.status').textContent = message.loading;

            let res = await fetch(url, {
                method: "POST",
                body: data
            });

            return await res.text();
        };

        //Функция очистки полей
        const clearFields = () => {
            inputs.forEach(item => {
                item.value = "";
            });

            textareas.forEach(item => {
                item.value = "";
            });
        };

        form.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();

                //Блок показа ответа
                let statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                item.appendChild(statusMessage);

                //Собираем все данные с формы
                let formData = new FormData(item);

                //Отправляем запрос на сервер
                postData('server.php', formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = message.success;
                    })
                    .catch(() => statusMessage.textContent = message.failure)
                    .finally(() => {
                        clearFields();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 5000);
                    });

            });
        });


    };

    forms();

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

    filter();


});