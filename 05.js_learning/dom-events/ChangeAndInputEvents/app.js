const input = document.querySelector('input'); // selecting all inputs
const h1 = document.querySelector('h1'); // selecting all h1's

// input.addEventListener('change', function (e) {
//     console.log("CASKDJASKJHD")
// })

input.addEventListener('input', function (e) { // every time it gets input this func will work
    h1.innerText = input.value; // when the func will work the h1 text will change to the input 
})