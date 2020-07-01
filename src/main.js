import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function getSpells(response, spell) {
  if (response.find(element => element.spell === spell)) {
    let responseSpell = response.find(element => element.spell === spell);
    $('.castSpell').text(`You have cast ${spell}, which ${responseSpell.effect}`);
  } else {
    $('castSpell').text("");
    $('.showErrors').text(`There was an error: ${response.message}`);
  }
  
}
function getHouseTraits(response, house) {
  if (response.find(element => element.name === house)) {
  
    let responseHouse = response.find(element => element.name === house);
    
    for (const [key, value] of Object.entries(responseHouse)) {
      $('.userHouse').append(`${key}: ${value}`);
    }
  }
  else {
    $('userHouse').text("");
    $('.showErrors').text(`There was an error: ${response.message}`);
  }
  
}
$(document).ready(function () {
  let house;
  $('#userHouse').click(function() {
    
      fetch(`https://www.potterapi.com/v1/sortingHat`)
      .then(function(response) {
        return response.json()
      })
      .then(function(jsonifiedResponse) {
        house = jsonifiedResponse;
        $('.userHouse').text(`${jsonifiedResponse}`);
        return fetch(`https://www.potterapi.com/v1/houses?key=${process.env.API_KEY}`)
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(jsonifiedResponse) {
        getHouseTraits(jsonifiedResponse, house)
      })
      .catch(function(error){
        return error;
      });
  });
  
  $('#cast').click(function() {
    const spell = $('#spell').val();
    $('#spell').val("");
    fetch(`https://www.potterapi.com/v1/spells?key=${process.env.API_KEY}`)
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
      getSpells(jsonifiedResponse, spell);
    });
  });
});
