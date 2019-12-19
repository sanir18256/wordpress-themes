/* global fotografieScreenReaderText */
jQuery(document).ready(function($) {

 /*------------------------------------------------
                MENU AND SEARCH
------------------------------------------------*/


    $('.menu-toggle').click(function(){
        $('.main-navigation ul.nav-menu').slideToggle();
    });

    $( '.search-toggle' ).click( function() {
        $( this ).toggleClass( 'open' );
        $( this ).attr( 'aria-expanded', $( this ).attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );
        $( '.search-wrapper' ).toggle();
    });

    var body, masthead, menuToggle, siteNavigation, siteHeaderMenu;

    function initMainNavigation( container ) {
        // Add dropdown toggle that displays child menu items.
        var dropdownToggle = $( '<button />', {
            'class': 'dropdown-toggle',
            'aria-expanded': false
        } ).append( $( '<span />', {
            'class': 'screen-reader-text',
            text: fotografieScreenReaderText.expand
        } ) );

        container.find( '.menu-item-has-children > a' ).after( dropdownToggle );

        // Toggle buttons and submenu items with active children menu items.
        container.find( '.current-menu-ancestor > button' ).addClass( 'toggled-on' );
        container.find( '.current-menu-ancestor > .sub-menu' ).addClass( 'toggled-on' );

        // Add menu items with submenus to aria-haspopup="true".
        container.find( '.menu-item-has-children' ).attr( 'aria-haspopup', 'true' );

        // For default page menu
        container.find( '.page_item_has_children > a' ).after( dropdownToggle );
        container.find( '.current_page_ancestor > button' ).addClass( 'toggled-on' );
        container.find( '.current_page_ancestor > .sub-menu' ).addClass( 'toggled-on' );
        container.find( '.page_item_has_children' ).attr( 'aria-haspopup', 'true' );


        container.find( '.dropdown-toggle' ).click( function( e ) {
            var _this            = $( this ),
                screenReaderSpan = _this.find( '.screen-reader-text' );

            e.preventDefault();
            _this.toggleClass( 'toggled-on' );
            _this.next( '.children, .sub-menu' ).toggleClass( 'toggled-on' );

            // jscs:disable
            _this.attr( 'aria-expanded', _this.attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );
            // jscs:enable
            screenReaderSpan.text( screenReaderSpan.text() === fotografieScreenReaderText.expand ? fotografieScreenReaderText.collapse : fotografieScreenReaderText.expand );
        } );
    }

    //For Primary Menu
    masthead          = $( '#masthead' );
    menuToggle        = $( '#menu-toggle' );
    siteHeaderMenu    = $( '#site-header-menu' );
    siteNavigation    = $( '#site-navigation' ); // nav
    initMainNavigation( siteNavigation );

    // Enable menuToggle.
    ( function() {
        // Return early if menuToggle is missing.
        if ( ! menuToggle.length ) {
            return;
        }

        // Add an initial values for the attribute.
        menuToggle.add( siteNavigation ).attr( 'aria-expanded', 'false' );

        menuToggle.on( 'click.fotografie', function() {
            $( this ).add( siteHeaderMenu ).toggleClass( 'toggled-on' );

            // jscs:disable
            $( this ).add( siteNavigation ).attr( 'aria-expanded', $( this ).add( siteNavigation ).attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );
            // jscs:enable
        } );
    } )();

    // Fix sub-menus for touch devices and better focus for hidden submenu items for accessibility.
    ( function() {
        if ( ! siteNavigation.length || ! siteNavigation.children().length ) {
            return;
        }

        // Toggle `focus` class to allow submenu access on tablets.
        function toggleFocusClassTouchScreen() {
            if ( window.innerWidth >= 910 ) {
                $( document.body ).on( 'touchstart.fotografie', function( e ) {
                    if ( ! $( e.target ).closest( '.main-navigation li' ).length ) {
                        $( '.main-navigation li' ).removeClass( 'focus' );
                    }
                } );
                siteNavigation.find( '.menu-item-has-children > a' ).on( 'touchstart.fotografie', function( e ) {
                    var el = $( this ).parent( 'li' );

                    if ( ! el.hasClass( 'focus' ) ) {
                        e.preventDefault();
                        el.toggleClass( 'focus' );
                        el.siblings( '.focus' ).removeClass( 'focus' );
                    }
                } );
            } else {
                siteNavigation.find( '.menu-item-has-children > a' ).unbind( 'touchstart.fotografie' );
            }
        }

        if ( 'ontouchstart' in window ) {
            $( window ).on( 'resize.fotografie', toggleFocusClassTouchScreen );
            toggleFocusClassTouchScreen();
        }

        siteNavigation.find( 'a' ).on( 'focus.fotografie blur.fotografie', function() {
            $( this ).parents( '.menu-item' ).toggleClass( 'focus' );
        } );
    })();

    $('.main-navigation button.dropdown-toggle').click(function() {
        $(this).toggleClass('active');
        $(this).parent().find('.children, .sub-menu').first().slideToggle();
    });
    //Primary Menu End

/*  -----------------------------------------------------------------------------------------------
    Smooth Scroll
--------------------------------------------------------------------------------------------------- */

demo.smoothScroll = {

    init: function() {
        // Scroll to anchor
        this.scrollToAnchor();

        // Scroll to element
        this.scrollToElement();
    },

    // Scroll to anchor
    scrollToAnchor: function() {
        var anchorElements = document.querySelectorAll( 'a[href*="#"]' );
        var anchorElementsList = Array.prototype.slice.call( anchorElements );
        anchorElementsList.filter( function( element ) {
            if ( element.href === '#' || element.href === '#0' || element.id === 'cancel-comment-reply-link' || element.classList.contains( 'do-not-scroll' ) || element.classList.contains( 'skip-link' ) ) {
                return false;
            }
            return true;
        } ).forEach( function( element ) {
            element.addEventListener( 'click', function( event ) {
                var target, scrollOffset, originalOffset, adminBar, scrollSpeed, additionalOffset;

                // On-page links
                if ( window.location.hostname === event.target.hostname ) {
                    // Figure out element to scroll to
                    target = window.location.hash !== '' && document.querySelector( window.location.hash );
                    target = target ? target : event.target.hash !== '' && document.querySelector( event.target.hash );

                    // Does a scroll target exist?
                    if ( target ) {
                        // Only prevent default if animation is actually gonna happen
                        event.preventDefault();

                        // Get options
                        additionalOffset = event.target.dataset.additionalOffset;
                        scrollSpeed = event.target.dataset.scrollSpeed ? event.target.dataset.scrollSpeed : 500;

                        // Determine offset

                        adminBar = document.querySelector( '#wpadminbar' );

                        originalOffset = target.getBoundingClientRect().top + window.pageYOffset;
                        scrollOffset = additionalOffset ? originalOffset + additionalOffset : originalOffset;

                        if ( adminBar && event.target.className === 'to-the-top' ) {
                            scrollOffset = scrollOffset - adminBar.getBoundingClientRect().height;
                        }

                        demoScrollTo( scrollOffset, null, scrollSpeed );

                        window.location.hash = event.target.hash.slice( 1 );
                    }
                }
            } );
        } );
    },

    // Scroll to element
    scrollToElement: function() {
        var scrollToElement = document.querySelector( '*[data-scroll-to]' );

        if ( scrollToElement ) {
            scrollToElement.addEventListener( 'click', function( event ) {
                var originalOffset, additionalOffset, scrollOffset, scrollSpeed,
                    // Figure out element to scroll to
                    target = event.target.dataset.demoScrollTo;

                // Make sure said element exists
                if ( target ) {
                    event.preventDefault();

                    // Get options
                    additionalOffset = event.target.dataset.additionalOffset;
                    scrollSpeed = event.target.dataset.scrollSpeed ? event.target.dataset.scrollSpeed : 500;

                    // Determine offset
                    originalOffset = target.getBoundingClientRect().top + window.pageYOffset;
                    scrollOffset = additionalOffset ? originalOffset + additionalOffset : originalOffset;

                    demoScrollTo( scrollOffset, null, scrollSpeed );
                }
            } );
        }
    }

}; // demo.smoothScroll

    function demoScrollTo( to, callback, duration ) {
        var start, change, increment, currentTime;

        function move( amount ) {
            document.documentElement.scrollTop = amount;
            document.body.parentNode.scrollTop = amount;
            document.body.scrollTop = amount;
        }

        start = document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
        change = to - start;
        increment = 20;
        currentTime = 0;

        duration = ( typeof ( duration ) === 'undefined' ) ? 500 : duration;

        function animateScroll() {
            var val;

            // increment the time
            currentTime += increment;
            // find the value with the quadratic in-out demoEaseInOutQuad function
            val = demoEaseInOutQuad( currentTime, start, change, duration );
            // move the document.body
            move( val );
            // do the animation unless its over
            if ( currentTime < duration ) {
                window.requestAnimationFrame( animateScroll );
            } else if ( callback && typeof ( callback ) === 'function' ) {
                // the animation is done so lets callback
                callback();
            }
        }
        animateScroll();
    }


/*------------------------------------------------
            PRELOADER
------------------------------------------------*/

    loader.fadeOut();
    loader_container.fadeOut();

});
