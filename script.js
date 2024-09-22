// Variables to keep track of time and interval
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

// Elements
const timeDisplay = document.getElementById('display'); // Matches your HTML 'display' element
const lapContainer = document.getElementById('laps'); // Matches your HTML 'laps' element

// Function to format time in HH:MM:SS:ms format
function formatTime(time) {
    let milliseconds = Math.floor((time % 1000) / 10); // Get milliseconds
    let seconds = Math.floor((time / 1000) % 60); // Get seconds
    let minutes = Math.floor((time / (1000 * 60)) % 60); // Get minutes
    let hours = Math.floor((time / (1000 * 60 * 60)) % 24); // Get hours

    return (
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds) + ":" +
        (milliseconds < 10 ? "0" + milliseconds : milliseconds)
    );
}

// Function to update the time display
function updateTime() {
    elapsedTime = new Date().getTime() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

// Function to start the timer
function startTimer() {
    if (!isRunning) {
        startTime = new Date().getTime() - elapsedTime;
        timerInterval = setInterval(updateTime, 10); // Update time every 10 milliseconds
        isRunning = true;
    }
}

// Function to pause the timer
function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    }
}

// Function to stop and reset the timer
function stopTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    timeDisplay.textContent = "00:00:00:00"; // Reset display
    lapContainer.innerHTML = ""; // Clear laps
}

// Function to record lap time
function recordLap() {
    if (isRunning) {
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap: ${formatTime(elapsedTime)}`;
        lapContainer.appendChild(lapTime);
    }
}

// Event listeners for buttons
document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', stopTimer);
document.getElementById('lap').addEventListener('click', recordLap);
