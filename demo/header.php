<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package demo
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'demo' ); ?></a>

	<header id="masthead" class="site-header">
			<?php get_template_part( 'template-parts/header/header', 'image' ); ?>
		<div class="section-inner">
			
			<?php get_template_part( 'template-parts/header/site', 'branding' ); ?> 

			<?php get_template_part( 'template-parts/header/site', 'search' ); ?>

			<?php get_template_part( 'template-parts/navigation/header', 'menu' ); ?>
		</div>
	</header><!-- #masthead -->

	<?php get_template_part('template-parts/featured-content/display','featured'); ?>

	<div id="content" class="site-content">
