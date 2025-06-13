const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio:false})
    .then(localMediaStream => {
        console.log(localMediaStream);
        video.srcObject= localMediaStream;
        video.play();
    })
    .catch(e => {
        console.error("Oh you have not allowed the webcam, please allow it ", e);
    });
}
// for the button effect to toggle 
let activeEffects = {
    red: false,
    rgb: false
};
// toggle function for red effect 
function toggleRedEffect() {
    activeEffects.red = !activeEffects.red;
}
// toggle function for rgb split  effect 
function toggleRGBSplit() {
    activeEffects.rgb = !activeEffects.rgb;
}
function clearEffect() {
    activeEffects.red = false;
    activeEffects.rgb = false;
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    
    if(this.intervalId) {
        clearInterval(this.intervalId);
    }
   
    this.intervalId = setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    // Take the pixels out
    let pixels = ctx.getImageData(0,0,width,height);
    // // mess with them
    if(activeEffects.red){
        pixels =  redEffect(pixels);
    }
        if(activeEffects.rgb){
        pixels = rgbSplit(pixels) ;
        // ctx.globalAlpha= 0.1;
    }
 
    pixels =greenScreen(pixels)
    // put them back 
    ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function takePhoto() {
    //play the sound on the button click 
    snap.currentTime = 0;
    snap.play();

    //take a photo on button click 
    const data = canvas.toDataURL('image/jpeg');
    let link = document.createElement(`a`);
    link.href = data;
    link.setAttribute('download', 'beuty');
    link.innerHTML= `<img src="${data}" alt="beuty" /> `
    strip.insertBefore(link, strip.firstChild);
    console.log(data);
}

function redEffect(pixels) {
    for(let i = 0; i < pixels.data.length; i+=4){
        pixels.data[i + 0] = pixels.data[i + 0] + 100; //red
        pixels.data[i + 1] = pixels.data[i + 1] - 50; //green
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //blue
    }
    return pixels;
}
function rgbSplit(pixels) {
    for(let i = 0; i < pixels.data.length; i+=4){
        pixels.data[i - 150] = pixels.data[i + 0] ; //red
        pixels.data[i + 500] = pixels.data[i + 1] ; //green
        pixels.data[i - 550] = pixels.data[i + 2] ; //blue
    }
    return pixels;
}



function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });


  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);