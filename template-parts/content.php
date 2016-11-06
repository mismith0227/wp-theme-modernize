<?php
/**
 * Template part for displaying posts.
 *
 * @package modernize
 * @author Takuma Misumi
 * @link http://blog.mismithportfolio.com/
 * @license GPLv2 or later
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class('entry'); ?>>
  <header class="entry__header">

    <?php
      if ( has_post_thumbnail() ) {
        if ( is_single() ) {
    ?>
        <div class="entry__thumb">
          <?php the_post_thumbnail('full'); ?>
        </div>
    <?php } else { ?>
      <div class="entry__thumb">
        <a href="<?php echo get_permalink(); ?>">
          <?php the_post_thumbnail('full'); ?>
        </a>
      </div>
    <?php
        }
      }
    ?>

    <div class="entry__info">
      <?php
        if ( is_single() ) {
          the_title( '<h1 class="entry__title">', '</h1>' );
        } else {
          the_title( '<h2 class="entry__title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
        }

      if ( 'post' === get_post_type() ) : ?>
      <div class="entry__meta">
        <?php if ( is_sticky() ) : ?>
          <div class="entry__featured">
            <span>
              <svg viewBox="0 0 64 64" class="icon">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-pushpin"></use>
              </svg>
              <?php echo esc_html__( 'featured', 'modernize' ); ?>
            </span>
          </div>
        <?php endif; ?>
        <?php modernize_posted_on(); ?>
      </div><!-- .entry__meta -->
      <?php endif; ?>
    </div>

  </header><!-- .entry__header -->

  <div class="entry__content">
    <?php
      if ( is_category() || is_archive() || is_home() ) {
        the_excerpt();
      } else {
        the_content();
      }

      wp_link_pages( array(
        'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'modernize' ),
        'after'  => '</div>',
      ) );
    ?>
  </div><!-- .entry__content -->

  <footer class="entry__footer">
    <?php modernize_entry_footer(); ?>
  </footer><!-- .entry__footer -->
</article><!-- #post-## -->
