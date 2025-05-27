const secondHand = document.querySelector('.sec-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate(){
    const now = new Date();
//    calculate the sec on the  current date 
    const sec = now.getSeconds();
    // convert the calculated seconds to degeree to rated the  sec hand of clock 
    const secDegress = ((sec /60 ) * 360) + 90;
    //    calculate the mintues on the  current date 
    const min = now.getMinutes();
        // convert the calculated mintues to degeree to rated the  mintues hand of clock
    const minDegress = ((min/60) * 360) + 90;
    //    calculate the hourse on the  current date 
       const hours = now.getHours();
    //    const hours12 = hours /12;
        // convert the calculated hours to degeree to rated the  hours hand of clock
       const hoursDegrees = ((hours/ 12) * 360) + 90;
   secondHand.style.transform = `rotate(${secDegress}deg)`;
   minHand.style.transform =`rotate(${minDegress}deg)`;
   hourHand.style.transform =`rotate(${hoursDegrees}deg)`;
   hourHand.style.transform = `rotate(${hoursDegrees}.deg);`
}
setInterval(setDate, 1000);