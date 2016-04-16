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
