const checkbox = document.querySelectorAll('.inbox input[type ="checkbox"]');
console.log(checkbox);
let lastChecked;
function handleCheck(e) {
    // check if they had the shift key down 
    //And check that they are checking it 
    let inBetween = false;
    if(e.shiftKey && this.checked) {
   //go ahead and do what we please
   //loop over evret aingle checkbox
   checkbox.forEach(checkbox => {
    console.log(checkbox);
    if(checkbox === this || checkbox === lastChecked){
        inBetween = !inBetween;
        console.log('Staring to checked inBetween!');
    }
    if(inBetween){
        checkbox.checked = true;
    }
   });

    }
   lastChecked = this;
}
checkbox.forEach(checkbox => checkbox.addEventListener('click', handleCheck));
