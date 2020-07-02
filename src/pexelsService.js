export class PexelsService {
  async getPicture(houseName) {
    let searchTerm;
    switch (houseName) {
      case ("Hufflepuff"):
        searchTerm = "weasel";
        break;
      case ("Gryffindor"):
        searchTerm = "lion";
        break;
      case ("Ravenclaw"):
        searchTerm = "eagle";
        break;
      case ("Slytherin"):
        searchTerm = "snake";
        break;
    }

    return fetch(`https://api.pexels.com/v1/search?query=${searchTerm}`, {method: 'GET', headers: {'Authorization': `${process.env.PEXELS_API_KEY}`}})
      .then(function(response) {
        if(!response.ok) {
          throw Error(response.statusText);
        }
        return response.json(); 
      })
      .catch(function(error) {
        console.error(`${error.message}`)
        return error;
      })
      .then(function(jsonifiedResponse){
        return jsonifiedResponse;
      });
  }
}