// script.js

let timer;
let isRunning = false;
let elapsedTime = 0;
let laps = [];

const display = document.getElementById('display');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

startPauseButton.addEventListener('click', function() {
    if (isRunning) {
        clearInterval(timer);
        startPauseButton.textContent = 'Start';
    } else {
        timer = setInterval(updateTime, 1000);
        startPauseButton.textContent = 'Pause';
    }
    isRunning = !isRunning;
});

resetButton.addEventListener('click', function() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    laps = [];
    displayTime(0);
    startPauseButton.textContent = 'Start';
    lapsList.innerHTML = '';
});

lapButton.addEventListener('click', function() {
    if (isRunning) {
        laps.push(elapsedTime);
        displayLaps();
    }
});

function updateTime() {
    elapsedTime++;
    displayTime(elapsedTime);
}

function displayTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    display.textContent = 
        `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function displayLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${index + 1}: ${formatTime(lap)}`;
        lapsList.appendChild(lapElement);
    });
}

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}