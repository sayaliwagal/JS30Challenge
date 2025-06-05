
pressed = [];
const secretcode = "sau"

window.addEventListener('keyup', (e) => {
    console.log(e.key);
    pressed.push(e.key);
    pressed.splice(-secretcode.length -1, pressed.length - secretcode.length);
    if(pressed.join('').includes(secretcode)){
        console.log('Ding Ding')
        cornify_add();
    }
    console.log(pressed);
})