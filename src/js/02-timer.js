import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const flatpickr = require('flatpickr');
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const input = document.getElementById('datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const second = document.querySelector('.timer[data-seconds]');
const minute = document.querySelector('.timer[data-seconds]');
const hour = document.querySelector('.timer[data-seconds]');
const day = document.querySelector('.timer[data-seconds]');

Notify.init({
  position: 'center-center',
  closeButton: false,
});
let timerSetup = 0;

const dataPickr = new flatpickr(input, options); 
dataPickr.selectedDates[0].

const date = new Date();
let endTime = 0;

const timer = {
  start() {
    let timerId = setInterval(() => {
      const currentTime = Date.now();
      endTime = timerSetup - currentTime;
      const timers = convertMs(endTime);

      updateInterface(timers);
      //   display.days = 111;
      console.log(display.days);
      if (endTime > 1000) {
        startBtn.disabled = true;
      } else {
        clearInterval(timerId);
      }
    }, 1000);
  },
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timerSetup = selectedDates[0].getTime();

    if (timerSetup < Date.getTime()) {
      Notify.warning('Please choose a date in the future');
    } else {
      startBtn.disable = false;
    }
  },
};
// const dataPickr = new flatpickr(input, options); і тоді достукаємося до часу
// dataPickr.selectedDates[0].
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

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
const timeForCounter = convertMs(ms);
counterDays.textContent = addLeadingZero(timeForCounter.days, 0); //undefind

// onClose()
// selectedDates.Далі треба цей selectedDates винести, щоб викристовувати в функції onClick.const dataPickr = new flatpickr(input, options);
// dataPickr.selectedDates[0]
