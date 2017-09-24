<?php
/**
 * Jetpack Compatibility File.
 *
 * @package modernize
 * @author Takuma Misumi
 * @link http://blog.mismithportfolio.com/
 * @license GPLv2 or later
 */

/**
 * Jetpack setup function.
 *
 * See: https://jetpack.com/support/infinite-scroll/
 * See: https://jetpack.com/support/responsive-videos/
 */
function modernize_jetpack_setup() {
  // Add theme support for Infinite Scroll.
  add_theme_support( 'infinite-scroll', array(
    'container' => 'main',
    'render'    => 'modernize_infinite_scroll_render',
    'footer'    => 'page',
  ) );

  // Add theme support for Responsive Videos.
  add_theme_support( 'jetpack-responsive-videos' );
}
add_action( 'after_setup_theme', 'modernize_jetpack_setup' );

/**
 * Custom render function for Infinite Scroll.
 */
function modernize_infinite_scroll_render() {
  while ( have_posts() ) {
    the_post();
    if ( is_search() ) :
        get_template_part( 'template-parts/content', 'search' );
    else :
        get_template_part( 'template-parts/content', get_post_format() );
    endif;
  }
}
