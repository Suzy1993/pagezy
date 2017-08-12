function random_color() {
	var color = "#";
	var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
	for (var i = 0; i < 6; i++) {
		var index = Math.floor(Math.random() * 16);
		color += hex[index];
	}
	return color;
}

var circle = document.getElementsByClassName('circle');

for (var i = 0; i < circle.length; i++) {
	circle[i].style.backgroundColor = random_color();
}

for (var i = 0; i < circle.length; i++) {
	circle[i].onmouseover = function() {
		this.style.backgroundColor = random_color();
	}
}