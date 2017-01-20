const buttons = document.querySelectorAll('button');
const breakButtons = document.querySelectorAll('.break-button');
const sessionButtons = document.querySelectorAll('.session-button');
const breakInput = document.querySelector('.break-value');
const sessionInput = document.querySelector('.session-value');
const timer = document.querySelector('.timer');
const timerType = document.querySelector('.timer-type');

let sessionTime = 25;
let breakTime = 5;
let isActive = false;
let timeInterval;

// set initial break and session values
breakInput.innerHTML = breakTime;
sessionInput.innerHTML = sessionTime;

// set pomodoro timer value
const time = sessionTime * 60;
updateDisplay(time,'Session');

function updateBreak() {
  if (this.value === 'increase') {
    breakTime++;
  } if (this.value === 'decrease' && breakTime > 1) {
    breakTime--;
  }
  breakInput.textContent = breakTime;
}

function updateSession() {
  if (isActive) {return;}
  if (this.value === 'increase') {
    sessionTime++;
  } if (this.value === 'decrease' && sessionTime > 1) {
    sessionTime--;
  }
  sessionInput.textContent = sessionTime;
  const sessionSeconds = sessionTime * 60;
  updateDisplay(sessionSeconds, 'Session');
}

function toggleTimer() {
  isActive = !isActive;
  if (isActive) {
    buttons.forEach(button => button.disabled = true);
    startTimer();

  } else {
    buttons.forEach(button => button.disabled = false);
    clearInterval(timeInterval);
    const sessionSeconds = sessionTime * 60;
    updateDisplay(sessionSeconds, 'Session');
    return;
  }
}

function startTimer() {
  const sessionSeconds = Math.floor(sessionTime * 60);
  const now = new Date().getTime();
  const endTime = (now / 1000) + (sessionSeconds);

  timeInterval = setInterval(() => {
    timeRemaining = Math.ceil(countDown(endTime));
    console.log(timeRemaining);

    if (timeRemaining <= 0) {
      clearInterval(timeInterval);
      startBreakTimer();
    }
    updateDisplay(timeRemaining, 'Session');
  }, 1000);
}

function startBreakTimer() {
  const breakSeconds = Math.floor(breakTime * 60);
  const now = new Date().getTime();
  const endTime = (now / 1000) + (breakSeconds);

  timeInterval = setInterval(() => {
    const timeRemaining = Math.ceil(countDown(endTime));
    console.log(timeRemaining);

    if (timeRemaining <= 0) {
      clearInterval(timeInterval);
      startTimer();
    }
    updateDisplay(timeRemaining, 'Break');
  }, 1000);
}

function countDown(time) {
  const now = new Date().getTime();
  const timeRemaining = Math.max(0, time - (now / 1000));
  return timeRemaining;
}

function updateDisplay(timeRemaining, type) {
  const seconds = Math.floor((timeRemaining % 60));
  const minutes = Math.floor((timeRemaining / 60) % 60 );
  timer.textContent = `${minutes}:${formatSeconds(seconds)}`
  timer.textContent = `${minutes}:${formatSeconds(seconds)}`
  timerType.textContent = type;
}

function formatSeconds(seconds) {
  return (seconds < 10) ? `0${seconds}` : seconds;
}

buttons.forEach(button => button.addEventListener('mousedown', (e => e.preventDefault())));
breakButtons.forEach(button => button.addEventListener('click', updateBreak));
sessionButtons.forEach(button => button.addEventListener('click', updateSession));
timer.addEventListener('click', toggleTimer);
