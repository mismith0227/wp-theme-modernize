require('iscroll')
require('./skip-link-focus-fix.js')

const Headroom = require('headroom.js')

$(() => {
  var setting = {
    tablet: 1024
  }

  // headerstyle
  var headstyle = () => {
    var wW = $(window).width()
    var nav_height = $('.header').outerHeight(true)
    $('.site-content').css({'margin-top': nav_height + 'px'})
    if ($('#wpadminbar').length) {
      var bar_height = $('#wpadminbar').height()
      $('.headroom').css({'top': bar_height + 'px'})
    }

    if (wW < setting.tablet) {
      $('.gnav').appendTo('body')
      $('.primary-menu').css({'padding-top': nav_height + 10 + 'px'})
    } else {
      $('.gnav').appendTo('.header__inner')
      $('.primary-menu').css({'padding-top': 0 + 'px'})
    }
  }

  headstyle()
  $(window).on('resize', () => {
    headstyle()
  })

  var myElement = document.querySelector('.header')
  var headroom = new Headroom(myElement, {
    offset: 100
  })
  headroom.init()

  var myScroll = new IScroll('#site-navigation', {
    mouseWheel: true,
    preventDefault: false
  })
  myScroll.disable()

  var Drawer = (() => {
    var myScroll = new IScroll('#site-navigation', {
      mouseWheel: true,
      preventDefault: false
    })

    var setting = {
      class: {
        toggle: 'js-toggle',
        menu: 'gnav',
        ovly: 'bg-ovly',
        open: 'open',
        toggleopen: 'toggle-btn_open',
        bgshow: 'bg-ovly-show',
        fixed: 'bodyfixed'
      }
    }

    function _init () {
      var ovly = '<div class="' + setting.class.ovly + ' ' + setting.class.toggle + '"></div>'
      $('body').append(ovly)

      if ($('.' + setting.class.menu).find('li').length) {
        $('.' + setting.class.toggle).show()
      }
    }

    _init()

    function _toggle () {
      $('.' + setting.class.toggle).on('click', () => {
        if ($('.' + setting.class.menu).attr('aria-expanded') == 'true') {
          $('body').removeClass(setting.class.fixed)
          _close()
        } else {
          $('body').addClass(setting.class.fixed)
          _open()
        }
      })
    }

    function _no_scroll () {
      $(document).on('touchmove.noScroll', (e) => {
        e.preventDefault()
      })
    }

    function _return_scroll () {
      $(document).off('.noScroll')
    }

    function _open () {
      myScroll.enable()
      _no_scroll()
      $('.' + setting.class.toggle).addClass(setting.class.toggleopen)
      $('.' + setting.class.ovly).addClass(setting.class.bgshow)
      $('.' + setting.class.menu).addClass(setting.class.open).attr('aria-expanded', 'true')
    }

    function _close () {
      myScroll.disable()
      _return_scroll()

      $('.' + setting.class.toggle).removeClass(setting.class.toggleopen)
      $('.' + setting.class.ovly).removeClass(setting.class.bgshow)
      $('.' + setting.class.menu).removeClass(setting.class.open).attr('aria-expanded', 'false')
    }

    return {
      toggle: _toggle
    }
  })()

  Drawer.toggle()
})
