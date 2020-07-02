export class PotterService {
  async getHouseAndHouseInfo() {
    let house;
    return fetch(`https://www.potterapi.com/v1/sortingHat`)
      .then(function(response) {
        return response.json();
      })
      .then(function(jsonifiedResponse) {
        house = jsonifiedResponse;
        return fetch(`https://www.potterapi.com/v1/houses?key=${process.env.API_KEY}`);
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(jsonifiedResponse) {
        return [jsonifiedResponse, house];
      })
      .catch(function(error){
        return error;
      });
  }

  async getNewSpell() {
    return fetch(`https://www.potterapi.com/v1/spells?key=${process.env.API_KEY}`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error) {
        return error;
      })
      .then(function(jsonifiedResponse){
        return jsonifiedResponse;
      });   
  }
}


/* return fetch('https://api.pexels.com/v1/search?query=weasel', {
  method: 'GET',
  headers: {
    'Authorization': 'key'
  },
}) */