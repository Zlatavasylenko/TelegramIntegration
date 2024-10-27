"use strict"
//==========================================
const TELEGRAM_BOT_TOKEN = '8156918533:AAF9eNWYbvgNvG13d8oycdLns9FUam7q7qA';
const TELEGRAM_CHAT_ID = '@BotIntegrationZlata';
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

async function sendEmailTelegram(event) {
    event.preventDefault();

    const form = event.target;
    const formBtn = document.querySelector('.form__submit-button button');
    const formSendResult = document.querySelector('.form__send-result');
    formSendResult.textContent = '';

    const { name, email, phone, gender } = Object.fromEntries(new FormData(form).entries());

    const text = `Заявка від нового відправника!\n Ім'я:${name}\nEmail: ${email}\nТелефон: ${phone}\nСтать: ${gender}`;

    try {
        formBtn.textContent = 'Завантаження...';

        const response = await fetch(API, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text,
            })
        });

        if (response.ok) {
            formSendResult.textContent = 'Дякуємо за ваше повідомлення! Ми звяжемося з вами найближчим часом.';
            form.reset();
        } else {
            throw new Error(response.statusText);
        }

    } catch (error) {
        console.error(error);
        formSendResult.textContent = 'Анкета не відправлена! Спробуйте пізніше.';
        formSendResult.style.color = 'red';

    } finally {
        formBtn.textContent = 'Відправити';
    }
}
