<?php
/**
 * Template part for displaying page content in page.php.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package modernize
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<?php
			if ( has_post_thumbnail() ) {
				if ( is_single() || is_page() ) {
		?>
		<div class="wrap-thumb">
			<?php the_post_thumbnail('full'); ?>
		</div>
		<?php
			} else {
		?>

			<div class="wrap-thumb">
				<a href="<?php echo get_permalink(); ?>">
				<?php the_post_thumbnail('full'); ?>
				</a>
			</div>
		<?php
				}
			}
		?>
		<div class="entry-info">
			<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
		</div>

	</header><!-- .entry-header -->

	<div class="entry-content">
		<?php
			the_content();

			wp_link_pages( array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'modernize' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->

	<footer class="entry-footer">
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
	</footer><!-- .entry-footer -->
</article><!-- #post-## -->
