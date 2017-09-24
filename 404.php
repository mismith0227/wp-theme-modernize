<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @package modernize
 * @author Takuma Misumi
 * @link http://blog.mismithportfolio.com/
 * @license GPLv2 or later
 */

get_header(); ?>

  <main id="main" class="primary" role="main">

    <section class="error-404 not-found">
      <header class="page-header">
        <h1 class="page-title"><?php esc_html_e( 'Oops! That page can&rsquo;t be found.', 'modernize' ); ?></h1>
      </header><!-- .page-header -->

      <div class="page-content">
        <p><?php esc_html_e( 'It looks like nothing was found at this location. Maybe try one of the links below or a search?', 'modernize' ); ?></p>

        <?php
          get_search_form();
        ?>

      </div><!-- .page-content -->
    </section><!-- .error-404 -->

  </main><!-- #main -->

<?php
get_sidebar();
get_footer();
