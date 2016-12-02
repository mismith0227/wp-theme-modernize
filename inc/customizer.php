<?php
/**
 * modernize Theme Customizer.
 *
 * @package modernize
 * @author Takuma Misumi
 * @link http://blog.mismithportfolio.com/
 * @license GPLv2 or later
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function modernize_customize_register( $wp_customize ) {
  $wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
  $wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
  $wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';
  $wp_customize->add_setting('article_column_options[radio01]', array(
    'default'  => 'col-1',
    'type'  => 'option',
  ));
   $wp_customize->add_control( 'article_column', array(
      'settings' => 'article_column_options[radio01]',
      'label' =>'Article Layout',
      'section' => 'article_column_section',
      'type' => 'radio',
      'choices'    => array(
          'col-1' => 'one column article list',
          'col-2' => 'two column article list',
      ),
  ));
}
add_action( 'customize_register', 'modernize_customize_register' );

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function modernize_customize_preview_js() {
  wp_enqueue_script( 'modernize_customizer', get_template_directory_uri() . '/js/customizer.js', array( 'customize-preview' ), '20151215', true );
}
add_action( 'customize_preview_init', 'modernize_customize_preview_js' );
