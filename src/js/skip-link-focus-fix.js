/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
(function () {
  let location
  const isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1
  const isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1
  const isIe = navigator.userAgent.toLowerCase().indexOf('msie') > -1

  if ((isWebkit || isOpera || isIe) && document.getElementById && window.addEventListener) {
    window.addEventListener('hashchange', function () {
      let id = location.hash.substring(1)
      let element

      if (!(/^[A-z0-9_-]+$/.test(id))) {
        return
      }

      element = document.getElementById(id)

      if (element) {
        if (!(/^(?:a|select|input|button|textarea)$/i.test(element.tagName))) {
          element.tabIndex = -1
        }

        element.focus()
      }
    }, false)
  }
})()
