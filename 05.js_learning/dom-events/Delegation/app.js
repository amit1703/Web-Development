
const tweetForm = document.querySelector('#tweetForm'); // selects the id 
const tweetsContainer = document.querySelector('#tweets'); // "..."
tweetForm.addEventListener('submit', function (e) {  // every time the form get submited , this func will run
    e.preventDefault();
    const usernameInput = tweetForm.elements.username;
    const tweetInput = tweetForm.elements.tweet;
    addTweet(usernameInput.value, tweetInput.value)
    usernameInput.value = '';
    tweetInput.value = '';
});

const addTweet = (username, tweet) => { // gets two vars , making new li and adding it to the ul 
    const newTweet = document.createElement('li');
    const bTag = document.createElement('b');
    bTag.append(username)
    newTweet.append(bTag);
    newTweet.append(`- ${tweet}`)
    tweetsContainer.append(newTweet);
}

tweetsContainer.addEventListener('click', function (e) { // every time the tweet container get clicked , this func will run 
    e.target.nodeName === 'LI' && e.target.remove();  // gets removed 
})

