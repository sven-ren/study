var flag=false;
var flag1=false;
var flag2=false;
var flag3=false;
var flag4=false;
var flag5=false;
var flag6=true;
var bulletSpeed=200;
var bulletCreateSpeed=2;
//var speedleft_right=1;
var oMain=document.getElementById("main");
var oStart=document.getElementById("start");
var oExit=document.getElementById("exit");
var oContinue=document.getElementById("continue");
var oPaused=document.getElementById("paused");
var oScore=document.getElementById("score");
var oMyBlood=document.getElementById("myBlood");
var oBossBlood=document.getElementById("bossBlood");
var oPausedBg=document.getElementById("pausedBg");
var oNew=document.getElementById("new");
var scoreNum=0;
var myBlood=5;
var oMusic=document.getElementById("music");
var oMusic1=document.getElementById("music1");
var oShootMusic=document.getElementById("shootmusic");
//var oMusicSrcNode=oMusic.getAttribute(src);
/*----------------------------------玩家飞机类------------------------------------------*/
function myPlane(imagesrc, blood, x, y, speed) {
    this.myPlaneNodes = document.createElement("img");
    this.imageSrc = imagesrc;
    this.blood = blood;
    this.speed = speed;
    this.alive=true;
    this.x=x;
    this.y=y;
    this.leftMove=function(){
        if(parseInt(this.myPlaneNodes.style.left)==0){
            this.myPlaneNodes.style.left=0+"px";
        }else{
            this.myPlaneNodes.style.left=parseInt(this.myPlaneNodes.style.left)-speed+"px";
        }

    };
    this.rightMove=function(){
        if(parseInt(this.myPlaneNodes.style.left)==367){
            this.myPlaneNodes.style.left=367+"px";
        }else{
            this.myPlaneNodes.style.left=parseInt(this.myPlaneNodes.style.left)+speed+"px";
        }

    };
    this.topMove=function(){
        if(parseInt(this.myPlaneNodes.style.top)==0){
            this.myPlaneNodes.style.top=0+"px"
        }else{
            this.myPlaneNodes.style.top=parseInt(this.myPlaneNodes.style.top)-speed+"px";
        }
    };
    this.bottomMove=function(){
        if(parseInt(this.myPlaneNodes.style.top)==608){
            this.myPlaneNodes.style.top=608+"px";
        }else{
            this.myPlaneNodes.style.top=parseInt(this.myPlaneNodes.style.top)+speed+"px";
        }
    };
    this.create=function(){
        this.myPlaneNodes.src=this.imageSrc;
        this.myPlaneNodes.style.position="absolute";
        this.myPlaneNodes.style.zIndex="999";
        this.myPlaneNodes.style.left=this.x+"px";
        this.myPlaneNodes.style.top=this.y+"px";
        oMain.appendChild( this.myPlaneNodes);
    };
}
var plane=new myPlane("plane1/LiPlane.png",5,180,600,1);/*实例化一个玩家飞机*/
/*-------------------------------------敌方小飞机类----------------------------------------*/
function enemyPlane(imagesrc,x,y,speed){
    this.enemyPlaneNodes = document.createElement("img");
    this.imageSrc = imagesrc;
    this.dead = false;
    this.deadtime=10;
    this.speed = speed;
    this.x=x;
    this.y=y;
    this.moveDown=function(){
            this.enemyPlaneNodes.style.top=parseInt(this.enemyPlaneNodes.style.top)+speed+"px";
    };
    this.create=function(){
        this.enemyPlaneNodes.src=this.imageSrc;
        this.enemyPlaneNodes.style.position="absolute";
        this.enemyPlaneNodes.style.zIndex="999";
        this.enemyPlaneNodes.style.left=this.x+"px";
        this.enemyPlaneNodes.style.top=this.y+"px";
        oMain.appendChild( this.enemyPlaneNodes);
    }
}
var enemyPlaneSrc=["plane1/BluePlane.png","plane1/PurplePlane.png","plane1/OrangePlane.png","plane1/BluePlane3.png"];
var i=parseInt(Math.random()*4);
var enemyPlaneX=parseInt(Math.random()*380);
var enemyPlaneY=parseInt(Math.random()*0);
var littlePlane=new enemyPlane(enemyPlaneSrc[i],enemyPlaneX,enemyPlaneY,1);
var littlePlaneArray=new Array();
/*------------------------------------敌方大飞机类-----------------------------*/
function enemyBigPlane(imagesrc,x,y,speed){
    this.enemyBigPlaneNodes = document.createElement("img");
    this.imageSrc = imagesrc;
    this.dead = false;
    this.deadtime=10;
    this.speed = speed;
    this.x=x;
    this.y=y;
    this.moveDown=function(){
        this.enemyBigPlaneNodes.style.top=parseInt(this.enemyBigPlaneNodes.style.top)+speed+"px";
    };
    this.create=function(){
        this.enemyBigPlaneNodes.src=this.imageSrc;
        this.enemyBigPlaneNodes.style.position="absolute";
        this.enemyBigPlaneNodes.style.zIndex="999";
        this.enemyBigPlaneNodes.style.left=this.x+"px";
        this.enemyBigPlaneNodes.style.top=this.y+"px";
        oMain.appendChild( this.enemyBigPlaneNodes);
    }
}
var enemyBigPlaneSrc=["plane1/bigPlane1.png","plane1/bigPlane2.png","plane1/hugePlane.png","plane1/middlePlane.png"];
var j=parseInt(Math.random()*4);
var enemyBigPlaneX=parseInt(Math.random()*380);
var enemyBigPlaneY=parseInt(Math.random()*0);
var bigPlane=new enemyBigPlane(enemyBigPlaneSrc[j],enemyBigPlaneX,enemyBigPlaneY,1);
var bigPlaneArray=new Array();
/*--------------------------------------敌方BOSS类--------------------------------*/
function enemyBossPlane(imagesrc,x,y,speed,speed1){
    this.enemyBossPlaneNodes = document.createElement("img");
    this.imageSrc = imagesrc;
    this.dead = false;
    this.bossBlood=500;
    this.deadtime=10;
    this.speed = speed;
    this.speedleft_right=speed1;
    this.x=x;
    this.y=y;
    this.moveDown=function(){
        this.enemyBossPlaneNodes.style.top=parseInt(this.enemyBossPlaneNodes.style.top)+speed+"px";
    };
    this.moveLeft=function(){
            this.enemyBossPlaneNodes.style.left=parseInt(this.enemyBossPlaneNodes.style.left)+this.speedleft_right+"px";
    };
    /*this.moveRight=function(){
            this.enemyBossPlaneNodes.style.left=parseInt(this.enemyBossPlaneNodes.style.left)+speed1+"px";
    };*/
    this.create=function(){
        this.enemyBossPlaneNodes.src=this.imageSrc;
        this.enemyBossPlaneNodes.style.position="absolute";
        this.enemyBossPlaneNodes.style.zIndex="999";
        this.enemyBossPlaneNodes.style.left=this.x+"px";
        this.enemyBossPlaneNodes.style.top=this.y+"px";
        oMain.appendChild( this.enemyBossPlaneNodes);
    }
}
var enemyBossPlaneSrc=["plane1/hugePlane.png"];
var k=0;
//var speedleft_right=1;
var enemyBossPlaneX=parseInt(Math.random()*380);
var enemyBossPlaneY=parseInt(Math.random()*0);
//var bossPlane=new enemyBossPlane(enemyBossPlaneSrc[k],enemyBossPlaneX,enemyBossPlaneY,1,1);
var bossPlaneArray=new Array();
/*-----------------------------------玩家子弹类-------------------------------*/
function myBullet(imagesrc, speed){
    this.myBulletNodes = document.createElement("img");
    this.imageSrc = imagesrc;
    this.power = 1;
    //this.state=true;
    this.speed = speed;
    this.state=true;
    //this.x=x;
    //this.y=y;
    this.moveUp=function(){
        if(this.state==true) {
            this.myBulletNodes.style.top = parseInt(this.myBulletNodes.style.top) - this.speed + "px";
        }
    };
    this.create=function(){
        this.myBulletNodes.src=this.imageSrc;
        this.myBulletNodes.style.position="absolute";
        this.myBulletNodes.style.zIndex="999";
        this.myBulletNodes.style.left=parseInt(plane.myPlaneNodes.style.left)+28+"px";
        this.myBulletNodes.style.top=parseInt(plane.myPlaneNodes.style.top)-40+"px";
        oMain.appendChild(this.myBulletNodes);
    }
}
var ourBullet=new myBullet("plane1/bullet.png",2);
var ourBulletArray=new Array();
/*-----------------------遍历小飞机数组，让每个小飞机都向下移动--------------*/
var littlePlaneMoveDown1;
    function littlePlaneMoveDown(){
    for(var j=0;j<littlePlaneArray.length;j++){
        if(littlePlaneArray[j].dead==false){
            littlePlaneArray[j].moveDown();
            if(parseInt(littlePlaneArray[j].enemyPlaneNodes.style.top)>660){/*当小飞机超出小边界，删除小飞机节点*/
                oMain.removeChild(littlePlaneArray[j].enemyPlaneNodes);
                littlePlaneArray.splice(j,1);
            }
        }else{
            littlePlaneArray[j].deadtime--;
            if(littlePlaneArray[j].deadtime<=0){
                oMain.removeChild(littlePlaneArray[j].enemyPlaneNodes);
                littlePlaneArray.splice(j,1);
            }
        }
    }
}
/*---------------------遍历大飞机数组，让每个大飞机都向下移动-------------------*/
var bigPlaneMoveDown1;
function bigPlaneMoveDown(){
    for(var k=0;k<bigPlaneArray.length;k++){
        if(bigPlaneArray[k].dead==false){
            bigPlaneArray[k].moveDown();
            if(parseInt(bigPlaneArray[k].enemyBigPlaneNodes.style.top)>660){/*当小飞机超出小边界，删除小飞机节点*/
                oMain.removeChild(bigPlaneArray[k].enemyBigPlaneNodes);
                bigPlaneArray.splice(k,1);
            }
        }else{
            bigPlaneArray[k].deadtime--;
            if(bigPlaneArray[k].deadtime<=0){
                oMain.removeChild(bigPlaneArray[k].enemyBigPlaneNodes);
                bigPlaneArray.splice(k,1);
            }
        }
    }
}
/*----------------------------遍历Boss数组，让boss向下移动--------------------------*/
var bossPlaneMoveDown1;
function bossPlaneDown(){
    for(var i=0;i<bossPlaneArray.length;i++){
        if(bossPlaneArray[i].dead==false){
            bossPlaneArray[i].moveDown();
            if(parseInt(bossPlaneArray[k].enemyBossPlaneNodes.style.top)>660){
                oMain.removeChild(bossPlaneArray[i].enemyBossPlaneNodes);
                bossPlaneArray.splice(i,1);
            }
        }else{
            bossPlaneArray[i].deadtime--;
            if(bossPlaneArray[i].deadtime<=0){
                oMain.removeChild(bossPlaneArray[i].enemyBossPlaneNodes);
                bossPlaneArray.splice(i,1);
            }
        }
    }
}
/*-------------------------遍历Boss数组，让boss向左移动--------------------------*/
var bossPlaneMoveLeft1;
function bossPlaneMoveLeft(){
    for(var i=0;i<bossPlaneArray.length;i++){
        //bossPlaneArray[i].speedleft_right=(Math.random()*3)-1;
        if(parseInt(bossPlaneArray[i].enemyBossPlaneNodes.style.left)==330){
            bossPlaneArray[i].speedleft_right=-1;
        }
        if(parseInt(bossPlaneArray[i].enemyBossPlaneNodes.style.left)==0){
            bossPlaneArray[i].speedleft_right=1;
        }
        bossPlaneArray[i].moveLeft();
        //this.enemyBossPlaneNodes.style.left=parseInt(this.enemyBossPlaneNodes.style.left)+this.speedleft_right+"px";
    }
}
//setInterval(clearBossLeftMove,5000);
/*------------------------遍历Boss数组，让boss向右移动----------------------------*/
/*var bossPlaneMoveRight1;
function bossPlaneMoveRight(){
    for(var i=0;i<bossPlaneArray.length;i++){
        if(bossPlaneArray[i].dead==false){
            bossPlaneArray[i].moveRight();
        }
    }
}*/
//setInterval(clearBossRightMove,5000);
/*-------------------------------开始游戏------------------------------------*/
function startGame() {
    oStart.style.display = "none";
    oExit.style.display = "none";
    oScore.style.display="block";
    oMyBlood.style.display="block";
    oBossBlood.style.display="block";
    oPaused.style.display="block";
    plane.create();/*创建玩家飞机*/
    oScore.innerHTML="score:"+scoreNum;
    oMyBlood.innerHTML="HP:"+myBlood;
    oExit.addEventListener("click",exitGame);

    /*---------------设置计时器，让everybody行动起来------------------*/
    bigPlaneCreate1=setInterval(bigPlaneCreate,5000);
    bigPlaneMoveDown1=setInterval(bigPlaneMoveDown,10);
    littlePlaneCreate1=setInterval(littlePlaneCreate,2000);
    playerPlaneLeftMove1=setInterval(playerPlaneLeftMove,3);
    playerPlaneTopMove1=setInterval(playerPlaneTopMove,3);
    playerPlaneRightMove1=setInterval(playerPlaneRightMove,3);
    playerPlaneBottomMove1=setInterval(playerPlaneBottomMove,3);
    littlePlaneMoveDown1=setInterval(littlePlaneMoveDown,10);
    ourBulletCreate1=setInterval(ourBulletCreate,50);
    ourBulletMoveUp1=setInterval(ourBulletMoveUp,2);
    bullet_littlePlane1=setInterval(bullet_littlePlane,0);
    bullet_bigPlane1=setInterval(bullet_bigPlane,0);
    plane_littlePlane1=setInterval(plane_littlePlane,0);
    plane_bigPlane1=setInterval(plane_bigPlane,0);
    plane_bossPlane1=setInterval(plane_bossPlane,0);
    bullet_bossPlane1=setInterval(bullet_bossPlane,0);
    bossPlaneCreate1=setInterval(bossPlaneCreate,20000);
    bossPlaneMoveDown1=setInterval(bossPlaneDown,100);
    bossPlaneMoveLeft1=setInterval(bossPlaneMoveLeft,100);
    //bossPlaneMoveRight1=setInterval(bossPlaneMoveRight,100);
    oMusic.setAttribute("src","music/wind.ogg");
    if(plane.alive==false){
        plane.alive=true;
        scoreNum=0;
        myBlood=5;
        plane.blood=5;
        oScore.innerHTML="score:"+scoreNum;
        oMyBlood.innerHTML="HP:"+myBlood;
    }
    //shootMusic1=setInterval(shootMusic,1000);
}
/*------------------------------------敌方小飞机创建-------------------------------------*/
var littlePlaneCreate1;
function littlePlaneCreate(){
    var enemyPlaneSrc=["plane1/BluePlane.png","plane1/PurplePlane.png","plane1/OrangePlane.png","plane1/BluePlane3.png"];
    var i=parseInt(Math.random()*4);
    var enemyPlaneX=parseInt(Math.random()*380);
    var enemyPlaneY=parseInt(Math.random()*0);
    var littlePlane=new enemyPlane(enemyPlaneSrc[i],enemyPlaneX,enemyPlaneY,1,1);
    //if(flag5==true){
        littlePlane.create();/*产生敌方小飞机*/
        littlePlaneArray.push(littlePlane);/*将所有的敌方小飞机添加到数组*/
    //}
}
/*----------------------------------敌方大飞机创建---------------------------------*/
var bigPlaneCreate1;
function bigPlaneCreate(){
    var enemyBigPlaneSrc=["plane1/YePlane.png","plane1/JpPlane.png","plane1/bigPlane5.png"];
    var i=parseInt(Math.random()*3);
    var enemyBigPlaneX=parseInt(Math.random()*380);
    var enemyBigPlaneY=parseInt(Math.random()*0);
    var bigPlane=new enemyBigPlane(enemyBigPlaneSrc[i],enemyBigPlaneX,enemyBigPlaneY,1,1);
    //if(flag5==true){
    bigPlane.create();/*产生敌方小飞机*/
    bigPlaneArray.push(bigPlane);/*将所有的敌方小飞机添加到数组*/
    //}
}
/*-----------------------------------敌方boss飞机创建-------------------------------*/
var bossPlaneCreate1;
function bossPlaneCreate(){
    var enemyBossPlaneSrc=["plane1/LXPlane.png"];
    var i=0;
    var enemyBossPlaneX=parseInt(Math.random()*380);
    var enemyBossPlaneY=parseInt(Math.random()*0);
    var bossPlane=new enemyBossPlane(enemyBossPlaneSrc[k],enemyBossPlaneX,enemyBossPlaneY,1,1);
    bossPlane.create();/*产生敌方小飞机*/

    bossPlaneArray.push(bossPlane);/*将所有的敌方小飞机添加到数组*/
}
/*--------------------------------------创建玩家子弹------------------------------*/
var ourBulletCreate1;
function ourBulletCreate(){
    if(flag4==true){
        var ourBullet=new myBullet("plane1/bullet.png",2);
        if(ourBullet.state==true){
            ourBullet.create();
            ourBulletArray.push(ourBullet);
            /*if(plane.alive==false){
                ourBullet.state=false;
            }*/
        }

        /*ourBullet.create();
        ourBulletArray.push(ourBullet);*/
    }
}
/*--------------------------------------玩家子弹移动-------------------------------*/
var ourBulletMoveUp1;
function ourBulletMoveUp(){
    for(var k=0;k<ourBulletArray.length;k++){
        if(ourBulletArray[k].state==true){
            ourBulletArray[k].moveUp();
            if(parseInt(ourBulletArray[k].myBulletNodes.style.top)<0){/*当玩家子弹超出边界，删除子弹节点*/
                oMain.removeChild(ourBulletArray[k].myBulletNodes);
                ourBulletArray.splice(k,1);
            }
        }else{
            oMain.removeChild(ourBulletArray[k].myBulletNodes);
            ourBulletArray.splice(k,1);
        }
    }
}
/*--------------------------------------暂停函数---------------------------------------*/
function paused(){/*按暂停按钮，清除计时器*/
    oNew.style.display="block";
    oExit.style.display="block";
    oContinue.style.display="block";
    oPausedBg.style.display="block";
    clearInterval(playerPlaneLeftMove1);
    clearInterval(playerPlaneTopMove1);
    clearInterval(playerPlaneRightMove1);
    clearInterval(playerPlaneBottomMove1);
    clearInterval(littlePlaneMoveDown1);
    clearInterval(littlePlaneCreate1);
    clearInterval(ourBulletCreate1);
    clearInterval(ourBulletMoveUp1);
    clearInterval(bigPlaneCreate1);
    clearInterval(bigPlaneMoveDown1);
    clearInterval(bossPlaneCreate1);
    clearInterval(bossPlaneMoveDown1);
    clearInterval(bossPlaneMoveLeft1);
}
/*----------------------------------------继续游戏函数-----------------------------------*/
function continueGame(){/*按继续按钮，加上计时器*/
    oStart.style.display="none";
    oExit.style.display="none";
    oContinue.style.display="none";
    oNew.style.display="none";
    oPausedBg.style.display="none";
    littlePlaneCreate1=setInterval(littlePlaneCreate,2000);
    littlePlaneMoveDown1=setInterval(littlePlaneMoveDown,10);
    playerPlaneLeftMove1=setInterval(playerPlaneLeftMove,3);
    playerPlaneTopMove1=setInterval(playerPlaneTopMove,3);
    playerPlaneRightMove1=setInterval(playerPlaneRightMove,3);
    playerPlaneBottomMove1=setInterval(playerPlaneBottomMove,3);
    ourBulletCreate1=setInterval(ourBulletCreate,50);
    ourBulletMoveUp1=setInterval(ourBulletMoveUp,2);
    bigPlaneCreate1=setInterval(bigPlaneCreate,5000);
    bigPlaneMoveDown1=setInterval(bigPlaneMoveDown,10);
    bossPlaneCreate1=setInterval(bossPlaneCreate,20000);
    bossPlaneMoveDown1=setInterval(bossPlaneDown,100);
    bossPlaneMoveLeft1=setInterval(bossPlaneMoveLeft,100);
}
/*---------------------------------------新的游戏函数--------------------------------------*/
function newGame(){/*新的游戏*/
    oContinue.style.display="none";
    oNew.style.display="none";
    oPausedBg.style.display="none";
    for(var x=0;x<littlePlaneArray.length;x++){
        oMain.removeChild(littlePlaneArray[x].enemyPlaneNodes);
        littlePlaneArray.splice(x,1);
        x--;
    }
    for(var n=0;n<ourBulletArray.length;n++){
        oMain.removeChild(ourBulletArray[n].myBulletNodes);
        ourBulletArray.splice(n,1);
        n--;
    }
    for(var z=0;z<bigPlaneArray.length;z++){
        oMain.removeChild(bigPlaneArray[z].enemyBigPlaneNodes);
        bigPlaneArray.splice(z,1);
        z--;
    }
    for(var v=0;v<bossPlaneArray.length;v++){
        oMain.removeChild(bossPlaneArray[v].enemyBossPlaneNodes);
        bigPlaneArray.splice(v,1);
        v--;
    }
    if(plane.alive==true){
        oMain.removeChild(plane.myPlaneNodes);
    }
    startGame();
}
/*-----------------------------------------玩家飞机死亡函数-----------------------------------*/
function playerDead() {/*按暂停按钮，清除计时器*/
    oNew.style.display = "block";
    oExit.style.display = "block";
    //oContinue.style.display="block";
    oPausedBg.style.display = "block";
    clearInterval(playerPlaneLeftMove1);
    clearInterval(playerPlaneTopMove1);
    clearInterval(playerPlaneRightMove1);
    clearInterval(playerPlaneBottomMove1);
    clearInterval(littlePlaneMoveDown1);
    clearInterval(littlePlaneCreate1);
    clearInterval(ourBulletCreate1);
    clearInterval(ourBulletMoveUp1);
    clearInterval(bigPlaneCreate1);
    clearInterval(bigPlaneMoveDown1);
    clearInterval(bossPlaneCreate1);
    clearInterval(bossPlaneMoveDown1);
    clearInterval(bossPlaneMoveLeft1);
}
/*----------------------------------------退出游戏函数----------------------------------------*/
function exitGame(){
    if(confirm("确定退出游戏？")){
        close();
    }
}
/*-----------------------------------------按键移动飞机-----------------------------------*/
var playerPlaneLeftMove1;
    function playerPlaneLeftMove(){
    if(flag==true){
        plane.leftMove();
    }
}
var playerPlaneTopMove1;
    function playerPlaneTopMove(){
    if(flag2==true){
        plane.rightMove();
    }
}
var playerPlaneRightMove1;
    function playerPlaneRightMove(){
    if(flag1==true){
        plane.topMove();
    }
}
var playerPlaneBottomMove1;
    function playerPlaneBottomMove(){
    if(flag3==true){
        plane.bottomMove();
    }
}
var shootMusic1;
function shootMusic(){
    if(flag5==true){
        oShootMusic.setAttribute("src","music/shootmusic.mp3");
    }
}
/*----------------------判定按下的键为哪个键，从而为对应的变量赋值true-----------------------------*/
function userKey() {
    var e = window.event || arguments[0];
    var keyValue = e.keyCode;
    if(keyValue == 37){
        flag = true;
    }
    if(keyValue == 38){
        flag1=true;
    }
    if(keyValue == 39){
        flag2=true;
    }
    if(keyValue == 40){
        flag3=true;
    }
    if(keyValue==90&&plane.alive==true){
        flag4=true;
        flag5=true;
        //oShootMusic.setAttribute("src","music/shootmusic.mp3")
    }
}



/*-------------------------------------------按键弹起函数-------------------------------------*/
function userKeyUp(){
    var e = window.event|| arguments[0];
    var keyValue=e.keyCode;
    if(keyValue==37){
        flag=false;
    }
    if(keyValue==38){
        flag1=false;
    }
    if(keyValue==39){
        flag2=false;
    }
    if(keyValue==40){
        flag3=false;
    }
    if(keyValue==90){
        flag4=false;
        //flag5=false;
    }
}

/*---------------------------------子弹和小飞机碰撞判定-----------------------------------------*/
var bullet_littlePlane1;
function bullet_littlePlane(){
    for(var a=0;a<littlePlaneArray.length;a++){
        for(var b=0;b<ourBulletArray.length;b++){
            if(littlePlaneArray[a].dead==false){
                var littlePlaneX=parseInt(littlePlaneArray[a].enemyPlaneNodes.style.left);
                var littlePlaneY=parseInt(littlePlaneArray[a].enemyPlaneNodes.style.top);
                var ourBulletX=parseInt(ourBulletArray[b].myBulletNodes.style.left);
                var ourBulletY=parseInt(ourBulletArray[b].myBulletNodes.style.top);
                if(ourBulletX<=littlePlaneX+45&&ourBulletX>=littlePlaneX-20){
                    if(ourBulletY<=littlePlaneY+34&&ourBulletY>=littlePlaneY-40){
                        littlePlaneArray[a].dead=true;
                        ourBulletArray[b].state=false;
                        littlePlaneArray[a].enemyPlaneNodes.src="plane1/BeiJi_02.png";
                        scoreNum++;
                        oScore.innerHTML="score:"+scoreNum;
                        oMusic1.setAttribute("src","music/boommusic3.mp3");
                    }
                }
            }
        }
    }
}
/*---------------------------------子弹和大飞机碰撞判定---------------------------------*/
var bullet_bigPlane1;
function bullet_bigPlane(){
    for(var a=0;a<bigPlaneArray.length;a++){
        for(var b=0;b<ourBulletArray.length;b++){
            if(bigPlaneArray[a].dead==false){
                var bigPlaneX=parseInt(bigPlaneArray[a].enemyBigPlaneNodes.style.left);
                var bigPlaneY=parseInt(bigPlaneArray[a].enemyBigPlaneNodes.style.top);
                var ourBulletX=parseInt(ourBulletArray[b].myBulletNodes.style.left);
                var ourBulletY=parseInt(ourBulletArray[b].myBulletNodes.style.top);
                if(ourBulletX<=bigPlaneX+100&&ourBulletX>=bigPlaneX-20){
                    if(ourBulletY<=bigPlaneY+100&&ourBulletY>=bigPlaneY-40){
                        bigPlaneArray[a].dead=true;
                        ourBulletArray[b].state=false;
                        bigPlaneArray[a].enemyBigPlaneNodes.src="plane1/BeiJi_02.png";
                        scoreNum+=2;
                        oScore.innerHTML="score:"+scoreNum;
                        oMusic1.setAttribute("src","music/boommusic3.mp3");
                    }
                }
            }
        }
    }
}
/*-----------------------------------子弹和boss碰撞判定----------------------------------*/
var bullet_bossPlane1;
function bullet_bossPlane(){
    for(var a=0;a<bossPlaneArray.length;a++){
        for(var b=0;b<ourBulletArray.length;b++){
            if(bossPlaneArray[a].dead==false){
                var bigPlaneX=parseInt(bossPlaneArray[a].enemyBossPlaneNodes.style.left);
                var bigPlaneY=parseInt(bossPlaneArray[a].enemyBossPlaneNodes.style.top);
                var ourBulletX=parseInt(ourBulletArray[b].myBulletNodes.style.left);
                var ourBulletY=parseInt(ourBulletArray[b].myBulletNodes.style.top);
                if(ourBulletX<=bigPlaneX+100&&ourBulletX>=bigPlaneX-20){
                    if(ourBulletY<=bigPlaneY+100&&ourBulletY>=bigPlaneY-40){
                        bossPlaneArray[a].bossBlood--;
                        oBossBlood.innerHTML="BOSS血量:"+bossPlaneArray[a].bossBlood;
                        if(bossPlaneArray[a].bossBlood<=0){
                            bossPlaneArray[a].dead=true;
                            bossPlaneArray[a].enemyBossPlaneNodes.src="plane1/BeiJi_02.png";
                            oMusic1.setAttribute("src","music/boommusic3.mp3");
                        }
                        ourBulletArray[b].state=false;
                        scoreNum+=2;
                        oScore.innerHTML="score:"+scoreNum;
                    }
                }
            }
        }
    }
}
/*--------------------------------玩家飞机和敌方小飞机碰撞判定----------------------------*/
var plane_littlePlane1;
function plane_littlePlane(){
    for(var i=0;i<littlePlaneArray.length;i++){
        if(littlePlaneArray[i].dead==false&&plane.alive==true){
            var littlePlaneX=parseInt(littlePlaneArray[i].enemyPlaneNodes.style.left);
            var littlePlaneY=parseInt(littlePlaneArray[i].enemyPlaneNodes.style.top);
            var planeX=parseInt(plane.myPlaneNodes.style.left);
            var planeY=parseInt(plane.myPlaneNodes.style.top);
            if(planeX<=littlePlaneX+45&&planeX>=littlePlaneX-73){
                if(planeY<=littlePlaneY+34&&planeY>=littlePlaneY-52){
                    littlePlaneArray[i].dead=true;
                    littlePlaneArray[i].enemyPlaneNodes.src="plane1/BeiJi_02.png";
                    oMusic1.setAttribute("src","music/boommusic3.mp3");
                    plane.blood--;
                    myBlood--;
                    oMyBlood.innerHTML="HP:"+myBlood;
                    if(plane.blood<=0) {
                        plane.alive=false;
                        oMain.removeChild(plane.myPlaneNodes);
                        playerDead();
                    }
                }
            }
        }
    }
}
/*--------------------------------------玩家飞机和敌方大飞机碰撞判定---------------------------------*/
var plane_bigPlane1;
function plane_bigPlane(){
    for(var i=0;i<bigPlaneArray.length;i++){
        if(bigPlaneArray[i].dead==false&&plane.alive==true){
            var littlePlaneX=parseInt(bigPlaneArray[i].enemyBigPlaneNodes.style.left);
            var littlePlaneY=parseInt(bigPlaneArray[i].enemyBigPlaneNodes.style.top);
            var planeX=parseInt(plane.myPlaneNodes.style.left);
            var planeY=parseInt(plane.myPlaneNodes.style.top);
            if(planeX<=littlePlaneX+100&&planeX>=littlePlaneX-73){
                if(planeY<=littlePlaneY+100&&planeY>=littlePlaneY-52){
                    bigPlaneArray[i].dead=true;
                    bigPlaneArray[i].enemyBigPlaneNodes.src="plane1/BeiJi_02.png";
                    oMusic1.setAttribute("src","music/boommusic3.mp3");
                    plane.blood--;
                    myBlood--;
                    oMyBlood.innerHTML="HP:"+myBlood;
                    if(plane.blood<=0) {
                        plane.alive=false;
                        oMain.removeChild(plane.myPlaneNodes);
                        playerDead();
                    }
                }
            }
        }
    }
}
/*-----------------------------------玩家飞机和敌方boss碰撞判定-------------------------------*/
var plane_bossPlane1;
function plane_bossPlane(){
    for(var i=0;i<bossPlaneArray.length;i++){
        if(bossPlaneArray[i].dead==false&&plane.alive==true){
            var littlePlaneX=parseInt(bossPlaneArray[i].enemyBossPlaneNodes.style.left);
            var littlePlaneY=parseInt(bossPlaneArray[i].enemyBossPlaneNodes.style.top);
            var planeX=parseInt(plane.myPlaneNodes.style.left);
            var planeY=parseInt(plane.myPlaneNodes.style.top);
            if(planeX<=littlePlaneX+100&&planeX>=littlePlaneX-73){
                if(planeY<=littlePlaneY+100&&planeY>=littlePlaneY-52){
                    bossPlaneArray[i].dead=true;
                    bossPlaneArray[i].enemyBossPlaneNodes.src="plane1/BeiJi_02.png";
                    oMusic1.setAttribute("src","music/boommusic3.mp3");
                    plane.blood-=5;
                    myBlood-=5;
                    oMyBlood.innerHTML="HP:"+myBlood;
                    if(plane.blood<=0) {
                        plane.alive=false;
                        oMain.removeChild(plane.myPlaneNodes);
                        playerDead();
                    }
                }
            }
        }
    }
}

