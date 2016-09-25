<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package modernize
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

	<?php get_template_part('template-parts/svgpack-sprite'); ?>

	<a class="skip-link screen-reader-text" href="#main"><?php esc_html_e( 'Skip to content', 'modernize' ); ?></a>

	<header class="header" role="banner">
		<?php
		if ( is_front_page() && is_home() ) : ?>
			<h1 class="header__title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
		<?php else : ?>
			<p class="header__title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
		<?php
		endif;

		$description = get_bloginfo( 'description', 'display' );
		if ( $description || is_customize_preview() ) : ?>
			<p class="header__description"><?php echo $description; /* WPCS: xss ok. */ ?></p>
		<?php
		endif; ?>

		<button class="toggle-btn js-toggle">
			<span></span>
		</button>
	</header><!-- .header -->

	<nav id="site-navigation" class="gnav" role="navigation" aria-expanded="false">
		<?php if ( has_nav_menu( 'primary' ) ) : ?>
				<?php
					wp_nav_menu( array(
						'theme_location' => 'primary',
						'menu_class'     => 'primary-menu',
					 ) );
				?>
		<?php endif; ?>
	</nav><!-- #site-navigation -->

	<?php if ( is_home() ) : ?>
		<?php if ( get_header_image() ) : ?>
		<div class="main-visual">
			<img src="<?php header_image(); ?>" width="<?php echo esc_attr( get_custom_header()->width ); ?>" height="<?php echo esc_attr( get_custom_header()->height ); ?>" alt="" class="main-visual__img">
		</div>
		<?php endif; ?>
	<?php endif; ?>

	<div id="content" class="site-content">
