<?php
/**
 * Template part for displaying page content in page.php.
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
        if ( is_single() || is_page() ) {
    ?>
    <div class="entry__thumb">
      <?php the_post_thumbnail('full'); ?>
    </div>
    <?php
      } else {
    ?>

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
      <?php the_title( '<h1 class="entry__title">', '</h1>' ); ?>
    </div>

  </header><!-- .entry__header -->

  <div class="entry__content">
    <?php
      the_content();

      wp_link_pages( array(
        'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'modernize' ),
        'after'  => '</div>',
      ) );
    ?>
  </div><!-- .entry__content -->

  <footer class="entry__footer">
    <?php
      edit_post_link(
        sprintf(
          /* translators: %s: Name of current post */
          esc_html__( 'Edit %s', 'modernize' ),
          the_title( '<span class="screen-reader-text">"', '"</span>', false )
        ),
        '<span class="edit-link">',
        '</span>'
      );
    ?>
  </footer><!-- .entry__footer -->
</article><!-- #post-## -->
