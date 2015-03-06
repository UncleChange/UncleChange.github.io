var flag=true;
$(function(){
$("#listplayer").mouseout(function(){
    if(flag){
        $("#playerobj").css("display","none");
        $("#listplayer").css("overflow","hide");
    }
});
$("#playbutton").mouseout(function(){
    if(flag){
        $("#playerobj").css("display","none");
        $("#listplayer").css("overflow","hide");
    }
});
})

function playerOver(){
    $("#listplayer").css("overflow","auto");
    $("#playerobj").css("display","inline");
}
function playerClick(){
    flag=!flag;
    $("#listplayer").css("overflow","auto");
    $("#playerobj").css("display","inline");
}