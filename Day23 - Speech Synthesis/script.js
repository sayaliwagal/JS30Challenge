const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
msg.text = document.querySelector('[name="text"]').value;
//function to get the voice from the browser and show on the seleted dropdown on the web site.
function populateVoices() {
    voices = this.getVoices();
     voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}>${voice.name}(${voice.lang})</option>`)
    .join('');
    // console.log(voices);
}
// function to set the voice from the seletedropdown for speaking
function setVoice(){
    msg.voice = voices.find(voice => voice.name === this.value);

}

// toogle function for the controlling the speak
function toogle(startOver = true) {
    speechSynthesis.cancel();
    if(startOver)
    speechSynthesis.speak(msg);
}

// for the options setting values on the msg elemement to change it accordingly 
function setOption() {
    console.log(this.name, this.value);
    msg[this.name] = this.value;
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toogle);
stopButton.addEventListener('click', ()=> toogle(false));
