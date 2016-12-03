<?php
/**
 * The header for our theme.
 *
 * @package modernize
 * @author Takuma Misumi
 * @link http://blog.mismithportfolio.com/
 * @license GPLv2 or later
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

	<?php get_template_part('template-parts/svgpack-sprite'); ?>

	<a class="skip-link screen-reader-text" href="#main"><?php esc_html_e( 'Skip to content', 'modernize' ); ?></a>

	<header id="header" class="header" role="banner">
    <?php the_custom_logo(); ?>
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

		<?php if ( has_nav_menu( 'primary' ) ) : ?>
		<button class="toggle-btn js-toggle" aria-expanded="false">
			<span></span>
      <span class="screen-reader-text">menu</span>
		</button>
		<?php endif; ?>

	</header><!-- .header -->

	<?php if ( has_nav_menu( 'primary' ) ) : ?>
	<nav id="site-navigation" class="gnav" role="navigation" aria-hidden="true">
		<?php
			wp_nav_menu( array(
				'theme_location' => 'primary',
				'menu_class'     => 'primary-menu',
			 ) );
		?>
	</nav><!-- #site-navigation -->
	<?php endif; ?>

	<?php if ( is_home() ) : ?>
		<?php if ( get_header_image() ) : ?>
		<div class="main-visual">
			<img src="<?php header_image(); ?>" width="<?php echo esc_attr( get_custom_header()->width ); ?>" height="<?php echo esc_attr( get_custom_header()->height ); ?>" alt="" class="main-visual__img">
		</div>
		<?php endif; ?>
	<?php endif; ?>

	<div id="content" class="site-content">
