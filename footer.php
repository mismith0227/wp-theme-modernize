<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package modernize
 */

?>

	</div><!-- #content -->

	<footer id="colophon" class="footer" role="contentinfo">
		<div class="footer__info">
			<a href="<?php echo esc_url( __( 'https://wordpress.org/', 'modernize' ) ); ?>"><?php printf( esc_html__( 'Proudly powered by %s', 'modernize' ), 'WordPress' ); ?></a>
			<span class="sep"> | </span>
			<?php printf( esc_html__( 'Theme: %1$s by %2$s.', 'modernize' ), 'modernize', '<a href="https://profiles.wordpress.org/mismith227" rel="designer">mismith227</a>' ); ?>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->


<?php wp_footer(); ?>

</body>
</html>
