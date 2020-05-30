<div class="header-titles-wrapper">
	<div class="header-titles">
		<?php
		the_custom_logo();
		if ( is_front_page() && is_home() ) :
			?>
			<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
			<?php
		else :
			?>
			<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
			<?php
		endif;
		$demo_description = get_bloginfo( 'description', 'display' );
		if ( $demo_description || is_customize_preview() ) :
			?>
			<p class="site-description"><?php echo $demo_description; /* WPCS: xss ok. */ ?></p>
		<?php endif; ?>
	</div>
</div><!-- .site-branding -->