var items = document.getElementsByClassName("items");
for (var i = 0; i < items.length; i++) {
	items[i].onmouseover = function() {
		if (this.children[1]) {
			this.children[1].style.display = "block";
		}
	};
	items[i].onmouseout = function() {
		if (this.children[1]) {
			this.children[1].style.display = "none";
		}
	};
}
