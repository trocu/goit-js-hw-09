const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = null;
startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    body.style.background = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.disabled = false;
});
