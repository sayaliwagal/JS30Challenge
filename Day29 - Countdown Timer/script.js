let countdown;
const timerDisplay = document.querySelector('.display_time-left');
const endTime = document.querySelector('.display_end-time');
const btn = document.querySelectorAll('[data-timer]');


function timer(seconds) {
    //clear any existing timers
    clearInterval(countdown)
   const now = Date.now();
   const then = now + seconds * 1000;
   displayTimeLeft(seconds);
   disEndTime(then);
   countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    //Check if we can stop it!
    if(secondsLeft < 0) {
        clearInterval(countdown);
        return;
    }
        displayTimeLeft(secondsLeft);
   }, 1000);
}
function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds /60);
    const remainderSeconds = seconds % 60; 
    const display = `${minutes}:${remainderSeconds< 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
}

function disEndTime(timestamp){
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Bakc at ${hour}:${minutes< 10 ? '0': ''}${minutes}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.timer);
    timer(seconds);

}

btn.forEach(btn => btn.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins)
    timer(mins * 60);
    this.reset();

});