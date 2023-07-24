// Timer

const timerHoursInput = document.getElementById("timer-hours");
const timerMinutesInput = document.getElementById("timer-minutes");
const timerSecondsInput = document.getElementById("timer-seconds");
const timerStartButton = document.getElementById("timer-start");
const timerPauseButton = document.getElementById("timer-pause");
const timerResetButton = document.getElementById("timer-reset");
const timerDisplay = document.getElementById("timer-display");

let timerInterval = null;
let timerEndTime = null;

function updateTimerDisplay() {
  const now = new Date().getTime();
  const timeRemaining = timerEndTime - now;

  if (timeRemaining <= 0) {
    timerDisplay.innerHTML = "00:00:00";
    clearInterval(timerInterval);
    timerInterval = null;
    timerStartButton.disabled = false;
    timerPauseButton.disabled = true;
    timerResetButton.disabled = true;
  } else {
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, "0");
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0");
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000).toString().padStart(2, "0");
    timerDisplay.innerHTML = `${hours}:${minutes}:${seconds}`;
  }
}

function startTimer() {
  const hours = parseInt(timerHoursInput.value);
  const minutes = parseInt(timerMinutesInput.value);
  const seconds = parseInt(timerSecondsInput.value);
  const now = new Date().getTime();
  timerEndTime = now + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);

  if (!timerInterval) {
    timerInterval = setInterval(updateTimerDisplay, 1000);
    timerStartButton.disabled = true;
    timerPauseButton.disabled = false;
    timerResetButton.disabled = false;
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerStartButton.disabled = false;
  timerPauseButton.disabled = true;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerDisplay.innerHTML = "00:00:00";
  timerStartButton.disabled = false;
  timerPauseButton.disabled = true;
  timerResetButton.disabled = true;
}

timerStartButton.addEventListener("click", startTimer);
timerPauseButton.addEventListener("click", pauseTimer);
timerResetButton.addEventListener("click", resetTimer);

// StopWatch
let stopwatchInterval;
let stopwatchSeconds = 0;
let stopwatchMinutes = 0;
let stopwatchHours = 0;
let stopwatchDisplay = document.getElementById("stopwatch-display");

function startStopwatch() {
  stopwatchInterval = setInterval(() => {
    stopwatchSeconds++;
    if (stopwatchSeconds === 60) {
      stopwatchSeconds = 0;
      stopwatchMinutes++;
    }
    if (stopwatchMinutes === 60) {
      stopwatchMinutes = 0;
      stopwatchHours++;
    }
    let formattedSeconds =
      stopwatchSeconds < 10 ? "0" + stopwatchSeconds : stopwatchSeconds;
    let formattedMinutes =
      stopwatchMinutes < 10 ? "0" + stopwatchMinutes : stopwatchMinutes;
    let formattedHours =
      stopwatchHours < 10 ? "0" + stopwatchHours : stopwatchHours;
    stopwatchDisplay.innerText =
      formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;
  }, 1000);
}

function pauseStopwatch() {
  clearInterval(stopwatchInterval);
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchSeconds = 0;
  stopwatchMinutes = 0;
  stopwatchHours = 0;
  stopwatchDisplay.innerText = "00:00:00";
}

let stopwatchStartButton = document.getElementById("stopwatch-start");
let stopwatchPauseButton = document.getElementById("stopwatch-pause");
let stopwatchResetButton = document.getElementById("stopwatch-reset");

stopwatchStartButton.addEventListener("click", () => {
  startStopwatch();
  stopwatchStartButton.disabled = true;
  stopwatchPauseButton.disabled = false;
  stopwatchResetButton.disabled = false;
});

stopwatchPauseButton.addEventListener("click", () => {
  pauseStopwatch();
  stopwatchStartButton.disabled = false;
  stopwatchPauseButton.disabled = true;
});

stopwatchResetButton.addEventListener("click", () => {
  resetStopwatch();
  stopwatchStartButton.disabled = false;
  stopwatchPauseButton.disabled = true;
  stopwatchResetButton.disabled = true;
});
