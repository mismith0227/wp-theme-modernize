( function( $ ) {
  $(function(){

    var setting = {
      tablet: 1024
    }

    var nav_height;

    // headerstyle
    function headstyle() {
      var wW = $(window).width();
      var nav_height = $('.site-header').outerHeight(true);
      $('.site-content').css({'margin-top': nav_height + 'px'});
      if ( $('#wpadminbar').length ) {
        var bar_height = $('#wpadminbar').height();
        $('.headroom').css({'top': bar_height + 'px'});
      }

      if(wW < setting.tablet) {
        $('.main-navigation').appendTo('body');
        $('.primary-menu').css({'padding-top': nav_height + 10 + 'px'});
      } else {
        $('.main-navigation').appendTo('.site-header-inner');
        $('.primary-menu').css({'padding-top': 0 + 'px'});
      }
    }

    headstyle();
    $(window).on('resize', function(){
      headstyle();
    });

    var myElement = document.querySelector(".site-header");
    var headroom  = new Headroom(myElement, {
      offset : 100
    });
    headroom.init();

    var Drawer = (function() {

      var setting = {
        state: false,
        class: {
          toggle: 'js-toggle',
          menu: 'main-navigation',
          ovly: 'bg-ovly'
        }
      }

      var nowScroll;

      function _init() {
        var ovly = '<div class="'+ setting.class.ovly + " " + setting.class.toggle + '"></div>';
        $('body').append(ovly);

        if($('.main-navigation li').length) {
          $('.js-toggle').show();
        }
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
