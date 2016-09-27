<?php
/**
 * Custom template tags for this theme.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package modernize
 * @author Takuma Misumi
 * @link http://blog.mismithportfolio.com/
 * @license GPLv2 or later
 */

if ( ! function_exists( 'modernize_posted_on' ) ) :
/**
 * Prints HTML with meta information for the current post-date/time and author.
 */
function modernize_posted_on() {
  $time_string = '<span class="publised-label">Posted on<time class="entry-date published" datetime="%1$s">%2$s</time></span>';

  $entry = get_the_date( 'Ymd' );
  $modified = get_the_modified_date( 'Ymd' );

  if ( $entry !== $modified && !is_home() && !is_archive() && !is_search() ) {
    $time_string = '
    <span class="publised-label">Posted on<time class="entry-date published" datetime="%1$s">%2$s</time></span>
    <span class="update-label">Edit on<time class="updated" datetime="%3$s">%4$s</time></span>
    ';
  }

  $time_string = sprintf( $time_string,
    esc_attr( get_the_date( 'c' ) ),
    esc_html( get_the_date() ),
    esc_attr( get_the_modified_date( 'c' ) ),
    esc_html( get_the_modified_date() )
  );

  $posted_on = sprintf( $time_string );

  $byline = sprintf(
    esc_html_x( 'by %s', 'post author', 'modernize' ),
    '<span class="author vcard"><a class="url fn n" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a></span>'
  );

  echo '<span class="posted-on">' . $posted_on . '</span><span class="byline"> ' . $byline . '</span>'; // WPCS: XSS OK.

}
endif;

if ( ! function_exists( 'modernize_entry_footer' ) ) :
/**
 * Prints HTML with meta information for the categories, tags and comments.
 */
function modernize_entry_footer() {
  // Hide category and tag text for pages.
  if ( 'post' === get_post_type() ) {
    /* translators: used between list items, there is a space after the comma */
    $categories_list = get_the_category_list( esc_html__( '', 'modernize' ) );
    if ( $categories_list && modernize_categorized_blog() ) {
      printf( '<span class="cat-links">' . esc_html__( 'Category : %1$s', 'modernize' ) . '</span>', $categories_list ); // WPCS: XSS OK.
    }

    /* translators: used between list items, there is a space after the comma */
    $tags_list = get_the_tag_list( '', esc_html__( '', 'modernize' ) );
    if ( $tags_list ) {
      printf( '<span class="tags-links">' . esc_html__( 'Tag : %1$s', 'modernize' ) . '</span>', $tags_list ); // WPCS: XSS OK.
    }
  }

  if ( ! is_single() && ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
    echo '<span class="comments-link">';
    /* translators: %s: post title */
    comments_popup_link( sprintf( wp_kses( __( 'Leave a Comment<span class="screen-reader-text"> on %s</span>', 'modernize' ), array( 'span' => array( 'class' => array() ) ) ), get_the_title() ) );
    echo '</span>';
  }

  edit_post_link(
    sprintf(
      /* translators: %s: Name of current post */
      esc_html__( 'Edit %s', 'modernize' ),
      the_title( '<span class="screen-reader-text">"', '"</span>', false )
    ),
    '<span class="edit-link">',
    '</span>'
  );
}
endif;

/**
 * Returns true if a blog has more than 1 category.
 *
 * @return bool
 */
function modernize_categorized_blog() {
  if ( false === ( $all_the_cool_cats = get_transient( 'modernize_categories' ) ) ) {
    // Create an array of all the categories that are attached to posts.
    $all_the_cool_cats = get_categories( array(
      'fields'     => 'ids',
      'hide_empty' => 1,
      // We only need to know if there is more than one category.
      'number'     => 2,
    ) );

    // Count the number of categories that are attached to the posts.
    $all_the_cool_cats = count( $all_the_cool_cats );

    set_transient( 'modernize_categories', $all_the_cool_cats );
  }

  if ( $all_the_cool_cats > 1 ) {
    // This blog has more than 1 category so modernize_categorized_blog should return true.
    return true;
  } else {
    // This blog has only 1 category so modernize_categorized_blog should return false.
    return false;
  }
}

/**
 * Flush out the transients used in modernize_categorized_blog.
 */
function modernize_category_transient_flusher() {
  if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
    return;
  }
  // Like, beat it. Dig?
  delete_transient( 'modernize_categories' );
}
add_action( 'edit_category', 'modernize_category_transient_flusher' );
add_action( 'save_post',     'modernize_category_transient_flusher' );
