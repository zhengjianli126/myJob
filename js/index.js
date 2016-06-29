/**
 * Created by Administrator on 2016/5/19.
 */
var main = document.querySelector(".main");
var inners = document.querySelectorAll(".pos");
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var back=document.querySelectorAll(".return");
var desW = 640;
var desH = 1080;

if (winW / winH <= desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}

[].forEach.call(inners, function () {
   var curInner=arguments[0];
    curInner.index=arguments[1];
    curInner.addEventListener("touchstart",start);
    curInner.addEventListener("touchmove",move);
    curInner.addEventListener("touchend",end);
});


function start(e){
    this.startY= e.changedTouches[0].pageY;

}

function move(e){
    this.flag=true;
    e.preventDefault();
    var movedY=e.changedTouches[0].pageY;
    var changedX=movedY-this.startY;
    var index=this.index;


    [].forEach.call(inners, function () {
       if(arguments[1]!=index){
           arguments[0].style.display="none";

       }
        arguments[0].firstElementChild.style.display="none";
        arguments[0].firstElementChild.id="";
        utils.removeClass(arguments[0],"zIndex");
    });

    if(changedX>0){//向下滑
        this.nextIndex=index==0?inners.length-1:index-1;
        var duration=-winH+changedX;
    }
    else if(changedX<0){//向上滑
        this.nextIndex=index==inners.length-1?0:index+1;
        duration=winH+changedX;
    }
    //console.log(this.nextIndex)
    inners[this.nextIndex].style.display="block";

    utils.addClass(inners[this.nextIndex],"zIndex");
    inners[this.nextIndex].style.webkitTransform = "translate(0,"+duration+"px)";
    inners[index].style.webkitTransform="scale("+(1-Math.abs(changedX)/winH*1/2)+") translate(0,"+changedX+"px)";
}


function end(e){
    if(this.flag){
        inners[this.nextIndex].style.webkitTransform="translate(0,0)";
        inners[this.nextIndex].style.webkitTranslation="0.5s";
        inners[this.nextIndex].firstElementChild.style.display="block";
        inners[this.nextIndex].firstElementChild.id="content-box"+this.nextIndex;

        inners[this.nextIndex].addEventListener("webkitTransitionEnd", function () {
            this.style.webkitTranslation="";
            this.firstElementChild.style.display="block";
            this.firstElementChild.id="content-box"+this.index;

        });
        this.flag=false;
    }
}



~function () {
    var music = document.getElementById("music"), audioFir = document.getElementById("audioFir");
    window.setTimeout(function () {
        audioFir.play();

        audioFir.addEventListener("canplay", function () {
            music.style.display = "block";
            music.className = "music musicMove";
        });
    }, 500);

    music.addEventListener("click", function () {
        //->暂停
        if (audioFir.paused) {
            audioFir.play();
            music.className = "music musicMove";
            return;
        }
        //->播放
        audioFir.pause();
        music.className = "music";
    });
}();









