/* Get our Elemets */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress_filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player_slider')
const fullScreen = player.querySelector('.fullscreen')

/* Build out functions */
function togglePlay() {
   const method = video.paused ? 'play' : 'pause';
   video[method]();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
    // console.log('Update button', icon);
}

function skip() {
video.currentTime += parseFloat(this.dataset.skip);

}

function handleRangeUpdate() {
    console.log(this.value);
    video[this.name] = this.value;
}
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(e);

}

function openFullscreen() {
    if(video.requestFullscreen)
        video.requestFullscreen();
    else if(video.webkitRequestFullscreen)
        video.webkitRequestFullscreen();
    else if(video.msRequestFullscreen)
        video.msRequestFullscreen();
}


/* hook up the event listners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(btn => btn.addEventListener('click',skip));
ranges.forEach(range => range.addEventListener('click', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
fullScreen.addEventListener('click', openFullscreen);
