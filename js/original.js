( function( $ ) {
  $(function(){

    var setting = {
      tablet: 1024
    }

    var head_dist = $('#primary-menu').offset().top;
    var nav_height = $('#primary-menu').outerHeight() + 2;
    var hdtar = head_dist + nav_height + 50;

    // headroom
    var myElement = document.querySelector(".main-navigation");
    var headroom  = new Headroom(myElement, {
      offset : hdtar
    });
    headroom.init();

    // headerstyle
    function headstyle() {
      var wW = $(window).width();
      if(wW < setting.tablet) {
        $('.headroom').css({'top': 'inherit'});
      } else {
        $('.headroom').css({'top': -nav_height});
      }


    	if ( $('#wpadminbar').length ) {
    		console.log('test');
    	}
    }
    headstyle();
    $(window).on('resize', function(){
      headstyle();
    });

    $(window).on('scroll', function(){
      var scrval = $(window).scrollTop();
      if(scrval > hdtar) {
        $('.headroom').addClass('headfixed');
        $('#content').css({'margin-top': nav_height});
      } else {
        $('.headroom').removeClass('headfixed');
        $('#content').css({'margin-top': 0});
      }
    });

    // zoom.js
    $('#main img').attr('data-action', 'zoom');
  });

} )( jQuery );
