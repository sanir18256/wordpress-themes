

<div id="site-header-menu" class="site-header-menu">
	<nav id="site-navigation" class="main-navigation">
		<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false">
			<?php
			echo demo_get_svg( array( 'icon' => 'bars' ) );
			echo demo_get_svg( array( 'icon' => 'close' ) );
			_e( 'Menu', 'demo' );
			?>
		</button>


		<?php
		wp_nav_menu( array(
			'theme_location' => 'menu-1',
			'menu_id'        => 'primary-menu',
		) );
		?>
	</nav><!-- #site-navigation -->
</div>