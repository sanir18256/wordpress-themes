<?php
/**
 * Site Search template
 *
 * @package  Demo
 */

?>

<div class="site-search">
	<button class="menu-toggle search-toggle" aria-expanded="false"><?php echo demo_get_svg( array( 'icon' => 'search' ) ); echo demo_get_svg( array( 'icon' => 'close' ) ); ?><span class="screen-reader-text"><?php esc_html_e( 'Search', 'bold-photography' ); ?></span>
	</button>
	
	<div class="search-wrapper">
		<?php get_search_form(); ?>
	</div><!-- .search-wrapper -->
</div><!-- .site-search -->