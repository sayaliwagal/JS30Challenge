const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
 isDown = true;
 slider.classList.add('active');
 startX = e.pageX - slider.offsetLeft;
 scrollLeft = slider.scrollLeft;
 console.log(e.pageX);
});
slider.addEventListener('mouswleave', () => {
    isDown = false;
    slider.classList.remove('active');
    
});
slider.addEventListener('mouseup', () => {
    isDown = false;

});
slider.addEventListener('mousemove', (e) => {
    if(!isDown) return; //Stop the fn frm running
    // console.log(isDown);
    // console.log('Do it!')
    // console.log(startX);
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 4;
    slider.scrollLeft = scrollLeft - walk;
});