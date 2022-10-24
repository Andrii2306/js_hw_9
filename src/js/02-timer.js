import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const selectedDates = document.querySelector('input#datetime-picker');

const startCounterBtn = document.querySelector('[data-start]');
startCounterBtn.disabled = true;

const counterDays = document.querySelector('[data-days]');
const counterHours = document.querySelector('[data-hours]');
const counterMinutes = document.querySelector('[data-minutes]');
const counterSeconds = document.querySelector('[data-seconds]');

let ms; // змінна для запису часу відліку у мс

let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let currentDate = new Date();

    //перевірка дати на валідність (майбутнє):
    if (selectedDates[0] < currentDate) {
      startCounterBtn.disabled = true;

      clearInterval(timerId);
      counterDays.textContent = '00';
      counterHours.textContent = '00';
      counterMinutes.textContent = '00';
      counterSeconds.textContent = '00';

      //alert("Please choose a date in the future");
      Notiflix.Report.failure(
        'Wrong date!',
        'Please choose a date in the future',
        'Ok'
      );

      setTimeout(() => {
        document.location.reload();
      }, 4000);

      return;
    }

    console.log('currentDate: ', currentDate);
    console.log('selectedDates[0] : ', selectedDates[0]);

    // активація кнопки
    startCounterBtn.disabled = false;

    //слухач на кнопку
    startCounterBtn.addEventListener('click', onClick);
  },
};

const dataPickr = new flatpickr(selectedDates, options);

function onClick() {
  timerId = setInterval(() => {
    let currentDate = new Date();

    // визначення та запис у змінну часу відліку у мс
    ms = dataPickr.selectedDates[0] - currentDate;

    console.log('time to count, ms =', ms);

    const timeForCounter = convertMs(ms);

    console.log("It's timeForCounter inside setInterval :", timeForCounter);

    counterDays.textContent = addLeadingZero(timeForCounter.days, 0);
    counterHours.textContent = addLeadingZero(timeForCounter.hours, 0);
    counterMinutes.textContent = addLeadingZero(timeForCounter.minutes, 0);
    counterSeconds.textContent = addLeadingZero(timeForCounter.seconds, 0);

    startCounterBtn.disabled = true;

    if (
      timeForCounter.days === 0 &&
      timeForCounter.hours === 0 &&
      timeForCounter.minutes === 0 &&
      timeForCounter.seconds === 0
    ) {
      clearInterval(timerId);

      setTimeout(() => {
        document.location.reload();
      }, 10000);
    }
  }, 1000);
}

// Для підрахунку значень використовуй готову функцію convertMs, де ms - різниця між кінцевою і поточною датою в мілісекундах.
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  // console.log("It's inside _convertMs(ms)_ :", { days, hours, minutes, seconds } );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value, addingSymbols) {
  return value.toString().padStart(2, addingSymbols);
}
