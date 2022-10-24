const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
start.addEventListener('click', changeColor);
let intervId;
function changeColor() {
  if (!intervId)
    intervId = setInterval(() => {
      document.body.style.background = getRandomHexColor();
    }, 1000);
}
stop.addEventListener('click', stopColor);

function stopColor() {
  clearInterval(intervId);
  intervId = null;
}
