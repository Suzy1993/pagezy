// 规定每张图片的大小、位置、透明度、层级
var config = [
	{
		width: 600,
		top: 70,
		left: 0,
		opacity: 0.8,
		zIndex: 3
	},
	{
		width: 700,
		top: 100,
		left: 200,
		opacity: 1,
		zIndex: 4
	},
	{
		width: 600,
		top: 70,
		left: 600,
		opacity: 0.8,
		zIndex: 3
	},
	{
		width: 400,
		top: 20,
		left: 750,
		opacity: 0.5,
		zIndex: 2
	},
	{
		width: 400,
		top: 20,
		left: 50,
		opacity: 0.5,
		zIndex: 2
	}
];

// 获取页面元素
var slider = document.getElementById("slider");
var ul = slider.children[0];
var lis = ul.children;
var arrow = document.getElementById("arrow");
var prev = arrow.children[0];
var next = arrow.children[1];

// 实现每张图片根据config到相应位置的动画
for (var i = 0; i < lis.length; i++) {
	animate(lis[i], config[i]);
}

// 设置箭头的显示和隐藏
slider.onmouseover = function() {
	animate(arrow, {"opacity": 1});
};
slider.onmouseout = function() {
	animate(arrow, {"opacity": 0});
};

// 标记当前是否可以播放下一张
var flag = true;

// 点击next按钮
next.onclick = function() {
	// flag为true才可以播放下一张
	if (flag) {
		// 动画过程中需要将flag设置为false，防止点击
		flag = false;
		// 更改config，将config的第一个元素添加到最后
		config.push(config.shift());
		// 实现每张图片根据新的config到相应位置的动画
		for (var i = 0; i < lis.length; i++) {
			animate(lis[i], config[i], function() {
				// 动画完毕后将flag设置为true，可以点击
				flag = true;
			});
		}
	}
};

// 点击prev按钮
prev.onclick = function() {
	if (flag) {
		flag = false;
		config.unshift(config.pop());
		for (var i = 0; i < lis.length; i++) {
			animate(lis[i], config[i], function() {
				flag = true;
			});
		}
	}
}

// 动画设置
function animate(ele, props, cb) {
    clearInterval(ele.timer);
    ele.timer = setInterval(function() {
		// flag为true才可以清除定时器和调用回调函数
        var flag = true;
        for (var prop in props) {
            if (prop == "opacity") {
                var cur = getStyle(ele, prop) * 100;
                var target = props[prop] * 100;
                var step = (target - cur) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                ele.style[prop] = (cur + step) / 100;
            } else if (prop == "zIndex") {
                ele.style[prop] = props[prop];
            } else {
                var cur = parseInt(getStyle(ele, prop)) || 0;
                var target = props[prop];
                var step = (target - cur) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                ele.style[prop] = cur + step + "px";
            }
			// 若属性值还未达到目标，不能清除定时器和调用回调函数
            if (cur != target) {
                flag = false;
            }
        }
		// 清除定时器，并调用回调函数
        if (flag) {
            clearInterval(ele.timer);
            if (cb) {
                cb();
            }
        }
    }, 15);
}

// 兼容方法获取元素的样式
function getStyle(ele, attr) {
    if (ele.currentStyle) {
        return ele.currentStyle[attr];
    } 
	return window.getComputedStyle(ele, null)[attr];
}