;/*!/static/js/imgLazyLoad.js*/
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

})(window);
