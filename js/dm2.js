 $(document).ready(function() {
     var maxtop = $(".lay2").height();
     var dmtop = 0;
     var movedm = function(obj) { //移动弹幕
         var dmleft = $(".lay2").width() - obj.width();
         var dmtime = 10000 + 10000 * Math.random(); //移动快慢不同
         dmtop += 40; //每条弹幕高40
         if (dmtop >= maxtop) {
             dmtop = 0;
         }
         obj.css({
             "left": dmleft + "px",
             "top": dmtop + "px",
             "color": dmcolor()
         });

         obj.animate({
             left: -dmleft
         }, dmtime, function() {
             obj.remove();
         });

     };
     var dmcolor = function() { //生成随机颜色
         return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
     };
     var automove = function() { //随机播放弹幕
         if (arr.length > 0) {
             var n = Math.floor(Math.random() * arr.length);
             var text = arr[n];
             var dmHtml = $("<div>" + text + "</div>");
             $(".lay2").append(dmHtml);
             movedm(dmHtml);

         }
         setTimeout(automove, 3000);
     };
     var ref = new Wilddog("https://justgo.wilddogio.com/");
     var arr = [];
     $(".text-send").click(function() {
         var $text = $(".send input").val();
         ref.child('dm').push($text); //上传数据
         $(".send input").val(""); //置空输入框
     });
     $(".send input").keypress(function(e) {
         if (e.keyCode == "13") { //回车响应
             $(".text-send").trigger("click");
         }
     });
     $(".text-clear").click(function() {
         ref.child("dm").remove(); //清除服务端弹幕数据
         arr = [];
         $(".lay2").empty(); //清除屏幕
     });
     ref.child("dm").on("child_added", function(e) { //服务端添加数据
         var text = e.val();
         arr.push(text); //存储刚刚发射的弹幕
         var dmHtml = $("<div>" + text + "</div>");
         $(".lay2").append(dmHtml); //显示弹幕
         movedm(dmHtml); //移动弹幕函数
     });
     // ref.on("child_removed",function(){//服务端删除数据
     //   arr = [];//
     //   $(".lay2").empty();//清空弹幕
     // });
     jQuery.fx.interval = 50; //降帧
     automove(); //自动循环弹幕
 });