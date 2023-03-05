import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const fp = flatpickr(dateInput);
const now = new Date();

startBtn.disabled = true;

flatpickr(dateInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < now.getTime()) {
      startBtn.disabled = true;
      return alert('Please choose a date in the future');
    }
    startBtn.disabled = false;

    // console.log(date.getTime());
    // console.log(selectedDates[0]);
    // console.log(selectedDates[0].getTime());
    console.log(fp.input.value);
  },
  onChange(selectedDates) {},
});
