( function( $ ) {
  $(function(){
      $('.page_item_has_children').on('click', function(e){
        e.preventDefault();
        console.log('test');
        $(this).find('.children').css({'display': 'block'});
      });

      $('#main img').attr('data-action', 'zoom');

  });

} )( jQuery );

var myElement = document.querySelector(".main-navigation");
// construct an instance of Headroom, passing the element
var headroom  = new Headroom(myElement, {
  offset : 200
});
// initialise
headroom.init();
