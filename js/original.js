( function( $ ) {
  $(function(){

    var setting = {
      tablet: 1024
    }

    var myElement = document.querySelector(".main-navigation");
    var headroom  = new Headroom(myElement, {
      offset : 300
    });
    headroom.init();

    // headerstyle
    function headstyle() {
      var wW = $(window).width();

      if(wW < setting.tablet) {
        $('.menu-all-pages-container').appendTo('body');
      } else {
        $('.menu-all-pages-container').appendTo('#site-navigation');
      }



    	if ( $('#wpadminbar').length ) {

    	}

    }

    headstyle();
    $(window).on('resize', function(){
      headstyle();
    });

    $(window).on('scroll', function(){
      var scrval = $(window).scrollTop();
      var nav_height = $('#site-navigation').outerHeight();
      if(scrval > 300) {
        $('#content').css({'margin-top': nav_height});
      } else {
        $('#content').css({'margin-top': 0});
      }
    });

    // zoom.js
    $('#main img').attr('data-action', 'zoom');
  });

} )( jQuery );
