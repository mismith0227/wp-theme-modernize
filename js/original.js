( function( $ ) {
  $(function(){


    var setting = {
      tablet: 1024
    }

    // headerstyle
    function headstyle() {
      var wW = $(window).width();
      var myElement = document.querySelector(".main-navigation");
      var headroom  = new Headroom(myElement, {
        offset : 300
      });

      if(wW < setting.tablet) {
        headroom.destroy();
        $('.main-navigation').css({'top': 100 + '%'});
      } else {
        headroom.init();
        $('.main-navigation').css({'top': 0});
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
