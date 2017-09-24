<?php
/**
 * The sidebar containing the main widget area.
 *
 * @package modernize
 * @author Takuma Misumi
 * @link http://blog.mismithportfolio.com/
 * @license GPLv2 or later
 */

if ( ! is_active_sidebar( 'sidebar-1' ) ) {
  return;
}
?>

<aside class="secondary" role="complementary">
  <?php dynamic_sidebar( 'sidebar-1' ); ?>
</aside><!-- #secondary -->
