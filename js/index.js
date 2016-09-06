;/*!/static/js/index.js*/
(function(window, undifined) {
  var carousel = document.querySelectorAll('.s_wrap')[0];

  var dview = (function(){
    var touchStartX = 0,
      touchStartY = 0,
      gapX = 0,
      gapY = 0,
      disArr = 0;


    /**
     * 获取鼠标坐标，设置跟随动画变换
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    function onMouseDown(event) {
      console.log(event);
      touchStartX = event.touches[0].pageX;
      touchStartY = event.touches[0].pageY;
    }

    function onMouseMove(event) {
      // 计算差值
      gapX = parseInt(event.touches[0].pageX - touchStartX);
      gapY = event.touches[0].pageY - touchStartY;

      console.log(gapX);
      // 重新赋值
      // touchStartX = event.touches[0].pageX;
      // touchStartY = event.touches[0].pageY;

      // var reg = /rotateY\((\d+)deg\)/i,
      //   styleString = carousel.style.transform.toString(),
      //   oldNum = styleString.match(reg);

      var rotateY = disArr + gapX;

      disArr += gapX;

      console.log('rotateY',rotateY);

      carousel.style.transform = "translate3d(0, 346px, 742px) rotateX(-19deg) rotateY("+ rotateY +"deg) rotateZ(0deg) scale3d(1, 1, 1)"
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

      // 绑定鼠标跟随事件
      window.addEventListener("touchstart", onMouseDown, false);
      window.addEventListener("touchmove", onMouseMove, false);

    }
    return{
      init:function(){
        carousel.style.transform = "translate3d(0, 346px, 742px) rotateX(-19deg) rotateY(0deg) rotateZ(0deg) scale3d(1, 1, 1)";
        stageMove();
      }
    }
  })();

  // dview.init();
})(window);
