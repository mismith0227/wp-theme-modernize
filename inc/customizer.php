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

function modernize_sanitize_select( $input, $setting ) {
  global $wp_customize;
	$control = $wp_customize->get_control( $setting->id );
	if ( array_key_exists( $input, $control->choices ) ) {
		return $input;
	} else {
		return $setting->default;
	}
}

// Columns
function modernize_sanitize_select_columns( $input ) {
	$valid = array( '1', '2' );
	if ( in_array( $input, $valid, true ) ) {
		return $input;
	}
	return '1';
}

function modernize_customize_register( $wp_customize ) {
  $wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
  $wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
  $wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';
  $wp_customize->add_setting('article_column_options', array(
    'default'  => 1,
    'sanitize_callback' => 'modernize_sanitize_select_columns',
  ));
  $wp_customize->add_control( 'article_column', array(
    'label' =>'Article Layout',
    'section' => 'article_column_section',
    'settings' => 'article_column_options',
    'type' => 'select',
    'choices' =>  array(
  		'1' =>  __( '1 Column', 'modernize' ),
  		'2' =>  __( '2 Columns', 'modernize' ),
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
