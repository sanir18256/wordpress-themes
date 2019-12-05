<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package demo
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="article-inner-wrapper">
		<?php demo_post_thumbnail(); ?>

		<div class="entry-container">
		
			<header class="entry-header">
				<?php
				if ( is_singular() ) :
					the_title( '<h1 class="entry-title">', '</h1>' );
				else :
					the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
				endif;

				if ( 'post' === get_post_type() ) :
					?>
					<div class="entry-meta">
						<?php
						demo_posted_on();
						demo_posted_by();
						?>
					</div><!-- .entry-meta -->
				<?php endif; ?>
			</header><!-- .entry-header -->

			<div class="entry-summary">
				<?php
					the_excerpt();
				?>
			</div><!-- .entry-summary -->

			<footer class="entry-footer">
				<?php demo_entry_footer(); ?>
			</footer><!-- .entry-footer -->
		</div><!-- .entry-container -->
	</div>
</article><!-- #post-<?php the_ID(); ?> -->
