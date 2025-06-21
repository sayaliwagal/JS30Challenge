const div = document.querySelectorAll('div');
const btn = document.querySelector('button');

function logText(e) {
    console.log(this.classList.value)
    e.stopPropagation();
    //it will stop bubbling
}
// bubble up ; when you click the innerwhen it will trger form the top to bottom 
div.forEach(div => div.addEventListener('click', logText, {
    capture: true})); // when we have capture: true it will go form bottom to top rather then top to bottom and defualt it is false. 

    btn.addEventListener('click', () => {
        console.log('Click!!!')
    }, {
        once: true
    });