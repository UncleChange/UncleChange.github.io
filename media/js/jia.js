var flag=true;
$(function(){
$("#listplayer").mouseout(function(){
    if(flag){
        $("#playerobj").css("display","none");
        $("#listplayer").css("overflow","hide");
        $("#listplayer").css("z-index","-100000000");
    }
});
$("#playbutton").mouseout(function(){
    if(flag){
        $("#playerobj").css("display","none");
        $("#listplayer").css("overflow","hide");
        $("#listplayer").css("z-index","-100000000");
    }
});
})

function playerOver(){
    $("#listplayer").css("overflow","auto");
    $("#playerobj").css("display","inline");
    $("#listplayer").css("z-index","100000000");
}
function playerClick(){
    flag=!flag;
    $("#listplayer").css("overflow","auto");
    $("#playerobj").css("display","inline");
    $("#listplayer").css("z-index","100000000");
}
 window.onload=function(){ 
   function touches(ev){ 
        if(ev.touches.length==1){ 
            switch(ev.type){ 
                case 'touchstart': 
                    $("#listplayer").css("overflow","auto");
                    $("#playerobj").css("display","inline");
                    $("#listplayer").css("z-index","100000000");
                    break; 
                case 'touchend': 
                    break; 
                case 'touchmove': 
                    break; 
                 
            } 
        } 
    } 
    document.addEventListener('touchstart',touches,false); 
    document.addEventListener('touchend',touches,false); 
    document.addEventListener('touchmove',touches,false);  
    } 