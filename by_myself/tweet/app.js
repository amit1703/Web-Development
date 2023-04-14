const { default: axios } = require("axios");

const form = document.querySelector('#formid');
const btn = document.querySelector('button');
const input = document.querySelector('#tweet');
const ul = document.querySelector('#ulid')
form.addEventListener('submit', function(e){

e.preventDefault();
let tweet = input.value;
const li = document.createElement('LI');
li.innerText = tweet;   
ul.append(li);
input.value = pic();

});


const pic = async() =>{
    
    const jokes = await axios.get("https://icanhazdadjoke.com/")
    return jokes.data.joke


}