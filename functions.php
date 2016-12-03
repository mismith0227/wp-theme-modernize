<?php
/**
 * modernize functions and definitions.
 *
 * @package modernize
 * @author Takuma Misumi
 * @link http://blog.mismithportfolio.com/
 * @license GPLv2 or later
 */

if ( ! function_exists( 'modernize_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function modernize_setup() {
  /*
   * Make theme available for translation.
   * Translations can be filed in the /languages/ directory.
   */
  load_theme_textdomain( 'modernize', get_template_directory() . '/languages' );

  // Add default posts and comments RSS feed links to head.
  add_theme_support( 'automatic-feed-links' );

  /*
   * Let WordPress manage the document title.
   * By adding theme support, we declare that this theme does not use a
   * hard-coded <title> tag in the document head, and expect WordPress to
   * provide it for us.
   */
  add_theme_support( 'title-tag' );

  /*
   * Enable support for Post Thumbnails on posts and pages.
   */
  add_theme_support( 'post-thumbnails' );

  /*
   * This theme uses wp_nav_menu() in one location.
   */
  register_nav_menus( array(
    'primary' => esc_html__( 'Primary', 'modernize' ),
    'social'  => esc_html__( 'Social Links Menu', 'modernize' ),
  ) );

  /*
   * Switch default core markup for search form, comment form, and comments
   * to output valid HTML5.
   */
  add_theme_support( 'html5', array(
    'search-form',
    'comment-form',
    'comments__list',
    'gallery',
    'caption',
  ) );

  /*
   * Enable support for Post Formats.
   */
  add_theme_support( 'post-formats', array(
    'aside',
    'image',
    'video',
    'quote',
    'link',
  ) );

  // Add theme support for Custom Logo.
  add_theme_support( 'custom-logo', array(
    'width'       => 250,
    'height'      => 250,
    'flex-width'  => true,
  ) );

  // Set up the WordPress core custom background feature.
  add_theme_support( 'custom-background', apply_filters( 'modernize_custom_background_args', array(
    'default-color' => 'ffffff',
    'default-image' => '',
  ) ) );

  /*
   * Enable support editor-style on WordPress dashboard.
   */
  add_editor_style( array(
    'editor-style.css',
  ) );
}
endif;
add_action( 'after_setup_theme', 'modernize_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 */
function modernize_content_width() {
  $GLOBALS['content_width'] = apply_filters( 'modernize_content_width', 700 );
}
add_action( 'after_setup_theme', 'modernize_content_width', 0 );

/**
 * Register widget area.
 */
function modernize_widgets_init() {
  register_sidebar( array(
    'name'          => esc_html__( 'Sidebar', 'modernize' ),
    'id'            => 'sidebar-1',
    'description'   => esc_html__( 'Add widgets here.', 'modernize' ),
    'before_widget' => '<section id="%1$s" class="widget %2$s">',
    'after_widget'  => '</section>',
    'before_title'  => '<h2 class="widget__title">',
    'after_title'   => '</h2>',
  ) );
}
add_action( 'widgets_init', 'modernize_widgets_init' );

/*
 * Register excerpt length.
 */
function custom_excerpt_length( $length ) {
	return 120;
}
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );

function wpdocs_excerpt_more( $more ) {
  return '[&hellip;]';
}
add_filter( 'excerpt_more', 'wpdocs_excerpt_more' );

/**
 * Enqueue scripts and styles.
 */
function modernize_scripts() {
  $url = get_template_directory_uri();
  $theme   = wp_get_theme();
  $version = $theme->get( 'Version' );

  wp_enqueue_style( 'modernize-style', $url . '/style.css' );

  if ( is_child_theme() ) {
    wp_enqueue_style( get_stylesheet(), get_stylesheet_uri(), array( 'modernize-style' ), $version);
  }

  wp_enqueue_script( 'modernize-main', $url . '/js/bundle.js', array('jquery'), $version, true );

  if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
    wp_enqueue_script( 'comment-reply' );
  }
}
add_action( 'wp_enqueue_scripts', 'modernize_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';
