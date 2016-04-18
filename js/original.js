( function( $ ) {
  $(function(){

    function headstyle() {
    	if ( $('#wpadminbar').length ) {
    		console.log('test');
    	}
    }
    headstyle();

    var head_dist = $('#primary-menu').offset().top;
    var nav_height = $('#primary-menu').height();
    var hdtar = head_dist + nav_height + 50;

    var myElement = document.querySelector(".main-navigation");
    var headroom  = new Headroom(myElement, {
      offset : head_dist
    });
    headroom.init();

    $(window).on('scroll', function(){
      var scrval = $(window).scrollTop();
      if(scrval > head_dist) {
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
