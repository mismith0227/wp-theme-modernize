const IScroll = require('iscroll')
const $ = window.jQuery
const Headroom = require('headroom.js')
require('./skip-link-focus-fix.js')

import debounce from 'throttle-debounce/debounce'

$(() => {
  // headerstyle
  const headstyle = () => {
    const navHeight = $('#header').outerHeight(true)
    $('body').css({'padding-top': `${navHeight}px`})
    if ($('#wpadminbar').length) {
      const barHeight = $('#wpadminbar').height()
      $('#header').css({'top': `${barHeight}px`})
    }
  }

  headstyle()

  $(window).on('resize', debounce(200, () => {
    headstyle()
    Drawer.close()
  }))

  // sns icon
  if ($('.social-navigation').length) {
    const sns = [
      '500px',
      'codepen',
      'dribbble',
      'facebook',
      'flickr',
      'google',
      'github',
      'instagram',
      'linkedin',
      'npm',
      'pinterest',
      'tumblr',
      'twitter',
      'vimeo',
      'wordpress',
      'youtube',
      'feed'
    ]

    $.each(sns, (i, sns) => {
      $('.sns-menu li').find(`a[href*="${sns}"] use`).attr('xlink:href', `#icon-${sns}`)
    })
  }

  // search-no-results page
  if ($('.error404').length) {
    $('.secondary form[role="search"]').hide()
  }

  const myElement = document.querySelector('.header')
  const headroom = new Headroom(myElement, {
    offset: 100
  })
  headroom.init()

  const isPrimaryNav = $('#site-navigation').children().length

  const Drawer = (() => {
    if (isPrimaryNav === 0) return

    const myScroll = new IScroll('#site-navigation', {
      mouseWheel: true,
      preventDefault: false
    })

    const setting = {
      class: {
        toggle: 'js-toggle',
        menu: 'gnav',
        ovly: 'bg-ovly',
        open: 'open',
        toggleopen: 'toggle-btn__open',
        bgshow: 'bg-ovly__show',
        fixed: 'bodyfixed'
      }
    }

    function _init () {
      const ovly = `<div class="${setting.class.ovly} ${setting.class.toggle}"></div>`
      $('body').append(ovly)

      if ($(`.${setting.class.menu}`).find('li').length) {
        $(`.${setting.class.toggle}`).show()
      }
    }

    _init()

    function _toggle () {
      $(`.${setting.class.toggle}`).on('click', () => {
        if ($(`.${setting.class.menu}`).attr('aria-hidden') === 'false') {
          _close()
        } else {
          _open()
        }
      })
    }

    function _noScroll () {
      $(document).on('touchmove.noScroll', (e) => {
        e.preventDefault()
      })
    }

    function _returnScroll () {
      $(document).off('.noScroll')
    }

    function _open () {
      myScroll.enable()
      _noScroll()
      $('body').addClass(setting.class.fixed)
      $(`.${setting.class.toggle}`).addClass(setting.class.toggleopen).attr('aria-expanded', 'true')
      $(`.${setting.class.ovly}`).addClass(setting.class.bgshow)
      $(`.${setting.class.menu}`).addClass(setting.class.open).attr('aria-hidden', 'false')
    }

    function _close () {
      myScroll.disable()
      _returnScroll()
      $('body').removeClass(setting.class.fixed)
      $(`.${setting.class.toggle}`).removeClass(setting.class.toggleopen).attr('aria-expanded', 'false')
      $(`.${setting.class.ovly}`).removeClass(setting.class.bgshow)
      $(`.${setting.class.menu}`).removeClass(setting.class.open).attr('aria-hidden', 'true')
    }

    return {
      toggle: _toggle,
      close: _close
    }
  })()

  if (isPrimaryNav !== 0) {
    Drawer.toggle()
  }
})
