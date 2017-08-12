window.onload = function() {
    fall("myFall", 6, 200, 30); // 栏目数，每一栏的宽度，图片的间距是用户输入的参数
};

// fallId表示实现瀑布布局的<ul>的id，cols表示栏目数，colWidth表示每一栏的宽度，margin表示图片的间距
function fall(fallId, cols, colWidth, margin) {
    var liArr = []; // liArr数组存放的是每一栏的当前高度，liArr数组的长度为cols
    var fall = document.getElementById(fallId);
    var lis = fall.getElementsByTagName("li");
    var imgs = document.getElementsByTagName("img");
    for (var i = 0; i < imgs.length; i++) {
        lis[i].style.width = colWidth + "px"; // 设置li的宽度为每一栏的宽度
        imgs[i].style.width = colWidth - margin + "px"; // 设置图片的宽度为每一栏的宽度减去图片的间距
        imgs[i].style.margin = margin / 2 + "px"; // 设置图片的外边距为图片间距的一半，以实现指定的图片间距
		console.log(imgs[i].style.margin);
    }
    for (var i = 0; i < lis.length; i++) { //遍历所有li
        if (i < cols) { // 对前cols个li，排列在第一行，其高度为该栏的当前高度
            liArr[i] = lis[i].scrollHeight;
            // 设置该栏该元素的左边距和上边距
            lis[i].style.left = i * colWidth + "px";
            lis[i].style.top = "0px";
        }
        else { // 对随后的每一个li，每次添加时，都将其放在高度最小的一栏，以保证每一栏的高度尽可能相近。
            // 查找高度最小的一栏，用min记录当前的最小高度，index记录最小高度的栏所对应的索引
            var min = liArr[0], index = 0;
            for (var j = 1; j < liArr.length; j++) {
                if (min > liArr[j]) {
                	min = liArr[j];
                    index = j;
                }
            }
            // 更新最小高度的栏的新高度：最小高度+该li的高度
            liArr[index] = min + lis[i].scrollHeight;
            // 设置该栏该元素的左边距和上边距
            lis[i].style.left = index * colWidth + "px";
            lis[i].style.top = min + "px";
        }
    }
	console.log(imgs[0].style.margin);
}

// 滚动条滚动到页面底部自动加载图片，每次随机加载6张图片
window.onscroll = function() {
	// document.body.*是为了适应IE8
	var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
	var scrollH = document.documentElement.scrollHeight || document.body.scrollHeight;
	var clientH = document.documentElement.clientHeight || document.body.clientHeight;
	var ul = document.getElementById("myFall");
	if(scrollT == scrollH - clientH){
		for (var i = 0; i < 6; i++) {
			var index = Math.ceil(Math.random() * 18);
			var img = document.createElement("img");
			img.setAttribute("src", "images/img" + index + ".jpg");
			var li = document.createElement("li");
			li.appendChild(img);
			ul.appendChild(li);
		}
		fall("myFall", 6, 200, 30);
	}
}