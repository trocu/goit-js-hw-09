import Notiflix from 'notiflix';
const form = document.querySelector('.form');

form.addEventListener('submit', saveInput);
function saveInput(e) {
  e.preventDefault();

  const { delay, step, amount } = e.currentTarget.elements;

  for (let i = 1; i <= amount.value; i++) {
    let position = +i;
    let stepDelay = step.value * i;
    let delayed = Number(delay.value) + stepDelay;

    createPromise(position, delayed)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
