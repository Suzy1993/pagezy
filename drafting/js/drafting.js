$(document).ready(function() {
	var drafting = false; 
	var offX, offY, mouseX, mouseY, winX, winY, x, y;
	$("#title").mousedown(function(event) {
		event.stopPropagation();
		drafting = true;
	});
	$(document).mousemove(function(event) {
		event.stopPropagation();
		var e = event || window.event;
		mouseX = e.pageX || e.clientX + $(document).scrollLeft();
		mouseY = e.pageY || e.clientY + $(document).scrollTop();
		winX = $("#box").offset().left - $(document).scrollLeft();
		winY = $("#box").offset().top - $(document).scrollTop();
		if (drafting == false) {
			offX = mouseX-winX;
			offY = mouseY-winY;
		}
		x = mouseX - offX;
		y = mouseY - offY;
		$("#box").css({'left': x, 'top': y});
	});
	$(document).mouseup(function(event) {
		event.stopPropagation();
		drafting = false;
	});	
});




