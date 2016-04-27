( function( $ ) {
  $(function(){

    var setting = {
      tablet: 1024
    }

    var navdis = $('#site-navigation').offset().top;
    var nav_height = $('#site-navigation').outerHeight;

    var myElement = document.querySelector(".site-header");
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
        $('#content').css({'margin-top': nav_height + 40 + 'px'});
      } else {
        $('#content').css({'margin-top': 40 + 'px'});
      }
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
