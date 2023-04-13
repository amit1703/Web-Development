// async function hello() {
// }


const sing = async () => {
    throw "OH NO, PROBLEM!" //reject
    return 'LA LA LA LA' // resolve
}

sing()
    .then(data => { // if resolved , do this
        console.log("PROMISE RESOLVED WITH:", data)
    })
    .catch(err => { // if rejected, do this
        console.log("OH NO, PROMISE REJECTED!")
        console.log(err)
    })




const login = async (username, password) => { // func get two vars and checking them
    if (!username || !password) throw 'Missing Credentials' // if there are no user name and pass , throw rejected , missing creds
    if (password === 'corgifeetarecute') return 'WELCOME!' // if pas correct , return resolved , welcome!
    throw 'Invalid Password'
}

login('todd', 'corgifeetarecute')
    .then(msg => { // if resolve do this
        console.log("LOGGED IN!")
        console.log(msg) // this is the msg after the return (WELCOME!)
    })
    .catch(err => { // if rejected , do this 
        console.log("ERROR!")
        console.log(err) // this is the msg after the throw (Missing creds)
    })






const delayedColorChange = (color, delay) => { // func gets two var, 
    //delay abd color and then changes the screen color
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = color; //changing the screen color
            resolve();
        }, delay)
    })
}

// delayedColorChange('red', 1000)
//     .then(() => delayedColorChange('orange', 1000))
//     .then(() => delayedColorChange('yellow', 1000))
//     .then(() => delayedColorChange('green', 1000))
//     .then(() => delayedColorChange('blue', 1000))
//     .then(() => delayedColorChange('indigo', 1000))
//     .then(() => delayedColorChange('violet', 1000))


async function rainbow() { // code lines will run only after the prev 
    //line finished because of await
    await delayedColorChange('red', 1000) //callibg delayedColorChange and then
    // only nxt line will run
    await delayedColorChange('orange', 1000)
    await delayedColorChange('yellow', 1000)
    await delayedColorChange('green', 1000)
    await delayedColorChange('blue', 1000)
    await delayedColorChange('indigo', 1000)
    await delayedColorChange('violet', 1000)
    return "ALL DONE!"
}

// rainbow().then(() => console.log("END OF RAINBOW!"))


async function printRainbow() {
    await rainbow(); // after the whole func ends, print this , because await key
    console.log("END OF RAINBOW!")
}

printRainbow();

const fakeRequest = (url) => { // generate a number for delay time,
    // if the number is above 2000 , throw reject , else return resolve
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * (4500)) + 500; 
        setTimeout(() => {
            if (delay > 2000) {
                reject('Connection Timeout :(') // reject msg
            } else {
                resolve(`Here is your fake data from ${url}`) // resolve msg 
            }
        }, delay)
    })
}


async function makeTwoRequests() {
    try { // for if we get rejected , the code will crash so we need to use try and catch
        let data1 = await fakeRequest('/page1'); // because of await data1 will match
        // the resolve and only after that it will print the info 
        console.log(data1); // data1 is the resolve msg (Here is your fake data from  url )
        let data2 = await fakeRequest('/page2');
        console.log(data2);
    } catch (e) {
        console.log("CAUGHT AN ERROR!")
        console.log("error is:", e) // e is the throw rejection error(Connection Timeout :()
    }

}
