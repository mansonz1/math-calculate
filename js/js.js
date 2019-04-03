$(document).ready(function(){
    //计时器
    function getNow(s) {
        return s < 10 ? '0' + s: s;
    }
    var myDate = new Date();
    var h=myDate.getHours();       //获取当前小时数(0-23)
    var m=myDate.getMinutes();     //获取当前分钟数(0-59)
    var s=myDate.getSeconds();
    var now=getNow(h)+':'+getNow(m)+":"+getNow(s);
    console.log(now);

    function getDate() {
        var today = new Date();
        var time = twoDigits(today.getHours()-getNow(h)) + ":" + twoDigits(today.getMinutes()-getNow(m)) + ":" + twoDigits(today.getSeconds()-getNow(s));

        $("#timer").html(time);
      /*  $("span").eq(0).html(time);
        $("span").eq(1).html(now);*/
    }
    function twoDigits(val) {
        if (val < 10) return "0" + val; return val;
    }
    $(function () {
        setInterval(getDate, 1000);
    });



    //洗牌
    var dom = $(".card");
    var a = [];
    var empty = [];
    var len = dom.length;
    for(var j = 0 ; j < len ; j++){
        a.push($(".card")[j]);
    }
    var temp = 0;
    for(var i = a.length -1; i>=0 ; i--){
       var randomNumber = Math.floor(Math.random()*(i+1));
       temp = a[randomNumber];
        a[randomNumber] = a[i];
        a[i] = temp;
    }
    //  dom = $(".card");
    for(var l = 0; l < a.length; l++){
        dom[l] = a[l];
    }
    $("#border").empty().append(dom);
    console.log(dom);

    //翻转
        var _this = $(this);
        var rotation = 90;
        $(".card").click(function(){
            /*$(this).css({"transition":"all 1.5s", "transform":"rotateY(" + rotation + "deg)"})
                .siblings(".back").css({"transition":"all 1.5s", "transform":"rotateY(" + rotation + "deg)"});*/
           /* $(this).find(".front").css({animation:"backing 1s linear","animationFillMode":"forwards"});
            $(this).find(".back").css({animation:"turn 1s linear","animationFillMode":"forwards"});*/

        });

//logic
var arr = [];
var time = 0;
var timeout = null;
    dom.click(function(){
        $(this).find(".front").css({animation:"backing 1s linear","animationFillMode":"forwards"});
        $(this).find(".back").css({animation:"turn 1s linear","animationFillMode":"forwards"});
    time++;
    console.log($(this).attr("id"));
    arr.push($(this));
    //推2次
    if(time==2){
        if(arr[0].attr("id") == arr[1].attr("id")){
            console.log("repeated");
            time=0;
            arr=[];
        }else{
            console.log(arr[0].attr("class"),arr[1].attr("class"));
            if(arr[1].attr("class") == arr[0].attr("class")){
                console.log("ok");
                arr[0].delay(2500).queue(function(next){
                    $(this).css({"visibility":"hidden"});
                    next();
                });
                arr[1].delay(2500).queue(function(next){
                    $(this).css({"visibility":"hidden"});
                    next();
                });
            }if(arr[1].attr("class") != arr[0].attr("class")){
                console.log("ng");
                arr[0].delay(1200).queue(function(next){
                    $(this).find(".back").css({animation:"backing 1s linear","animationFillMode":"forwards"});
                    $(this).find(".front").css({animation:"turn 1s linear","animationFillMode":"forwards"});
                    next();
                });
                arr[1].delay(1200).queue(function(next){
                    $(this).find(".front").css({animation:"turn 1s linear","animationFillMode":"forwards"});
                    $(this).find(".back").css({animation:"backing 1s linear","animationFillMode":"forwards"});
                    next();
                });
            }
            time=0;
            arr=[];
        }
    }
})
});