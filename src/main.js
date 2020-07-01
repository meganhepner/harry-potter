import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function () {
  $('#cast').click(function() {
      const spell = $('#spell').val();
      $('#spell').val("");
  });
  
  });
