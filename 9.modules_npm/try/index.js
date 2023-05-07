const colors = require("colors")
const cowsay = require("cowsay")
const figlet = require("figlet")


const args = process.argv.slice(2);

for (let arg of args)
{
console.log(figlet.textSync(`hello there, ${arg}`))
console.log(figlet.textSync(cowsay.say({ text: 'tahel'.rainbow })));

}