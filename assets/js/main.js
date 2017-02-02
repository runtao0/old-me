/*
	Overflow by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/


(function($) {

	var settings = {

		// Full screen header?
			fullScreenHeader: true,

	};

	skel.breakpoints({
		wide: '(max-width: 1680px)',
		normal: '(max-width: 1080px)',
		narrow: '(max-width: 840px)',
		mobile: '(max-width: 736px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		if (skel.vars.touch) {

			settings.parallax = false;
			$body.addClass('is-scroll');

		}

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on mobile.
			skel.on('+mobile -mobile', function() {
				$.prioritize(
					'.important\\28 mobile\\29',
					skel.breakpoint('mobile').active
				);
			});

		// Full screen header.
			if (settings.fullScreenHeader) {

				var $header = $('#header');
				var $about = $('#about');
				var $first = $('#first');
				var $projects = $('#projects');
				var $skills = $('#skillset');
				var $contact = $('#contact');

				if ($header.length > 0) {

					var $header_header = $header.find('header');

					$window
						.on('resize.overflow_fsh', function() {

							// if (skel.breakpoint('mobile').active) {
							// 	$header.css('padding', '');
							// 	$about.css('padding', '');
							// 	$first.css('padding', '');
							// 	$skills.css('padding', '');
							// 	$contact.css('padding', '');
							// }
							// else {
								p = Math.max(10, ($window.height() - $header_header.outerHeight()) / 2.5);
								var bottom = $window.height() - p - $contact.height();
								$header.css('padding', p + 'px 0 ' + bottom + 'px 0');
								$about.css('padding', p + 'px 0 ' + bottom + 'px 0px');
								$projects.css('padding', '0 0 ' + bottom + 'px 0px');
								$skills.css('padding', '50px 0 ' + bottom + 'px 0px');
								$contact.css('padding', '50px 0 ' + bottom + 'px 0px');
							// }

						})
						.trigger('resize.overflow_fsh');

					$window.load(function() {
						$window.trigger('resize.overflow_fsh');
					});

				}

			}

			$(document).ready(function() {
				$(".buttonprojects").on("click", function( e ) {

					e.preventDefault();
					var coord = ($( $("#projects") ).offset().top - p)
					$("body, html").animate({
						scrollTop: coord
					}, 400);

				});
				$(".buttonabout").on("click", function( e ) {

					e.preventDefault();
					var coord = ($( $("#about") ).offset().top - p)
					$("body, html").animate({
						scrollTop: coord
					}, 400);

				});
				$(".buttonskillset").on("click", function( e ) {

					e.preventDefault();
					var coord = ($( $("#skillset") ).offset().top - p + 50)
					$("body, html").animate({
						scrollTop: coord
					}, 400);

				});
				$(".buttoncontact").on("click", function( e ) {

					e.preventDefault();
					var coord = ($( $("#contact") ).offset().top - p +50)
					$("body, html").animate({
						scrollTop: coord
					}, 400);

				});
			});


		// Poptrox.
			$('.gallery').poptrox({
				useBodyOverflow: false,
				usePopupEasyClose: false,
				overlayColor: '#0a1919',
				overlayOpacity: (skel.vars.IEVersion < 9 ? 0 : 0.75),
				usePopupDefaultStyling: false,
				usePopupCaption: true,
				popupLoaderText: '',
				windowMargin: 10,
				usePopupNav: true
			});

	});

})(jQuery);
