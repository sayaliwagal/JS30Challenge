const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 80;

let isDraw = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;



function draw(e){
    if(!isDraw) return;
    // console.log(e);
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
    hue++;
    if(hue >= 360){
        hue = 0;
    }
    if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1){
        direction = !direction;
    }
    direction? ctx.lineWidth++ : ctx.lineWidth--;
}


canvas.addEventListener('mousedown', (e) => {
    isDraw = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});


canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDraw = false);
canvas.addEventListener('mouseout', () => isDraw = false);

