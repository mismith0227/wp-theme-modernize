<?php
/**
 * The template for displaying all single posts.
 *
 * @package modernize
 * @author Takuma Misumi
 * @link http://blog.mismithportfolio.com/
 * @license GPLv2 or later
 */

get_header(); ?>

  <main id="main" class="primary" role="main">

    <?php
    while ( have_posts() ) : the_post();

      get_template_part( 'template-parts/content', get_post_format() );

      the_post_navigation();

      // If comments are open or we have at least one comment, load up the comment template.
      if ( comments_open() || get_comments_number() ) :
        comments_template();
      endif;

    endwhile; // End of the loop.
    ?>

  </main><!-- #main -->

<?php
get_sidebar();
get_footer();
