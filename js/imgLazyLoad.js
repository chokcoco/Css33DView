;/*!/static/js/imgLazyLoad.js*/
<<<<<<< HEAD
(function(window, undifined) {
  var carousel = document.querySelectorAll('.wrap')[0];

  var dview = (function(){
    /**
     * 获取鼠标坐标，设置跟随动画变换
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    function onMouseMove(event) {
      // console.log('event.pageX '+event.pageX);
      // console.log('event.pageY '+event.pageY);
      // console.log('window.innerWidth '+window.innerWidth);
      // console.log('window.innerHeight '+window.innerHeight);
      // console.log('mouseX '+mouseX);
      // console.log('mouseY '+mouseY);
      // console.log('mouseZ '+mouseZ);
      mouseX = -(-(window.innerWidth * .5) + event.pageX) * .0010;
      mouseY = -(-(window.innerHeight * .5) + event.pageY) * .05;
      mouseZ = -(radius) - (Math.abs(-(window.innerHeight * .5) + event.pageY)-100);
      // mouseZ = - (Math.abs(mouseY) * 300 - 200);
    }

    /**
     * 容器变换
     * @return {[type]} [description]
     */
    function looper() {
      // var randomY = getRandomNum(20)

      addX += mouseX;

      // TweenMax.to(target,duration,variables)
      // 让物体的属性从你声明这个方法时的状态变到任何你设定的效果
      // target:Object ：你想要实现动画的目标物体
      // duration:Number ：整个过程的时间
      // variables:Object ：一个包括最终的所有你想得到的属性
      TweenMax.to(carousel, 1, {
        rotationY: addX,
        rotationX: mouseY,
        ease: Quint.easeOut
      });

      // 设置远近景
      TweenMax.set(carousel, {
        z: mouseZ
      });
    }

    // 舞台缓动
    function stageMove() {
      var stageWidth = carousel.offsetWidth,
        itemLength = 20;

      // 角度设置
      radius = Math.round( (250) / Math.tan( Math.PI / itemLength ) );

      // 绑定鼠标跟随事件
      window.addEventListener("mousemove", onMouseMove, false);
      ticker = setInterval( looper, 1000/60 );
    }
    return{
      init:function(){
        stageMove();
      }
    }
  })();

=======
;/*!/static/js/index.js*/
/**
 * @author Coco
 * QQ:308695699
 * @name  imgLazyLoad 1.0.0
 * @description 原生JS实现的图片懒加载插件，默认加载首屏图片，实现了滚动防抖(250ms)
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 1、给需要懒加载的 img 图片添加 imgLazyLoad 类名
 *
 * 2、图片真正的 src 放置于 data-original 标签内
 *
 * 3、初始化方法 imgLazyLoad();
 *
 * 4、动态添加的图片也需要懒加载 , arr 为动态添加的图片数组的DOM对象
 *    var lazyLoad = new imgLazyLoad();
 *    lazyLoad.dynamic(arr);
 *
 * 5、兼容性：ALL
 *
 */
(function(window, undifined) {
  var
  // 需要 lazyload 的 img 元素集合
    lazyImgs = [],
    // lazyload img 的长度
    imgLength = 0,
    // 视口高度
    innerHeight = window.innerHeight || document.documentElement.clientHeight,
    // 节流阀
    lazyLoadTimerId = null,
    // 初始化方法
    imgLazyLoad = function() {
      return imgLazyLoad.prototype.init();
    }

  /**
   * 设置图片距离页面顶部的距离
   * @param {[Array]} dynamicArr [传入arr表示只设置传入的数组当中的图片]
   */
  function setOffSetTop(dynamicArr) {
    var k = 0,
      // 参数长度
      argLength = arguments.length;

    // 未传参
    if(argLength == 0){
      // 取到所有 class 为 imgLazyLoad 的标签
      if (document.querySelectorAll) {
        lazyImgs = document.querySelectorAll('.imgLazyLoad');
        // 兼容 IE7/8
      } else {
        var imgs = document.getElementsByTagName('img'),
          length = imgs.length,
          i = 0,
          regExp = /^imgLazyLoad$/;

        for (; i < length; i++) {
          var elem = imgs[i],
            // getAttribute('class') 在 IE67 下表现为 getAttribute('className')
            classNames = elem.getAttribute('className'),
            arr = classNames.split(" "),
            classLength = arr.length,
            j = 0;

          for (; j < classLength; j++) {
            if (regExp.test(arr[j])) {
              lazyImgs.push(elem);
              break;
            }
          }
        }
      }
    }else{
      var arrLength = dynamicArr.length,
        t = 0;

      // 兼容 IE8-
      if(browser.msie && (browser.version==8 || browser.version==7)){
        // IE8- 下使用 Array.prototype.slice.call 会报错，用下面这个方法解决
        lazyImgs = Array.prototype.concat.apply([],lazyImgs).slice(0);
      }else{
        lazyImgs = Array.prototype.slice.call(lazyImgs);
      }

      for(; t<arrLength; t++){
        var newElem = dynamicArr[t];

        lazyImgs.push(newElem);
      }
    }

    imgLength = lazyImgs.length;

    for (; k < imgLength; k++) {
      var curElem = lazyImgs[k];

      // 是否已经设置了 data-offsetTop
      if(curElem.getAttribute('data-offsetTop') == null){
        var top = curElem.getBoundingClientRect().top;

        lazyImgs[k].setAttribute('data-offsetTop', top);
        lazyImgs[k].setAttribute('isShow', '0');
      }else{
        continue;
      }
    }
  }

  // 判断图片是否显示
  function isShow(scrollTop) {

    var scrollTop = scrollTop || 0,
      i = 0;

    for (; i < imgLength; i++) {
      var elem = lazyImgs[i],
        isShow = elem.getAttribute('isShow'),
        top = elem.getAttribute('data-offsetTop') - scrollTop;

      if (isShow == '1') {
        continue;
      }

      if (top < innerHeight) {
        var imgSrc = elem.getAttribute('data-original');

        elem.setAttribute('src', imgSrc);
        elem.setAttribute('isShow', '1');
      }
    }
  }

  // 设置滚动监听
  // 滚动节流阀
  function scrollThrottle() {
    if (window.addEventListener) {
      window.addEventListener("scroll", srcollSetTimeout, false);
    } else {
      window.attachEvent("onscroll", srcollSetTimeout);
    }

  }

  // 节流函数
  // 250ms 触发一次
  function srcollSetTimeout() {
    clearTimeout(lazyLoadTimerId);

    lazyLoadTimerId = setTimeout(function() {
      var scrollTop = getScrollTop();
      isShow(scrollTop);
    }, 250);
  }


  // 获取滚动条距离顶端的距离
  // 支持 IE6+
  function getScrollTop() {
    var scrollPos;
    if (window.pageYOffset) {
      scrollPos = window.pageYOffset;
    } else if (document.compatMode && document.compatMode != 'BackCompat') {
      scrollPos = document.documentElement.scrollTop;
    } else if (document.body) {
      scrollPos = document.body.scrollTop;
    }
    return scrollPos;
  }

  // 判断 IE678
  var browser = (function() {
    var isIE6 = /msie 6/i.test(navigator.userAgent);
    var isIE7 = /msie 7/i.test(navigator.userAgent);
    var isIE8 = /msie 8/i.test(navigator.userAgent);
    var isIE = /msie/i.test(navigator.userAgent);
    return {
      msie: isIE,
      version: function() {
        switch (true) {
          case isIE6:
            return 6;
          case isIE7:
            return 7;
          case isIE8:
            return 8;
        }
      }()
    };
  })();

  // 初始化方法
  imgLazyLoad.prototype.init = function() {
    setOffSetTop();
    isShow();
    scrollThrottle();
  }

  // 动态添加新图片结点
  imgLazyLoad.prototype.dynamic = function(arr){
    setOffSetTop(arr);
    isShow();
  }

  // 暴露对象
  window.imgLazyLoad = imgLazyLoad;
>>>>>>> ce7449fc25fc73918cda937a8562dd8a782fb788
})(window);
