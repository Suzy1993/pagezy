$(".img").on("mouseover", function() {
	var index = $(this).attr("id").slice(3) - '0';
	for (var i = 1; i <= index; i++) {
		$("#img" + i).animate({left: (i - 1) * 100 + "px"}, 1000);
	}
	for (var i = index + 1; i <= 5; i++) {
		$("#img" + i).animate({left: 1200 - (6 - i) * 100 + "px"}, 1000);
	}
});