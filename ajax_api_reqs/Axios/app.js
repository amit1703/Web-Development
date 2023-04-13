// axios
//   .get("https://swapi.dev/api/people/1/")
//   .then((res) => {
//     console.log("RESPONSE: ", res);
//   })
//   .catch((e) => {
//     console.log("ERROR! ", e);
//   });

const h1s = document.querySelector('h1');
const getStarWarsPerson = async (id) => {
  try{
    const res = await axios.get(`https://swapi.dev/api/people/${id}/`);
    h1s.innerHTML = res.data.name;
  }catch(e){
      h1s.innerHTML = e;
  }
};

getStarWarsPerson(5)
getStarWarsPerson(10);
