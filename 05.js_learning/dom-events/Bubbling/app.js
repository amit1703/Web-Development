const button = document.querySelector('#changeColor');  // select a specific id 
const container = document.querySelector('#container'); // " ... " 

button.addEventListener('click', function (e) {  // changing backgorund color 
    container.style.backgroundColor = makeRandColor();
    e.stopPropagation();
})
container.addEventListener('click', function () {
    container.classList.toggle('hide');
})

const makeRandColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}