<?php
/**
 * Template Name: No widget page
 *
 * @package modernize
 * @author Takuma Misumi
 * @link http://blog.mismithportfolio.com/
 * @license GPLv2 or later
 */

get_header(); ?>

  <div class="primary">
    <?php while ( have_posts() ) : the_post(); ?>
      <?php get_template_part( 'template-parts/content', 'page' ); ?>
      <?php
      if ( comments_open() || get_comments_number() ) :
        comments_template();
      endif;
      ?>
    <?php endwhile; // End of the loop. ?>
  </div><!-- / .l-primary  -->

<?php get_footer(); ?>
