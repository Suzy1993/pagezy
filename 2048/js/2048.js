var boxMargin = parseFloat($(".box").css("marginLeft"));
var boxSize = $(".box").width();

$(".button").on('click', function(e) {
	e.preventDefault();
	$(".numberBox").remove();
	$("#scoreSpan").text(0);
	generateBox(2);
	generateBox(Math.random() < 0.5 ? 2 : 4);
});

$(document).on("keydown", function(e) {
	e.preventDefault();
    switch (e.keyCode || e.charCode || e.which) {
		case 37:
			var result = right_to_left();
			if (!end_game(result)) {
				generateBox(2);
			}
			break;
		case 38:
			var result = bottom_to_top();
			if (!end_game(result)) {
				generateBox(2);
			}
			break;
		case 39:
			var result = left_to_right();
			if (!end_game(result)) {
				generateBox(2);
			}
			break;
		case 40:
			var result = top_to_bottom();
			if (!end_game(result)) {
				generateBox(2);
			}
			break;
    }
});

function end_game(result) {
	if (result) {
		alert("Congratulations!");
	} else if (game_over()) {
		alert("Game over!");
	} else {
		return false;
	}
	$(".numberBox").remove();
	$("#scoreSpan").text(0);
	return true;
}

function game_over() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if ($("#numberBox" + i + j).length == 0) {
                return false;
			}
		}
	}
    return true;
}

function right_to_left() {
	for (var i = 0; i < 4; i++) {
		var flag = 0;
        for (var j = 1; j < 4; j++) {
			if ($("#numberBox" + i + j).length != 0) {
				for (var k = j - 1; k >= 0; k--) {
					if ($("#numberBox" + i + k).length != 0) {
						break;
					}
				}
				if (k == -1) {
					k++;
					$("#numberBox" + i + j).animate({left: boxMargin + k * (boxMargin + boxSize)}, 100);
					$("#numberBox" + i + j).attr("id", "numberBox" + i + k);
				}
				else if (flag == 1 || $("#numberBox" + i + k).text() != $("#numberBox" + i + j).text()) {
					k++;
					$("#numberBox" + i + j).animate({left: boxMargin + k * (boxMargin + boxSize)}, 100);
					$("#numberBox" + i + j).attr("id", "numberBox" + i + k);
				} else {
					flag = 1;
					var newValue = $("#numberBox" + i + k).text() * 2;
					if (newValue == 2048) {
						return true;
					}
					$("#numberBox" + i + k).remove();
					$("#numberBox" + i + j).animate({left: boxMargin + k * (boxMargin + boxSize)}, 100);
					$("#numberBox" + i + j).text(newValue);
					var newScore = parseInt($("#scoreSpan").text()) + newValue;
					$("#scoreSpan").text(newScore);
					$("#numberBox" + i + j).attr("id", "numberBox" + i + k);
					$("#numberBox" + i + k).css("backgroundColor", mapColor(newValue));
				}
			}
		}
	}
}

function bottom_to_top() {
	for (var j = 0; j < 4; j++) {
		var flag = 0;
        for (var i = 1; i < 4; i++) {
			if ($("#numberBox" + i + j).length != 0) {
				for (var k = i - 1; k >= 0; k--) {
					if ($("#numberBox" + k + j).length != 0) {
						break;
					}
				}
				if (k == -1) {
					k++;
					$("#numberBox" + i + j).animate({top: boxMargin + k * (boxMargin + boxSize)}, 100);
					$("#numberBox" + i + j).attr("id", "numberBox" + k + j);
				}
				else if (flag == 1 || $("#numberBox" + k + j).text() != $("#numberBox" + i + j).text()) {
					k++;
					$("#numberBox" + i + j).animate({top: boxMargin + k * (boxMargin + boxSize)}, 100);
					$("#numberBox" + i + j).attr("id", "numberBox" + k + j);
				} else {
					flag = 1;
					var newValue = $("#numberBox" + k + j).text() * 2;
					if (newValue == 2048) {
						return true;
					}
					$("#numberBox" + k + j).remove();
					$("#numberBox" + i + j).animate({top: boxMargin + k * (boxMargin + boxSize)}, 100);
					$("#numberBox" + i + j).text(newValue);
					var newScore = parseInt($("#scoreSpan").text()) + newValue;
					$("#scoreSpan").text(newScore);
					$("#numberBox" + i + j).attr("id", "numberBox" + k + j);
					$("#numberBox" + k + j).css("backgroundColor", mapColor(newValue));
				}
			}
		}
	}
}

function left_to_right() {
	for (var i = 0; i < 4; i++) {
		var flag = 0;
        for (var j = 2; j >= 0; j--) {
			if ($("#numberBox" + i + j).length != 0) {
				for (var k = j + 1; k < 4; k++) {
					if ($("#numberBox" + i + k).length != 0) {
						break;
					}
				}
				if (k == 4) {
					k--;
					$("#numberBox" + i + j).animate({left: boxMargin + k * (boxMargin + boxSize)}, 100);
					$("#numberBox" + i + j).attr("id", "numberBox" + i + k);
				}
				else if (flag == 1 || $("#numberBox" + i + k).text() != $("#numberBox" + i + j).text()) {
					k--;
					$("#numberBox" + i + j).animate({left: boxMargin + k * (boxMargin + boxSize)}, 100);
					$("#numberBox" + i + j).attr("id", "numberBox" + i + k);
				} else {
					flag = 1;
					var newValue = $("#numberBox" + i + k).text() * 2;
					if (newValue == 2048) {
						return true;
					}
					$("#numberBox" + i + k).remove();
					$("#numberBox" + i + j).animate({left: boxMargin + k * (boxMargin + boxSize)}, 100);
					$("#numberBox" + i + j).text(newValue);
					var newScore = parseInt($("#scoreSpan").text()) + newValue;
					$("#scoreSpan").text(newScore);
					$("#numberBox" + i + j).attr("id", "numberBox" + i + k);
					$("#numberBox" + i + k).css("backgroundColor", mapColor(newValue));
				}
			}
		}
	}
}

function top_to_bottom() {
	for (var j = 0; j < 4; j++) {
		var flag = 0;
        for (var i = 2; i >= 0; i--) {
			if ($("#numberBox" + i + j).length != 0) {
				for (var k = i + 1; k < 4; k++) {
					if ($("#numberBox" + k + j).length != 0) {
						break;
					}
				}
				if (k == 4) {
					k--;
					$("#numberBox" + i + j).animate({top: boxMargin + k * (boxMargin + boxSize)}, 100);
					$("#numberBox" + i + j).attr("id", "numberBox" + k + j);
				}
				else if (flag == 1 || $("#numberBox" + k + j).text() != $("#numberBox" + i + j).text()) {
					k--;
					$("#numberBox" + i + j).animate({top: boxMargin + k * (boxMargin + boxSize)}, 100);
					$("#numberBox" + i + j).attr("id", "numberBox" + k + j);
				} else {
					flag = 1;
					var newValue = $("#numberBox" + k + j).text() * 2;
					if (newValue == 2048) {
						return true;
					}
					$("#numberBox" + k + j).remove();
					$("#numberBox" + i + j).animate({top: boxMargin + k * (boxMargin + boxSize)}, 100);
					$("#numberBox" + i + j).text(newValue);
					var newScore = parseInt($("#scoreSpan").text()) + newValue;
					$("#scoreSpan").text(newScore);
					$("#numberBox" + i + j).attr("id", "numberBox" + k + j);
					$("#numberBox" + k + j).css("backgroundColor", mapColor(newValue));
				}
			}
		}
	}
}

function generateBox(value) {
	while (true) {
		var i = Math.floor(Math.random() * 4);
		var j = Math.floor(Math.random() * 4);
		if ($("#numberBox" + i + j).length == 0) {
			var boxLeft = boxMargin + j * (boxMargin + boxSize);
			var boxTop = boxMargin + i * (boxMargin + boxSize);
			var newBox = $("<div>" + value + "</div>");
			newBox.addClass("numberBox");
			newBox.attr("id", "numberBox" + i + j);
			newBox.css("left", boxLeft);
			newBox.css("top", boxTop);
			newBox.css("lineHeight", boxSize + "px");
			newBox.css("backgroundColor", mapColor(value));
			$("#container").append(newBox);
			break;
		}
	}
}

function mapColor(value) {
	switch (value) {
		case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e3b";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#33b5e5";
            break;
        case 2048:
            return "#09c";
            break;
	}
}