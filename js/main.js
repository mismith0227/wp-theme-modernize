( function( $ ) {
  $(function(){

    var setting = {
      tablet: 1024
    }

    var nav_height = $('.site-header').outerHeight(true);

    var myElement = document.querySelector(".site-header");
    var headroom  = new Headroom(myElement, {
      offset : nav_height
    });
    headroom.init();

    // headerstyle
    function headstyle() {
      var wW = $(window).width();
      if(wW < setting.tablet) {
        $('.menu-all-pages-container').appendTo('body');

        if($('.single-post').length || $('.page').length) {
          $('.site-content').css({'padding-top': 0 + 'px'});
        } else {
          $('.site-content').css({'padding-top': 40 + 'px'});
        }

      } else {
        $('.menu-all-pages-container').appendTo('#site-navigation');
        $('.site-content').css({'padding-top': nav_height + 'px'});
      }

    	if ( $('#wpadminbar').length ) {

    	}

    }

    headstyle();
    $(window).on('resize', function(){
      headstyle();
    });

    // zoom.js
    $('.single-post .entry-content img').attr('data-action', 'zoom');

    var Drawer = (function() {

      var setting = {
        state: false,
        class: {
          toggle: 'modernize-toggle',
          menu: 'menu-all-pages-container'
        }
      }

      var nowScroll;

      function _toggle() {
        $('.' + setting.class.toggle).on('click',function(){
          if (setting.state == true) {
            $('body').removeClass('bodyfixed').css({'top': 'inherit'});
            window.scrollTo( 0 , -nowScroll );
            _close();
          } else {
            nowScroll = $(window).scrollTop() * -1;
            $('body').addClass('bodyfixed').css({'top': nowScroll});
            _open();
          }
        });
      }

      function _open() {
        $('.' + setting.class.menu).addClass('open');
        $('.' + setting.class.toggle).addClass('toggle-open');
        setting.state = true;
      }

      function _close() {
        $('.' + setting.class.menu).removeClass('open');
        $('.' + setting.class.toggle).removeClass('toggle-open');
        setting.state = false;
      }

      return {
        toggle: _toggle // 公開する機能のみ返す
      }
    })();

    Drawer.toggle();
  });

} )( jQuery );
