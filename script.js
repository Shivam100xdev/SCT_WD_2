let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let running = false;
let lapCount = 1;

// Create floating particles
function createParticles() {
    const particles = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particles.appendChild(particle);
    }
}

function formatTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000));
    
    return {
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0'),
        milliseconds: milliseconds.toString().padStart(3, '0')
    };
}

function updateDisplay() {
    const time = formatTime(elapsedTime);
    document.getElementById('minutes').textContent = time.minutes;
    document.getElementById('seconds').textContent = time.seconds;
    document.getElementById('milliseconds').textContent = time.milliseconds;
}

function startTimer() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        running = true;
        document.getElementById('stopwatch').classList.add('running');

        const startBtn = document.getElementById('startBtn');
        startBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            startBtn.style.transform = '';
        }, 150);
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(timerInterval);
        running = false;
        document.getElementById('stopwatch').classList.remove('running');

        const pauseBtn = document.getElementById('pauseBtn');
        pauseBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            pauseBtn.style.transform = '';
        }, 150);
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    running = false;
    elapsedTime = 0;
    lapCount = 1;
    updateDisplay();
    document.getElementById('laps').innerHTML = '';
    document.getElementById('stopwatch').classList.remove('running');

    const container = document.getElementById('stopwatch');
    container.style.transform = 'scale(0.95)';
    setTimeout(() => {
        container.style.transform = '';
    }, 150);
}

function recordLap() {
    if (running && elapsedTime > 0) {
        const time = formatTime(elapsedTime);
        const lapTime = `${time.minutes}:${time.seconds}.${time.milliseconds}`;

        const lapItem = document.createElement('div');
        lapItem.className = 'lap-item';
        lapItem.innerHTML = `
            <span>Lap ${lapCount}</span>
            <span>${lapTime}</span>
        `;

        document.getElementById('laps').insertBefore(lapItem, document.getElementById('laps').firstChild);
        lapCount++;

        const lapBtn = document.getElementById('lapBtn');
        lapBtn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            lapBtn.style.transform = '';
        }, 200);
    }
}

// Initialize
updateDisplay();
createParticles();

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case ' ':
            e.preventDefault();
            running ? pauseTimer() : startTimer();
            break;
        case 'r':
            resetTimer();
            break;
        case 'l':
            recordLap();
            break;
    }
});
