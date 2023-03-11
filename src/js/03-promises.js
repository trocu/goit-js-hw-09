import Notiflix from 'notiflix';
const form = document.querySelector('.form');

//Make a new promise as the result of the function
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

form.addEventListener('submit', saveInput);
function saveInput(e) {
  e.preventDefault();

  const { delay, step, amount } = e.currentTarget.elements;
  //Add a loop for creating new promises
  for (let i = 1; i <= amount.value; i++) {
    let position = +i;
    let stepDelay = step.value * i;
    let delayed = Number(delay.value) + stepDelay;

    //Create a new promise
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
