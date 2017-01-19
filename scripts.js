const buttons = document.querySelectorAll('button');
const breakButtons = document.querySelectorAll('.break-button');
const sessionButtons = document.querySelectorAll('.session-button');
const breakInput = document.querySelector('.break-value');
const sessionInput = document.querySelector('.session-value');
const timer = document.querySelector('.timer');

let sessionTime = 25;
let breakTime = 5;

// set initial break and session values
breakInput.innerHTML = breakTime;
sessionInput.innerHTML = sessionTime;

// set pomodoro timer value
const sessionMicroSeconds = sessionTime * 60 * 1000;
updateDisplay(sessionMicroSeconds);

function updateBreak() {
  if (this.value === 'increase') {
    breakTime++;
  } if (this.value === 'decrease' && breakTime > 1) {
    breakTime--;
  }
  breakInput.textContent = breakTime;
}

function updateSession() {
  if (this.value === 'increase') {
    sessionTime++;
  } if (this.value === 'decrease' && sessionTime > 1) {
    sessionTime--;
  }
  sessionInput.textContent = sessionTime;
  const sessionMicroSeconds = sessionTime * 60 * 1000;
  updateDisplay(sessionMicroSeconds);

}

function startTimer() {
  const sessionSeconds = Math.floor(sessionTime * 60);
  const now = new Date().getTime();
  const endTime = now + (sessionSeconds*1000);

  // need to do a setInterval and countdown the session time
  // when the session timer is 0, switch to break.
  // keep looping.
  const timeInterval = setInterval(() => {
    const timeRemaining = countDown(endTime);
    if (timeRemaining <= 0) {
      clearInterval(timeInterval);
    }
    updateDisplay(timeRemaining);
  }, 1000);
}

function countDown(time) {
  const now = new Date().getTime();
  const timeRemaining = time - now;
  return timeRemaining;
}

function updateDisplay(timeRemaining) {
  const seconds = Math.floor((timeRemaining / 1000 % 60));
  const minutes = Math.floor((timeRemaining / (60 * 1000)) % 60 );
  timer.textContent = `${minutes}:${formatSeconds(seconds)}`
}

  function formatSeconds(seconds) {
    return (seconds < 10) ? `0${seconds}` : seconds;
  }

buttons.forEach(button => button.addEventListener('mousedown', (e => e.preventDefault())));
breakButtons.forEach(button => button.addEventListener('click', updateBreak));
sessionButtons.forEach(button => button.addEventListener('click', updateSession));
timer.addEventListener('click', startTimer);
