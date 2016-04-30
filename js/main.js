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
      $('.site-content').css({'margin-top': nav_height + 'px'});
      if ( $('#wpadminbar').length ) {
        var bar_height = $('#wpadminbar').height();
        $('.headroom').css({'top': bar_height + 'px'});
      }

      if(wW < setting.tablet) {
        $('.menu-all-pages-container').appendTo('body');
        $('.primary-menu').css({'padding-top': nav_height + 10 + 'px'});
      } else {
        $('.menu-all-pages-container').appendTo('#site-navigation');
        $('.primary-menu').css({'padding-top': 0 + 'px'});
      }
    }

    headstyle();
    $(window).on('resize', function(){
      headstyle();
    });

    // zoom.js
    $('.single-post .entry-content img').attr('data-action', 'zoom');

    var Drawer = (function() {

      if(!$('.menu-all-pages-container').length) {
        $('.js-toggle').remove();
        return;
      }

      var setting = {
        state: false,
        class: {
          toggle: 'js-toggle',
          menu: 'menu-all-pages-container',
          ovly: 'bg-ovly'
        }
      }

      var nowScroll;

      function _init() {
        var ovly = '<div class="'+ setting.class.ovly + " " + setting.class.toggle + '"></div>';
        $('body').append(ovly);
      }

      _init();

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
        $('.' + setting.class.ovly).addClass('bg-ovly-show');
        setting.state = true;
      }

      function _close() {
        $('.' + setting.class.menu).removeClass('open');
        $('.' + setting.class.toggle).removeClass('toggle-open');
        $('.' + setting.class.ovly).removeClass('bg-ovly-show');
        setting.state = false;
      }

      return {
        toggle: _toggle
      }
    })();

    Drawer.toggle();
  });

} )( jQuery );
