const soundDisplay = document.getElementById('sound-display')
function playSound(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = this.document.querySelector(`.key[data-key="${e.keyCode}"]`);
    // console.log(key);
    if(!audio)
        return; //  stop function from running all 
    
    const soudNameEle = key.querySelector('.sound');
    const soundName = soudNameEle ? soudNameEle.textContent : '';

    soundDisplay.textContent = soundName;
    soundDisplay.classList.add('show');
    setTimeout(() => {
        soundDisplay.classList.remove('show');
    }, 2000)
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
    
    }
function removeTransition(e) {
   if(e.propertyName  !== 'transform')
    retrun // skip it if it's not a transform
    this.classList.remove('playing')
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);
