import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function getElements(response, spell) {
  if (response.find(element => element.spell === spell)) {
    let responseSpell = response.find(element => element.spell === spell);
    $('.castSpell').text(`You have cast ${spell}, which ${responseSpell.effect}`)
  } else {
    $('castSpell').text("");
    $('.showErrors').text(`There was an error: ${response.message}`)
  }
  
}

$(document).ready(function () {
  $('#userHouse').click(function() {
    fetch(`https://www.potterapi.com/v1/sortingHat`)
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
      $('.userHouse').text(`${jsonifiedResponse}`);
    });

  })
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
        getElements(jsonifiedResponse, spell);
      });
  });
});
