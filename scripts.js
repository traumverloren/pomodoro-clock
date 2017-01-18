const buttons = document.querySelectorAll('button');
const breakButtons = document.querySelectorAll('.break-button');
const sessionButtons = document.querySelectorAll('.session-button');
const breakValue = document.querySelector('.break-value');
const sessionValue = document.querySelector('.session-value');
const timer = document.querySelector('.timer');

let sessionTime = 25;
let breakTime = 5;

// set initial break and session values
breakValue.innerHTML = breakTime;
sessionValue.innerHTML = sessionTime;

// set pomodoro timer value
timer.innerHTML = sessionTime;

function updateBreak() {
  this.value === 'increase' ? breakTime++ : breakTime--;
  breakValue.innerHTML = breakTime;
}

function updateSession() {
  this.value === 'increase' ? sessionTime++ : sessionTime--;
  sessionValue.innerHTML = sessionTime;
  timer.innerHTML = sessionTime;
}

buttons.forEach(button => button.addEventListener('mousedown', (e => e.preventDefault())));
breakButtons.forEach(button => button.addEventListener('click', updateBreak));
sessionButtons.forEach(button => button.addEventListener('click', updateSession));
