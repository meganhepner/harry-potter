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
    
/*     for (const [key, value] of Object.entries(responseHouse)) {
      $('.userHouse').append(`${key}: ${value}`);
    } */
    let trait = $('.userHouse');
    trait.append(` Your mascot is a ${responseHouse.mascot}, the colors of your house are ${responseHouse.colors[0]} and ${responseHouse.colors[1]}  and your house values are ${responseHouse.values[0]}, ${ responseHouse.values[1]}, 
    ${ responseHouse.values[2]}, and ${ responseHouse.values[3]}.`);

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
        $('.userHouse').text(`Your house is ${jsonifiedResponse}!`);
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
