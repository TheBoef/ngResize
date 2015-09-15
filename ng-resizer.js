angular.module('ngResizer', []).directive('resizer', function($document) {

	return function($scope, $element, $attrs) {

		$element.on('mousedown', function(event) {
			event.preventDefault();

			$document.on('mousemove', mousemove);
			$document.on('mouseup', mouseup);
		});

		function mousemove(event) {
			
			// Vertical Resizer
			if ($attrs.resizer == 'vertical') {
				var x = event.pageX;
				
				// Right Side Alignment
				if($attrs.resizerVertialAlign == 'right') {
					
					var minWidth = window.innerWidth - $attrs.resizerMin;
					var maxWidth = window.innerWidth - $attrs.resizerMax;
					
					if (maxWidth && x < maxWidth) {
						x = parseInt($attrs.resizerMax);
					} else if (minWidth && x > minWidth) {
						x = parseInt($attrs.resizerMin);
					} else {
						x = parseInt(window.innerWidth - x);
					}
					
					$element.css({
						right: x + 'px'
					});
					
					$($attrs.resizerLeft).css({
						right: (x + parseInt($attrs.resizerWidth)) + 'px'
					});
					$($attrs.resizerRight).css({
						width: x + 'px'
					});
				} else {
					// Left Side Alignment
					if ($attrs.resizerMax && x > $attrs.resizerMax) {
						x = parseInt($attrs.resizerMax);
					}
					
					$element.css({
						left: x + 'px'
					});
					
					$($attrs.resizerLeft).css({
						width: x + 'px'
					});
					$($attrs.resizerRight).css({
						left: (x + parseInt($attrs.resizerWidth)) + 'px'
					});
				}
			} else {
				// Horizontal Resizer
				var y = event.pageY;
				// Top Alignment
				if($attrs.resizerHorizontalAlign == 'top') {
					$element.css({
						top: y + 'px'
					});
					
					$($attrs.resizerTop).css({
						height: y + 'px'
					});
					$($attrs.resizerBottom).css({
						top: (y + parseInt($attrs.resizerHeight)) + 'px'
					});
				} else {
					// Bottom alignment
					y = window.innerHeight - event.pageY;
					$element.css({
						bottom: y + 'px'
					});
					
					$($attrs.resizerTop).css({
						bottom: (y + parseInt($attrs.resizerHeight)) + 'px'
					});
					$($attrs.resizerBottom).css({
						height: y + 'px'
					});
				}
				
			}
		}

		function mouseup() {
			$document.unbind('mousemove', mousemove);
			$document.unbind('mouseup', mouseup);
		}
	};
});