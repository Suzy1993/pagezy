var small_area = document.getElementById('small_area');
var magnifier = document.getElementById("magnifier");
var big_area = document.getElementById('big_area');
var big = document.getElementById("big");

// 鼠标移入，放大镜和放大区显示
small_area.onmouseover = function() {
	magnifier.style.display = "block";
	big_area.style.display = "block";
}

// 鼠标移动，实时更新可视区域
small_area.onmousemove = function(event) {
	magnifierMove(magnifier, small_area, event);
	show_big_view();
}

// 鼠标移出，放大镜和放大区隐藏
small_area.onmouseout = function() {
	magnifier.style.display = "none";
	big_area.style.display = "none";
}  

// 由于offset方法包括边框，在使用时容易出现问题，通过getStyle来实时获取attr
function getStyle(obj, attr) {
	if (window.currentStyle) {
		return parseInt(obj.currentStyle[attr]);
	} else {
		return parseInt(getComputedStyle(obj,null)[attr]);
	}
}

// 控制放大镜在原图中的位置
function magnifierMove(magnifier, small_area, event) {
	var e = event ||window.event;
	var minLeft = getStyle(magnifier, "width");
	var maxLeft = getStyle(small_area, "width") - minLeft / 2;
	var minTop = getStyle(magnifier, "height");
	var maxHeight = getStyle(small_area, "height") - minTop / 2;
	if (e.clientX < minLeft / 2) {
		magnifier.style.left = "0px"; // 防止放大镜超出左边框
	} else if (e.clientX > maxLeft) {
		magnifier.style.left = getStyle(small_area, "width") - getStyle(magnifier, "width") + "px"; // 防止放大镜超出右边框
	} else {
		magnifier.style.left = event.clientX - minLeft / 2 + "px"; // 放大镜完全在图片内时正常移动
	}
	if (e.clientY < minTop / 2) {
		magnifier.style.top = "0px"; // 防止放大镜超出上边框
	} else if (e.clientY > maxHeight) {
		magnifier.style.top = getStyle(small_area, "height") - getStyle(magnifier, "height") + "px"; // 防止放大镜超出下边框
	} else {
		magnifier.style.top = event.clientY - minLeft / 2 + "px"; // 放大镜完全在图片内时正常移动
	}
}

//显示放大镜得到的图片，实时更新可视区域
function show_big_view() {
	var curLeft = getStyle(magnifier, "left");
	var curTop = getStyle(magnifier, "top");
	var small_width_diff = getStyle(small_area, "width") - getStyle(magnifier, "width");
	var big_width_diff = getStyle(big, "width") - getStyle(big_area, "width");    
	var moveWidth = -(curLeft / small_width_diff) * big_width_diff;
	big.style.left = moveWidth + "px";
	var small_height_diff = getStyle(small_area, "height") - getStyle(magnifier, "height");
	var big_height_diff = getStyle(big, "height") - getStyle(big_area, "height");
	var moveHeight = -(curTop / small_height_diff) * big_height_diff;
	big.style.top = moveHeight + "px";
}