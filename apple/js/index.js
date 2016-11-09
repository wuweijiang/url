$(function(){
    $(window).resize(function () {
        if($(window).width()<=750){
            $(".zt .zt-zi .zt-zi-ul").hide();
            $(".zt .zt-1").click(function(){
                var a=$(this).index();
                $(".zt .zt-1 .zt-zi .zt-zi-ul").eq(a).toggle();
            })
        }else{
            $(".zt .zt-zi .zt-zi-ul").show();
        }
    })
    var w=$(window).width();
    var h=$(window).height();
    $(".nav-lb").hide();
    $(".nav-link").click(function(){
        $(".nav-lb").toggle();
        $(".nav-lb").css({
            width:w,
            height:h
        })
    })

    /*轮播图*/
    var list=$(".list");
    var cw=list[0].offsetWidth;
    list[0].style.left=0;
    for(var i=1;i<list.length;i++){
        list[i].style.left=cw+"px";
    }
    var now=0;
    var next=0;
    var currentTime=0;
    var flag=false;

    var t1=setInterval(move,3000);
    var t2=setInterval(move1,50);
    function move(){
        next++;
        if(next==3){
            next=0;
            flag=false;
        }
        $(".list:eq("+now+")").animate({width:"80%",height:"80%"}).css("zIndex",0);
        $(".list:eq("+next+")").animate({left:0},function(){
            $(".list:eq("+now+")").css({
                width:"100%",
                height:"100%",
                left:"100%"
            })
            now=next;
            currentTime=0;
            flag=true;
        }).css("zIndex",1)
    }

    function move1(){
        currentTime+=50;
        var bili=currentTime/3000;
        if(bili>1){
            bili=1;
        }
        $(".jindu").eq(now).css({width:bili*100+"%"})
        if(flag===false){
            $(".jindu").css("width",0);
        }
    }

    $(window).focus(function(){
        t1=setInterval(move,3000);
        t2=setInterval(move1,50)
    })
    $(window).blur(function(){
        clearInterval(t1);
        clearInterval(t2);
    })


    $(".lunbo_dian").click(function(){
        next=$(this).index(".lunbo_dian");
        stop();
    })

    $(".leftBtn").click(function(){
         
        stop("lefts");
    })
    $(".rightBtn").click(function(){
         
        stop("rights");
    })

    function stop(type){
        /*
         *  定时器停掉
         * */
        clearInterval(t1);
        clearInterval(t2);

        /*按钮的变化*/
        $(".lunbo_dian").find(".jindu").css("width",0);
        $(".lunbo_dian").eq(next).find(".jindu").css("width","100%");

        /*轮播图发生变化*/
        if(type=="rights"){
                next++;
                if(next==3){
                    next=0;
                }
            $(".list:eq("+now+")").animate({width:"80%",height:"80%"}).css("zIndex",0);
            $(".list:eq("+next+")").animate({left:0},function(){
            $(".list:eq("+now+")").css({
                width:"100%",
                height:"100%",
                left:"100%" 
            })
               now=next;
            }).css("zIndex",1)
            
        }else if(type=="lefts"){
                next--;
                if(next==-1){
                    next=2;
                }
            $(".list:eq("+now+")").animate({left:"100%"}).css("zIndex",1);
            $(".list").eq(next).css({
                width:"80%",height:"80%",left:0
            }).animate({width:"100%",height:"100%"},function(){
                now=next;
            })
        }
    }
})