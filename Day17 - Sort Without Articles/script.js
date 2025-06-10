const bands = [
    "Believe in yourself and all that you are.",
    "You are capable of an amazing future.",
    "Embrace the journey, not just the destination.",
    "Every day is a new opportunity.",
    "The only way to do great work is to love what you do.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "In the middle of every difficulty lies an opportunity.",
    "The expert in anything was once a beginner.",
    "Your attitude, not your aptitude, will determine your altitude.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "It's an amazing day to make a difference.",
    "Be the change that you wish to see in the world.",
    "The journey of a thousand miles begins with a single step.",
    "You have the power to create your own destiny.",
    "An unexamined life is not worth living.",
    "The best way to predict the future is to create it.",
    "Don't be afraid to give up the good to go for the great.",
    "It is a hard road, but a rewarding one.",
    "The greater the challenge, the greater the opportunity for growth.",
    "An optimistic outlook can change everything.",
    "The secret of getting ahead is getting started.",
    "Always remember, you are a valuable person.",
    "A positive mindset attracts positive outcomes.",
    "The only limit to our realization of tomorrow will be our doubts of today.",
    "Take a leap of faith."
]
//function to replace the a,an, the using regax. 
function strip(bandName){
    return bandName.replace(/^(a |the |an )/i, '').trim();
}
//sortedBands its an arrow function to sort the arrays.
const sortedBands = bands.sort((a, b) => (strip(a) > strip(b) ? 1:-1));

document.querySelector('#bands').innerHTML = sortedBands.map(band => `<li>${band}`).join('');