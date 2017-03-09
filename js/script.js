var ipcRenderer = require('electron').ipcRenderer;

$(document).ready(function() {
  $.get( "http://9gag.com/random", function( data ) {

    var html = $($(data).find('.badge-animated-container-animated')).html();
    var link = $($(data).find('.badge-item-img')).attr('src');

    if (html) {
      $('body').html(html);

      /* Reset the element css */
      $('video').css("min-width", "0px");
      $('video').css("min-height", "0px");
      $('video').css("width", "100%");
      $('video').css("height", "auto");
    }
    else
      $('body').html('<img src="' + link + '"/>');

    var title = $($(data).find('.badge-item-title')).html();
    $('body').prepend('<h1>' + title + '</h1>');

    /* Resize the electron window according to the img size + title */
    var img = new Image();
    img.onload = function() {
      var nh = Math.round(this.height * 250 / this.width);
      nh += parseInt($('h1').css("height").replace("px", ""));
      nh += parseInt($('h1').css("margin-bottom").replace("px", "")) * 1.5;
      console.log($('h1').css("margin-bottom").replace("px", ""));

      console.log(this.width,this.height);
      ipcRenderer.send('asynchronous-message', {
        width: 250,
        height: nh
      });
    }
    img.src = link;
  });
});