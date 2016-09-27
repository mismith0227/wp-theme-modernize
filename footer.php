<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @package modernize
 * @author Takuma Misumi
 * @link http://blog.mismithportfolio.com/
 * @license GPLv2 or later
 */

?>

  </div><!-- #content -->

  <footer id="colophon" class="footer" role="contentinfo">

    <?php if ( has_nav_menu( 'social' ) ) : ?>
      <nav class="social-navigation" role="navigation" aria-label="<?php esc_attr_e( 'Footer Social Links Menu', 'modernize' ); ?>">
        <?php
          wp_nav_menu( array(
            'theme_location' => 'social',
            'menu_class'     => 'sns-menu',
            'depth'          => 1,
            'link_before'    => '<svg viewBox="0 0 64 64" class="icon"><use xlink:href="">',
            'link_after'     => '</use></svg>',
          ) );
        ?>
      </nav><!-- .social-navigation -->
    <?php endif; ?>

    <div class="footer__info">
      <a href="<?php echo esc_url( __( 'https://wordpress.org/', 'modernize' ) ); ?>"><?php printf( esc_html__( 'Proudly powered by %s', 'modernize' ), 'WordPress' ); ?></a>
      <span class="sep"> | </span>
      <?php printf( esc_html__( 'Theme: %1$s by %2$s.', 'modernize' ), 'modernize', '<a href="https://profiles.wordpress.org/mismith227" rel="designer">mismith227</a>' ); ?>
    </div><!-- .site-info -->
  </footer><!-- #colophon -->


<?php wp_footer(); ?>

</body>
</html>
