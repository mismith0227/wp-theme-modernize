<?php
/**
 * The template for displaying search results pages.
 *
 * @package modernize
 * @author Takuma Misumi
 * @link http://blog.mismithportfolio.com/
 * @license GPLv2 or later
 */

get_header(); ?>

  <main id="main" class="primary" role="main">

    <?php
    if ( have_posts() ) : ?>

      <header class="page-header">
        <h1 class="page-title"><?php printf( esc_html__( 'Search Results for: %s', 'modernize' ), '<span>' . get_search_query() . '</span>' ); ?></h1>
      </header><!-- .page-header -->

      <div class="article-wrap">

      <?php
      /* Start the Loop */
      while ( have_posts() ) : the_post();

        /**
         * Run the loop for the search to output the results.
         * If you want to overload this in a child theme then include a file
         * called content-search.php and that will be used instead.
         */
        get_template_part( 'template-parts/content', 'search' );

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
