const form = document.querySelector('#searchForm');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const searchTerm = form.elements.query.value; //the input value (what the name of the movie)
    const config = { params: { q: searchTerm } }
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config); // what api we sending req
    makeImages(res.data)
    form.elements.query.value = ''; // reseting the input text
})

const makeImages = (shows) => {
//shows is a json content , that includs all the movies that the input word includs from the api
    for (let result of shows) {
//it goes every item in the json and taking the pic of the item and making it img elemnt 
        if (result.show.image) {
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            document.body.append(img)
        }
    }
}
