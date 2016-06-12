( function( $ ) {
  $(function(){

    var setting = {
      tablet: 1024
    }

    var nav_height;

    // headerstyle
    function headstyle() {
      var wW = $(window).width();
      var nav_height = $('.header').outerHeight(true);
      $('.site-content').css({'margin-top': nav_height + 'px'});
      if ( $('#wpadminbar').length ) {
        var bar_height = $('#wpadminbar').height();
        $('.headroom').css({'top': bar_height + 'px'});
      }

      if(wW < setting.tablet) {
        $('.main-nav').appendTo('body');
        $('.primary-menu').css({'padding-top': nav_height + 10 + 'px'});
      } else {
        $('.main-nav').appendTo('.header__inner');
        $('.primary-menu').css({'padding-top': 0 + 'px'});
      }
    }

    headstyle();
    $(window).on('resize', function(){
      headstyle();
    });

    var myElement = document.querySelector(".header");
    var headroom  = new Headroom(myElement, {
      offset : 100
    });
    headroom.init();

    var Drawer = (function() {

      var setting = {
        state: false,
        class: {
          toggle: 'js-toggle',
          menu: 'main-nav',
          ovly: 'bg-ovly',
          open: 'open',
          toggleopen: 'toggle-btn_open',
          bgshow: 'bg-ovly-show'
        }
      }

      var nowScroll;

      function _init() {
        var ovly = '<div class="'+ setting.class.ovly + " " + setting.class.toggle + '"></div>';
        $('body').append(ovly);

        if($('.main-nav li').length) {
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
        $('.' + setting.class.menu).addClass(setting.class.open);
        $('.' + setting.class.toggle).addClass(setting.class.toggleopen);
        $('.' + setting.class.ovly).addClass(setting.class.bgshow);
        setting.state = true;
      }

      function _close() {
        $('.' + setting.class.menu).removeClass(setting.class.open);
        $('.' + setting.class.toggle).removeClass(setting.class.toggleopen);
        $('.' + setting.class.ovly).removeClass(setting.class.bgshow);
        setting.state = false;
      }

      return {
        toggle: _toggle
      }
    })();

    Drawer.toggle();
  });

} )( jQuery );
