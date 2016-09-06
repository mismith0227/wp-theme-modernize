
require('./skip-link-focus-fix.js')
require('./drawer.js')

const Headroom = require('headroom.js')

$(() => {

  var setting = {
    tablet: 1024
  }

  var nav_height;

  // headerstyle
  var headstyle = () => {
    var wW = $(window).width();
    var nav_height = $('.header').outerHeight(true);
    $('.site-content').css({'margin-top': nav_height + 'px'});
    if ( $('#wpadminbar').length ) {
      var bar_height = $('#wpadminbar').height();
      $('.headroom').css({'top': bar_height + 'px'});
    }

    if(wW < setting.tablet) {
      $('.gnav').appendTo('body');
      $('.primary-menu').css({'padding-top': nav_height + 10 + 'px'});
    } else {
      $('.gnav').appendTo('.header__inner');
      $('.primary-menu').css({'padding-top': 0 + 'px'});
    }
  }

  headstyle();
  $(window).on('resize', () => {
    headstyle();
  });

  var myElement = document.querySelector(".header");
  var headroom  = new Headroom(myElement, {
    offset : 100
  });
  headroom.init();

});
