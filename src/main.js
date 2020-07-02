import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { PotterService } from './potterService.js';

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
    $('.userHouse').text(`Your house is ${house}!`);
    $('.userHouse').append(` Your mascot is a ${responseHouse.mascot}, the colors of your house are ${responseHouse.colors[0]} and ${responseHouse.colors[1]}  and your house values are ${responseHouse.values[0]}, ${ responseHouse.values[1]}, 
    ${ responseHouse.values[2]}, and ${ responseHouse.values[3]}.`);
  } else {
    $('userHouse').text("");
    $('.showErrors').text(`There was an error: ${response.message}`);
  }
}

$(document).ready(function () {
  $('#userHouse').click(function() {
    (async () => {
      let potterService = new PotterService();
      const response = await potterService.getHouseAndHouseInfo();
      getHouseTraits(response[0], response[1]);
    })();
  });
  
  $('#cast').click(function() {
    const spell = $('#spell').val();
    $('#spell').val("");
  
    (async () => {
      let potterService = new PotterService();
      const response = await potterService.getNewSpell();
      getSpells(response, spell);
    })();
  });
});
