<?php
/**
 * Custom Header feature.
 *
 * @package modernize
 * @author Takuma Misumi
 * @link http://blog.mismithportfolio.com/
 * @license GPLv2 or later
 *
 */

/**
 * Set up the WordPress core custom header feature.
 *
 * @uses modernize_header_style()
 */
function modernize_custom_header_setup() {
  add_theme_support( 'custom-header', apply_filters( 'modernize_custom_header_args', array(
    'default-image'          => '',
    'default-text-color'     => '333333',
    'width'                  => 1600,
    'height'                 => 400,
    'flex-height'            => true,
    'wp-head-callback'       => 'modernize_header_style',
  ) ) );
}
add_action( 'after_setup_theme', 'modernize_custom_header_setup' );

if ( ! function_exists( 'modernize_header_style' ) ) :
/**
 * Styles the header image and text displayed on the blog.
 *
 * @see modernize_custom_header_setup().
 */
function modernize_header_style() {
  $header_text_color = get_header_textcolor();

  /*
   * If no custom options for text are set, let's bail.
   * get_header_textcolor() options: Any hex value, 'blank' to hide text. Default: HEADER_TEXTCOLOR.
   */
  if ( HEADER_TEXTCOLOR === $header_text_color ) {
    return;
  }

  // If we get this far, we have custom styles. Let's do this.
  ?>
  <style type="text/css">
  <?php
    // Has the text been hidden?
    if ( ! display_header_text() ) :
  ?>
    .site-branding__title,
    .site-branding__description {
      position: absolute;
      clip: rect(1px, 1px, 1px, 1px);
    }
  <?php
    // If the user has set a custom color for the text use that.
    else :
  ?>
    .site-branding__title a,
    .site-branding__description {
      color: #<?php echo esc_attr( $header_text_color ); ?>;
    }
  <?php endif; ?>
  </style>
  <?php
}
endif;
