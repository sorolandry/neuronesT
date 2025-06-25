const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const timer = document.getElementById("timer");

let timeLeft = 1500;
let Interval;

const updateTimer = () => {
    const minutes = Math.floor(timeLeft /60);
    const seconds = timeLeft % 60;

    timer.innerHTML = `${minutes.toString().padStart(2,"0")} : ${seconds.toString().padStart(2,"0")}`;

};

const startTimer = () => {
    Interval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft === 0) {
            clearInterval(Interval);
            alert('Le temps de focus est terminé divertisez vous.');
            timeLeft = 1500;
            updateTimer();
        
        }
    }, 1000);
};

const stopTimer = () => {clearInterval(Interval)};

const resetTimer = () => {
    clearInterval(Interval);
    timeLeft = 1500;
    updateTimer();
}

start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);