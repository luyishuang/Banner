var $lunbo = (function () {
    var imgList = ["img/b5.png", "img/b1.png", "img/b2.png", "img/b3.png", "img/b4.png", "img/b5.png", "img/b1.png"];
    function show(conf) {
    // this.show = function (conf) {
        //添加slide
        var $slider = $("<div class='slider' id='slider'></div>");
        $("#box").append($slider);

        //添加图片
        for (var i = 0; i < imgList.length; i++) {
            var $imgDiv = $("<div class='slide'><img src=" + imgList[i] + " alt=''></div>");
            $("#slider").append($imgDiv);
        }

        //添加span
        var $left = $("<span id='left'><</span>");
        var $right = $("<span id='right'>></span>");
        $("#box").append($left);
        $("#box").append($right);

        //添加nav
        var $navUl = $("<ul class='nav' id='navs'></ul>");
        $("#box").append($navUl);
        for (var i = 0; i < 5; i++) {
            var $li = $("<li>" + (i + 1) + "</li>");
            if (i == 0) {
                $($li[i]).addClass("active");
            }
            $("#navs").append($li);
        }

        var $box = $('#box'),
            slider = $('#slider').get(0),
            $nav = $('#navs').children(),
            imgIndex = 1,
            timer;

        //滑上显示按钮
        $box.mouseover(function () {
            clearInterval(timer);
            $left.css({
                opacity: 0.6,
            })
            $right.css({
                opacity: 0.6,
            })
        })

        //滑出按钮消失
        $box.mouseout(function () {
            timer = setInterval(nextImage, 3000);
            $left.css({
                opacity: 0,
            })
            $right.css({
                opacity: 0,
            })
        })

        //点击每一个li切换图片
        for (var i = 0; i < $nav.length; i ++) {
            (function (i) {
                $($nav[i]).click(function () {
                    imgIndex = i + 1;
                    activeNav();
                    move({left: imgIndex * (-1200)},null);
                })
            })(i);
        }

        //切换到前一张图片
        function prevImage() {
            imgIndex --;
            activeNav();
            move({left: imgIndex * (-1200)},
            function () {
                if (imgIndex === 0) {
                    slider.style.left = '-6000px';
                    imgIndex = 5;
                }
            });
        }

        //切换到下一张图片
        function nextImage() {
            imgIndex ++;
            activeNav();
            move({left: imgIndex * (-1200)},
            function () {
                if (imgIndex === 6) {
                    slider.style.left = '-1200px';
                    imgIndex = 1;
                }
            });
        }

        //点击按钮切换图片
        $left.click(function () { 
            prevImage();
        });
        $right.click(function () { 
            nextImage();
        });

        //activeNav
        function activeNav() {
            for (var i = 0; i < $nav.length; i ++) {
                $($nav[i]).removeClass("active");
            }
            if (imgIndex > 5) {
                $($nav[0]).addClass("active");
            }
            else if (imgIndex <= 0) {
                $($nav[4]).addClass("active");
            }
            else {
                $($nav[imgIndex - 1]).addClass("active");
            }
        }

        //getStyle 得到现在的left 带px
        function getStyle(slider,attr){ 
            if(slider.currentStyle){
                return slider.currentStyle[attr];
            }
            else{
                return getComputedStyle(slider,false)[attr];
            }
        }

        //滑动函数
        function move(yangshi, callback) {
            var timer = slider.timer;
            clearInterval(timer);
            timer = setInterval(function () {
                var stopping = true;
                for (var left in yangshi) {
                    var oldValue = parseInt(getStyle(slider, left));
                    var speed = (yangshi[left] - oldValue) / 10;
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                    var newValue = oldValue + speed;
                    slider.style[left] = newValue + 'px';
                    if (yangshi[left] !== newValue) {
                        stopping = false;
                    }
                }
                if (stopping) {
                    clearInterval(timer);
                    callback && callback();
                }
            }, 25)
        }

        //自动轮播
        timer = setInterval(nextImage, 3000);
    }
    return {
        show: show
    };
}());