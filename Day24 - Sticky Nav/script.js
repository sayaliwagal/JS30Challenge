const nav = document.querySelector('#main');
const tooOfNav = nav.offsetTop;
function fixNav() {
    // console.log(tooOfNav, window.scrollY);
    if(window.scrollY >= tooOfNav) {
        document.body.classList.add('fixed-nav');
        document.body.style.paddingTop = nav.offsetHeight + 'px';
    }else {
        document.body.classList.remove('fixed-nav');
        document.body.style.paddingTop = 0;

    }

}

window.addEventListener('scroll', fixNav);