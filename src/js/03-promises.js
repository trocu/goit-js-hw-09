const form = document.querySelector('.form');
const { delay, step, amount } = form.elements;

// form.addEventListener('input', saveInput);
// function saveInput(e) {
//   const dataInput = {
//     delay: delay.value,
//     step: step.value,
//     amount: amount.value,
//   };
//   console.log(dataInput);
// }

// form.addEventListener('submit', createPromise(amount, delay));

form.addEventListener('input', e => {
  const dataInput = {
    delay: delay.value,
    step: step.value,
    amount: amount.value,
  };
  console.log(dataInput);
});

let counter = 0;
let timerId = null;

form.addEventListener('submit', createPromise());
function createPromise(position, delay) {
  timerId = setInterval(() => {
    const shouldResolve = Math.random() > 0.3;
    const promise = new Promise((resolve, reject) => {
      if (shouldResolve) {
        // Fulfill
        resolve('Hello world!');
      } else {
        // Reject
        reject('Ooops!');
      }
    });
    console.log(promise);
    promise
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
    //Kills interval
    if (++counter === 5) {
      clearInterval(timerId);
    }
  }, 2000);
}
