/**加载头部底部**/
	$(function(){   
	      $('#header').load('data/header.php');
	      $('#footer').load('data/footer.php');
	 	    });

  /**导航条切换**/
  $('.navbar .left a').click(function(e){
    e.preventDefault();
    $(this).parent().addClass('active')
    .siblings('.active').removeClass('active');
  });

/**用户登录按钮**/  
$('#header').on('click','button',function(){
  $('.modal').show()
});

/**异步用户验证**/	
var loginUname = null;  
$('#bt-login').click(function(){
  var data = $('#login-form').serialize();
  $.ajax({
    type: 'POST',
    url:'data/user_login.php',
    data: data,
    success: function(result){
      if(result.code!==1){  
        $('p.alert').html(result.msg);
        return;
      }
      $('.modal').hide();
      loginUname = result.uname; 
      $('#btn').html('欢迎回来：'+loginUname);
    },
    error: function(){ 
      alert('响应完成但有问题');
      console.log(arguments);
    }
  });
});

/**轮播广告**/
var imgs=[
  {"i":0,"img":"img/pic1.jpg"},
  {"i":1,"img":"img/pic2.jpg"},
  {"i":2,"img":"img/pic3.jpg"},
  {"i":3,"img":"img/pic4.jpg"},
];
var adv={
  LIWIDTH:0,
  $ulImgs:null,
  INTERVAL:1000,
  WAIT:3000,
  timer:null,
  // 初始化
  init(){
    this.LIWIDTH=parseFloat(
      $("#carousel").css("width")
    );
    this.$ulImgs=$("#images");
    this.updateView();
   
    $("#indicator").on("mouseover","li",(e)=>{ 
      var target=$("#indicator>li").index(e.target);
      var old=imgs[0].i;
      this.move(target-old);
    });
    this.autoMove();
  },
  //启动自动轮播
  autoMove(){
    this.timer=setTimeout(
      ()=>this.move(1),this.WAIT
    );
  },
  //右移前的准备
  movePrev(n){
    n*=-1;
    imgs=imgs.splice(-n,n).concat(imgs)
    this.updateView();
    this.$ulImgs.css("left",
      parseFloat(this.$ulImgs.css("left"))
      -n*this.LIWIDTH
    );
  },
  move(n){
    clearTimeout(this.timer);
    if(n<0){
      this.movePrev(n);
      this.$ulImgs.stop(true).animate(
        {left:0}, 
        this.INTERVAL, 
        ()=>this.autoMove()
      );
    }else{
      this.$ulImgs.stop(true).animate(
        {left:-n*this.LIWIDTH},
        this.INTERVAL,
        ()=>this.moveCallback(n)
      );
    }
  },
  //左移结束的回调函数
  moveCallback(n){
    imgs=imgs.concat(imgs.splice(0,n));
    this.updateView();
    this.$ulImgs.css("left",0);
    this.autoMove();
  },
  //将imgs数组中的内容更新到页面
  updateView(){
    for(var i=0,lis="",idxs="";
        i<imgs.length;
        i++){
      lis+=`<li><img src="${imgs[i].img}"></li>`
      idxs+="<li></li>"
    }
    this.$ulImgs.html(lis).css(
      "width",imgs.length*this.LIWIDTH);
    $("#indicator").html(idxs)
      .children(`li:eq(${imgs[0].i})`)
        .addClass("hover");
  }
}
adv.init();

