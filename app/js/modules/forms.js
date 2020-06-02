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

export {forms};