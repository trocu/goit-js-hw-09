import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysCounter = document.querySelector('[data-days]');
const hoursCounter = document.querySelector('[data-hours]');
const minutesCounter = document.querySelector('[data-minutes]');
const secondsCounter = document.querySelector('[data-seconds]');
const fp = flatpickr(dateInput);
const now = new Date();

//Deactivate button before date pick
startBtn.disabled = true;

//The body of the flatpick library
flatpickr(dateInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < now.getTime()) {
      startBtn.disabled = true;
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    startBtn.disabled = false;
  },
});

//Reset timer ID
let timerId = null;

//Convert epoch to ms and start countdown
startBtn.addEventListener('click', timeLeft);
function timeLeft() {
  timerId = setInterval(() => {
    const dateSelected = Date.parse(fp.input.value);
    const remainingTime = dateSelected - Date.now();
    const { days, hours, minutes, seconds } = convertMs(remainingTime);

    //If timer reaches zero stop counting
    if (seconds === -1) {
      clearInterval(timerId);
      return;
    }
    daysCounter.textContent = addLeadingZero(days);
    hoursCounter.textContent = addLeadingZero(hours);
    minutesCounter.textContent = addLeadingZero(minutes);
    secondsCounter.textContent = addLeadingZero(seconds);
  }, 1000);
}

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

//Adding a leading zero to a single number
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
