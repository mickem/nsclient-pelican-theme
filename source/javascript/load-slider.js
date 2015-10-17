function configureSlider() {
	jQuery(document).ready(function ($) {
		var options = {
			$AutoPlay: true,
			$AutoPlayInterval: 2000,
			$ArrowKeyNavigation: true,
			$SlideEasing: $JssorEasing$.$EaseOutQuint,
			$SlideDuration: 800,
			$ArrowNavigatorOptions: {
				$Class: $JssorArrowNavigator$,
				$ChanceToShow: 2,
				$AutoCenter: 2,
				$Steps: 1,
				$Scale: false
			},
			$BulletNavigatorOptions: {
				$Class: $JssorBulletNavigator$,
				$ChanceToShow: 2,
				$AutoCenter: 1,
				$Steps: 1,
				$Lanes: 1,
				$SpacingX: 12,
				$SpacingY: 4,
				$Orientation: 1,
				$Scale: false
			}
		};
		$("#slider1_container").css("display", "block");
		var jssor_slider1 = new $JssorSlider$("slider1_container", options);

		function ScaleSlider() {
			var bodyWidth = document.body.clientWidth;
			if (bodyWidth)
				jssor_slider1.$ScaleWidth(Math.min(bodyWidth, 1920));
			else
				window.setTimeout(ScaleSlider, 30);
		}
		ScaleSlider();

		$(window).bind("load", ScaleSlider);
		$(window).bind("resize", ScaleSlider);
		$(window).bind("orientationchange", ScaleSlider);
	});
}
