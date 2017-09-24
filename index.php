<?php
/**
 * The main template file.
 *
 * @package modernize
 * @author Takuma Misumi
 * @link http://blog.mismithportfolio.com/
 * @license GPLv2 or later
 */

get_header(); ?>

  <main id="main" class="primary" role="main">

    <?php
    if ( have_posts() ) :

      if ( is_home() && ! is_front_page() ) : ?>
        <header>
          <h1 class="page-title screen-reader-text"><?php single_post_title(); ?></h1>
        </header>

      <?php
      endif;
      ?>

      <div class="article-wrap">

      <?php
      /* Start the Loop */
      while ( have_posts() ) : the_post();

        /*
         * Include the Post-Format-specific template for the content.
         * If you want to override this in a child theme, then include a file
         * called content-___.php (where ___ is the Post Format name) and that will be used instead.
         */
        get_template_part( 'template-parts/content', get_post_format() );

      endwhile;
      ?>

      </div>

      <?php
      the_posts_navigation();

    else :

      get_template_part( 'template-parts/content', 'none' );

    endif; ?>

  </main><!-- #main -->

<?php
get_sidebar();
get_footer();
