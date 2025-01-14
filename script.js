let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

const timer = document.getElementById('timer');
const lapsList = document.getElementById('laps');

const formatTime = (time) => {
    const ms = Math.floor((time % 1000));
    const s = Math.floor((time / 1000) % 60);
    const m = Math.floor((time / 60000) % 60);
    const h = Math.floor(time / 3600000);

    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
};

const updateTimer = () => {
    const now = Date.now();
    elapsedTime = now - startTime;
    timer.textContent = formatTime(elapsedTime);
};

document.getElementById('start').addEventListener('click', () => {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTimer, 10);
        isRunning = true;
    }
});

document.getElementById('pause').addEventListener('click', () => {
    if (isRunning) {
        clearInterval(intervalId);
        isRunning = false;
    }
});

document.getElementById('reset').addEventListener('click', () => {
    clearInterval(intervalId);
    isRunning = false;
    elapsedTime = 0;
    timer.textContent = "00:00:00.000";
    lapsList.innerHTML = "";
});

document.getElementById('lap').addEventListener('click', () => {
    if (isRunning) {
        const lapItem = document.createElement('li');
        lapItem.textContent = formatTime(elapsedTime);
        lapsList.appendChild(lapItem);
    }
});
