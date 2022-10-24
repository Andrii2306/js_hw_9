const refs = {
  delayInput: document.getElementsByName('delay'),
  stepInput: document.getElementsByName('step'),
  amountInput: document.getElementsByName('amount'),
  createBtn: document.querySelector('button'),
};
let delay = Number(refs.delayInput[0].value);
let step = Number(refs.stepInput[0].value);
let position = Number(refs.amountInput[0].value);

refs.createBtn.addEventListener('click', counter);

function createPromise(position, delay) {
  return (
    new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
      return { position, delay };
    })
      // createPromise(2, 1500)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      })
  );
}

function counter() {
  setInterval(() => {
    for (let position = 1; position <= amount; position += 1) {
      createPromise(position, delay).then().catch();
      // for (let i = 0, i> position, i += 1) {
      //   createPromise(position, delay);
      position += 1;
      delay += step;
    }
  }, step);
}
// function counter(e) {
// e.preventDefault();
// setIntrval(() => {
//   for (let position = 1; position <= amount; position += 1) {
//     createPromise(position, delay).then().catch();
//   }
// }, step);
// }
