/**
 * File customizer.js.
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */

(function ($) {
	// Site title and description.
	                    wp.customize('blogname', function (value) {
		                    value.bind(function (to) {
			                    $('.site-branding__title a').text(to)
		})
	})
	                    wp.customize('blogdescription', function (value) {
		                    value.bind(function (to) {
			                    $('.site-branding__description').text(to)
		})
	})

	// Header text color.
	                    wp.customize('header_textcolor', function (value) {
		                    value.bind(function (to) {
			                    if ('blank' === to) {
				                    $('.site-branding__title a, .site-branding__description').css({
					                    'clip': 'rect(1px, 1px, 1px, 1px)',
					                    'position': 'absolute'
				})
			} else {
				                    $('.site-branding__title a, .site-branding__description').css({
					                    'clip': 'auto',
					                    'position': 'relative'
				})
				                    $('.site-branding__title a, .site-branding__description').css({
					                    'color': to
				})
			}
		})
	})
})(jQuery)
