// 获取页面元素
var container = document.getElementById("container");
var ul = container.children[0];
var ol = container.children[1];
var arrow = document.getElementById("arrow");
var prev = arrow.children[0];
var next = arrow.children[1];
var lisUl = ul.children;

// 获取container的宽度（等于图片宽）
var imgWidth = container.offsetWidth;

// 根据图片数量创建小方块
for (var i = 0; i < lisUl.length; i++) {
	var li = document.createElement("li");
	ol.appendChild(li);
	li.innerHTML = i + 1;
}

// 设置第一个小方块默认选中
var lisOl = ol.children;
lisOl[0].className = "current";

// 设置小方块点击变色
for (var i = 0; i < lisOl.length; i++) {
	// 设置小方块的索引值
	lisOl[i].index = i;
	// 为每个小方块添加点击事件
	lisOl[i].onclick = function() {
		// 判断ul当前的left值，若当前显示的是假的第一张，需要让ul回到真的第一张，防止滚动
		if (ul.offsetLeft == -(ul.offsetWidth - imgWidth)) {
			ul.style.left = 0;
		}
		// 清除所有小方块的选中状态
		for (var j = 0; j < lisOl.length; j++) {
			lisOl[j].className = "";
		}
		// 设置当前小方块的选中状态
		this.className = "current";
		// ul动画
		var target = -this.index * imgWidth;
		animate(ul, target);
		// 设置img的值
		img = this.index;
	};
}

// 克隆第一张图片，放到最后，当作假的第一张
var virtual = lisUl[0].cloneNode(true);
ul.appendChild(virtual);

// 存储滚过的图片数量
var img = 0;

// 点击next
next.onclick = play;

// 点击prev
prev.onclick = function() {
	// 若img是0，则不能再向左滚动，ul需要显示假的第一张
	if (img == 0) {
		ul.style.left = -(ul.offsetWidth - imgWidth) + "px";
		img = lisUl.length - 1;
	}
	img--;
	// 让ul滚动到指定位置
	var target = -img * imgWidth;
	// ul动画
	animate(ul, target);
	// 清除所有小方块的选中状态
	for (var i = 0; i < lisOl.length; i++) {
		lisOl[i].className = "";
	}
	// 设置当前小方块的选中状态
	lisOl[img].className = "current";
};

// 设置自动播放
var timer = setInterval(play, 2000);

// 设置鼠标移入盒子，显示左、右箭头，让自动播放停止
container.onmouseover = function() {
	arrow.style.display = "block";
	clearInterval(timer);
};
// 设置鼠标移出盒子，隐藏左、右箭头，重新设置自动播放
container.onmouseout = function() {
	arrow.style.display = "none";
	timer = setInterval(play, 2000);
};

// 自动播放
function play() {
	// 若img已经是假的第一张，需要回到真的第一张
	if (img == lisUl.length - 1) {
		ul.style.left = 0 + "px";
		img = 0;
	}
	img++;
	// 让ul滚动到指定位置
	var target = -img * imgWidth;
	// ul动画
	animate(ul, target);
	// 清除所有小方块的选中状态
	for (var i = 0; i < lisOl.length; i++) {
		lisOl[i].className = "";
	}
	// 如果当前是假的第一张，需要让第一个按钮点亮
	if (img == lisUl.length - 1) {
		lisOl[0].className = "current";
	} else {
		// 设置当前图片对应的小方块的选中状态
		lisOl[img].className = "current";
	}
}

// 动画设置
function animate(ele, target) {
	clearInterval(ele.timer);
	ele.timer = setInterval(function() {
		// 获取ele的当前位置
		var cur = ele.offsetLeft;
		var step = (target - cur) / 10;
		step = step > 0 ? Math.ceil(step) : Math.floor(step);
		cur = cur + step;
		// 设置ele的新位置left
		ele.style.left = cur + "px";
		// 若left值达到目标，则清除定时器
		if (cur == target) {
			clearInterval(ele.timer);
		}
	}, 20);
}