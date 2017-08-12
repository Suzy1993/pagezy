var cloud = document.getElementById("cloud");
var lis = document.getElementById("nav").getElementsByTagName("li");
var width = lis[0].offsetWidth;
var initPos = 0;

//给每一个li绑定鼠标经过事件，鼠标经过时调用动画函数让云彩飞过来
for (var i = 0; i < lis.length; i++) {
	(function(i) {
		lis[i].onmouseover = function() {
			animate(cloud, i * width);
		};
	})(i);
	lis[i].onmouseout = function () {
		animate(cloud, initPos);
	}
	lis[i].onclick = function () {
		initPos = this.offsetLeft;
	}
}

function animate(obj, destPos) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var curPos = obj.offsetLeft;
		var step = (destPos - curPos) / 10;
		step = step > 0 ? Math.ceil(step) : Math.floor(step);
		curPos += step;
		if (curPos != destPos) {
			obj.style.left = curPos + "px";
		} else {
			clearInterval(obj.timer);
		}
	}, 10);
}