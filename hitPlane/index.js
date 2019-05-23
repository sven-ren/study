var flag=false;
var flag1=false;
var flag2=false;
var flag3=false;
var flag4=false;
var flag5=false;
var flag6=true;
var bulletSpeed=200;
var bulletCreateSpeed=2;
var container=document.getElementById("container");
var oMain=document.getElementById("main");
var oStart=document.getElementById("start");
var oExit=document.getElementById("exit");
var oContinue=document.getElementById("continue");
var oPaused=document.getElementById("paused");
var oScore=document.getElementById("score");
var oMyBlood=document.getElementById("myBlood");
var oBossTimer=document.getElementById("bossTimer");
var oBossBlood=document.getElementById("bossBlood");
var oPausedBg=document.getElementById("pausedBg");
var oNew=document.getElementById("new");
var oInstruction=document.getElementById("instruction");
var scoreNum=0;
var myBlood=5;
var bossTime = 120;
var oBg_music=document.getElementById("bg_music");
var oBoom_music=document.getElementById("boom_music");
var oBoom_music_loud=document.getElementById("boom_music_loud");
var height = document.documentElement.clientHeight;
container.style.height = height+'px';
/*----------------------------------我的飞机------------------------------------------*/
function myPlane(imagesrc, blood, x, y, speed) {
    this.myPlaneNodes = document.createElement("div");
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
        if(parseInt(this.myPlaneNodes.style.left)==374){
            this.myPlaneNodes.style.left=374+"px";
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
        this.myPlaneNodes.className='myPlane';
        this.myPlaneNodes.style.position="absolute";
        this.myPlaneNodes.style.zIndex="999";
        this.myPlaneNodes.style.left=this.x+"px";
        this.myPlaneNodes.style.top=this.y+"px";
        oMain.appendChild( this.myPlaneNodes);
    };
}
var plane=new myPlane("images/LiPlane.png",5,170,520,1);/*实例化一个玩家飞机*/
/*-------------------------------------敌人小飞机----------------------------------------*/
function enemyPlane(imagesrc,x,y,speed){
    this.enemyPlaneNodes = document.createElement("div");
    this.dead = false;
    this.deadtime=10;
    this.speed = speed;
    this.x=x;
    this.y=y;
    this.moveDown=function(){
            this.enemyPlaneNodes.style.top=parseInt(this.enemyPlaneNodes.style.top)+speed+"px";
    };
    this.create=function(){
        this.enemyPlaneNodes.style.position="absolute";
        this.enemyPlaneNodes.style.zIndex="999";
        this.enemyPlaneNodes.className="enemy_normal "+"enemy_normal"+'_'+imagesrc;
        this.enemyPlaneNodes.style.left=this.x+"px";
        this.enemyPlaneNodes.style.top=this.y+"px";
        oMain.appendChild( this.enemyPlaneNodes);
    }
}
var littlePlaneArray=new Array();
/*------------------------------------敌军大飞机-----------------------------*/
function enemyBigPlane(imagesrc,x,y,speed){
    this.enemyBigPlaneNodes = document.createElement("div");
    this.dead = false;
    this.blood = 5;
    this.deadtime=10;
    this.speed = speed;
    this.x=x;
    this.y=y;
    this.moveDown=function(){
        this.enemyBigPlaneNodes.style.top=parseInt(this.enemyBigPlaneNodes.style.top)+speed+"px";
    };
    this.create=function(){
        this.enemyBigPlaneNodes.style.position="absolute";
        this.enemyBigPlaneNodes.style.zIndex="999";
        this.enemyBigPlaneNodes.className="enemy_middle "+"enemy_middle"+'_'+imagesrc;
        this.enemyBigPlaneNodes.style.left=this.x+"px";
        this.enemyBigPlaneNodes.style.top=this.y+"px";
        oMain.appendChild( this.enemyBigPlaneNodes);
    }
}
var bigPlaneArray=new Array();
/*--------------------------------------敌军boss飞机--------------------------------*/
function enemyBossPlane(imagesrc,x,y,speed,speed1){
    this.enemyBossPlaneNodes = document.createElement("div");
    this.dead = false;
    this.bossBlood=100;
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
    this.create=function(){
        this.enemyBossPlaneNodes.style.position="absolute";
        this.enemyBossPlaneNodes.style.zIndex="999";
        this.enemyBossPlaneNodes.className="enemy_boss";
        this.enemyBossPlaneNodes.style.left=this.x+"px";
        this.enemyBossPlaneNodes.style.top=this.y+"px";
        oMain.appendChild( this.enemyBossPlaneNodes);
    }
}
var bossPlaneArray=new Array();
/*-----------------------------------我的子弹-------------------------------*/
function myBullet(imagesrc, speed){
    this.myBulletNodes = document.createElement("div");
    this.myBulletFireMusic = document.createElement('audio');
    this.power = 1;
    this.speed = speed;
    this.state=true;
    this.hash=Math.random();
    this.moveUp=function(){
        if(this.state==true) {
            this.myBulletNodes.style.top = parseInt(this.myBulletNodes.style.top) - this.speed + "px";
        }
    };
    this.touch=function(){
        myBulletTouch();
    }
    this.destroy=function(){
        this.myBulletNodes.parentNode.removeChild(this.myBulletNodes)
        this.myBulletFireMusic.parentNode.removeChild(this.myBulletFireMusic)
    }
    this.create=function(){
        this.myBulletNodes.style.position="absolute";
        this.myBulletNodes.style.zIndex="999";
        this.myBulletNodes.id="myBullet_"+this.hash;
        this.myBulletNodes.className="myBullet";
        this.myBulletNodes.style.left=parseInt(plane.myPlaneNodes.style.left)+23+"px";
        this.myBulletNodes.style.top=parseInt(plane.myPlaneNodes.style.top)-40+"px";
        this.myBulletFireMusic.src='./material/media/planeshoot0.mp3';
        this.myBulletFireMusic.autoplay='autoplay';
        this.myBulletFireMusic.id='planshoot_music_'+this.hash;
        oMain.appendChild(this.myBulletNodes);
        oMain.appendChild(this.myBulletFireMusic);
    }
}
var ourBullet=new myBullet("images/bullet.png",2);
var ourBulletArray=new Array();
/*--------------------------------子弹打击音效-----------------------------*/
    function myBulletTouchMusic(){
        this.node = document.createElement('audio');
        this.node.src='./material/media/touch.mp3';
        this.node.autoplay='autoplay';
        oMain.appendChild(this.node);
        this.destroy=function(){
            this.node.parentNode.removeChild(this.node)
        }
    }
    function myBulletTouch(){
        var myBulletTouchMusic_ = new myBulletTouchMusic();
        myBulletTouchMusicArray.push(myBulletTouchMusic_)
    }
    var myBulletTouchMusicArray=[];
/*-----------------------遍历小飞机数组，让每个小飞机向下移动--------------*/
var littlePlaneMoveDown1;
    function littlePlaneMoveDown(){
    for(var j=0;j<littlePlaneArray.length;j++){
        if(littlePlaneArray[j].dead==false){
            littlePlaneArray[j].moveDown();
            if(parseInt(littlePlaneArray[j].enemyPlaneNodes.style.top)>660){/*当小飞机超出边界，删除小飞机节点*/
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
            if(parseInt(bigPlaneArray[k].enemyBigPlaneNodes.style.top)>660){/*超出边界删除节点*/
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
/*----------------------------遍历boss数组，让boss飞机向下移动--------------------------*/
var bossPlaneMoveDown1;
function bossPlaneDown(){
    for(var i=0;i<bossPlaneArray.length;i++){
        if(bossPlaneArray[i].dead==false){
            bossPlaneArray[i].moveDown();
            if(parseInt(bossPlaneArray[i].enemyBossPlaneNodes.style.top)>660){
                oMain.removeChild(bossPlaneArray[i].enemyBossPlaneNodes);
                bossPlaneArray.splice(i,1);
                oBossBlood.style.display='none'
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
/*-------------------------遍历boss数组，让boss向左移动--------------------------*/
var bossPlaneMoveLeft1;
function bossPlaneMoveLeft(){
    for(var i=0;i<bossPlaneArray.length;i++){
        if(parseInt(bossPlaneArray[i].enemyBossPlaneNodes.style.left)>=290){
            bossPlaneArray[i].speedleft_right=-1;
        }
        if(parseInt(bossPlaneArray[i].enemyBossPlaneNodes.style.left)<=0){
            bossPlaneArray[i].speedleft_right=1;
        }
        bossPlaneArray[i].moveLeft();
    }
}
/*-------------------------------开始游戏------------------------------------*/
function startGame() {
    oStart.style.display = "none";
    oExit.style.display = "none";
    oInstruction.style.display='none'
    oScore.style.display="block";
    oMyBlood.style.display="block";
    oBossTimer.style.display='block'
    // oBossBlood.style.display="block";
    oPaused.style.display="block";
    plane.create();
    oScore.innerHTML="score:"+scoreNum;
    oMyBlood.innerHTML="HP:"+myBlood;
    oExit.addEventListener("click",exitGame);

    /*---------------设置计时器，让每个对象都行动起来------------------*/
    bigPlaneCreate1=setInterval(bigPlaneCreate,5000);
    bigPlaneMoveDown1=setInterval(bigPlaneMoveDown,10);
    littlePlaneCreate1=setInterval(littlePlaneCreate,2000);
    playerPlaneLeftMove1=setInterval(playerPlaneLeftMove,3);
    playerPlaneTopMove1=setInterval(playerPlaneTopMove,3);
    playerPlaneRightMove1=setInterval(playerPlaneRightMove,3);
    playerPlaneBottomMove1=setInterval(playerPlaneBottomMove,3);
    littlePlaneMoveDown1=setInterval(littlePlaneMoveDown,10);
    ourBulletCreate1=setInterval(ourBulletCreate,168);
    ourBulletMoveUp1=setInterval(ourBulletMoveUp,2);
    bullet_littleimages=setInterval(bullet_littlePlane,0);
    bullet_bigimages=setInterval(bullet_bigPlane,0);
    plane_littleimages=setInterval(plane_littlePlane,0);
    plane_bigimages=setInterval(plane_bigPlane,0);
    plane_bossimages=setInterval(plane_bossPlane,0);
    bullet_bossimages=setInterval(bullet_bossPlane,0);
    bossPlaneCreate1=setInterval(bossPlaneCreate,120000);
    bossPlaneMoveDown1=setInterval(bossPlaneDown,100);
    bossPlaneMoveLeft1=setInterval(bossPlaneMoveLeft,100);
    bossTimer=setInterval(decreaseBossTime,1000);
    myBulletTouchMusic_minitor_timer=setInterval(myBulletTouchMusic_minitor,0)
    oBg_music.setAttribute("src","music/wind.ogg");
    if(plane.alive==false){
        plane.alive=true;
        scoreNum=0;
        myBlood=5;
        plane.blood=5;
        oScore.innerHTML="score:"+scoreNum;
        oMyBlood.innerHTML="HP:"+myBlood;
    }
}
/*------------------------------------敌方小飞机创建-------------------------------------*/
var littlePlaneCreate1;
function littlePlaneCreate(){
    var enemyPlaneSrc=[1,2,3,4];
    var i=parseInt(Math.random()*4);
    var enemyPlaneX=parseInt(Math.random()*380);
    var enemyPlaneY=-82;
    var littlePlane=new enemyPlane(enemyPlaneSrc[i],enemyPlaneX,enemyPlaneY,1,1);
        littlePlane.create();/*创建敌方小飞机*/
        littlePlaneArray.push(littlePlane);/*将所有敌方小飞机添加到数组*/
}
/*----------------------------------敌方大飞机创建---------------------------------*/
var bigPlaneCreate1;
function bigPlaneCreate(){
    var enemyBigPlaneSrc=[1,2];
    var i=parseInt(Math.random()*1+1);
    var enemyBigPlaneX=parseInt(Math.random()*380);
    var enemyBigPlaneY=-133;
    var bigPlane=new enemyBigPlane(enemyBigPlaneSrc[i],enemyBigPlaneX,enemyBigPlaneY,1,1);
    bigPlane.create();/*创建敌方大飞机*/
    bigPlaneArray.push(bigPlane);/*将所有敌方大飞机添加到数组*/
}
/*---------------------------boss到来时间缩短----------------------------------*/
var bossTimer;
function decreaseBossTime(){
    if(bossTime <= 0){
        oBossBlood.style.display='block';
        bossTime=120;
    }
    bossTime--;
    oBossTimer.innerHTML='BOSS COME IN:'+bossTime+'s';
}
/*-----------------------------------敌方boss飞机创建-------------------------------*/
var bossPlaneCreate1;
function bossPlaneCreate(){
    var enemyBossPlaneSrc=[1];
    var i=0;
    var enemyBossPlaneX=parseInt(Math.random()*380);
    var enemyBossPlaneY=parseInt(-134);
    var bossPlane=new enemyBossPlane(enemyBossPlaneSrc[i],enemyBossPlaneX,enemyBossPlaneY,1,1);
    bossPlane.create();/*创建敌方boss飞机*/

    bossPlaneArray.push(bossPlane);/*将所有地方boss飞机添加到数组*/
}
/*--------------------------------------创建玩家子弹------------------------------*/
var ourBulletCreate1;
function ourBulletCreate(){
    if(flag4==true){
        var ourBullet=new myBullet("images/bullet.png",2);
        if(ourBullet.state==true){
            ourBullet.create();
            ourBulletArray.push(ourBullet);
        }
    }
}
/*--------------------------------------玩家子弹移动-------------------------------*/
var ourBulletMoveUp1;
function ourBulletMoveUp(){
    for(var k=0;k<ourBulletArray.length;k++){
        if(ourBulletArray[k].state==true){
            ourBulletArray[k].moveUp();
            if(parseInt(ourBulletArray[k].myBulletNodes.style.top)<0){/*玩家子弹超出边界，删除对应子弹节点*/
                ourBulletArray[k].destroy()
                // ourBulletArray[k].destroy_touch_music()
                ourBulletArray.splice(k,1);
            }
        }else{
            ourBulletArray[k].destroy()
            ourBulletArray.splice(k,1);
        }
    }
}
/*--------------------------------------子弹打击音效监测--------------------------- */
function myBulletTouchMusic_minitor(){
    for(var q=0;q<myBulletTouchMusicArray.length;q++){
        if((myBulletTouchMusicArray[q].node.ended)){//播放完毕后删除该节点
            myBulletTouchMusicArray[q].destroy();
            myBulletTouchMusicArray.splice(q,1);
        }
    }
}
/*--------------------------------------暂停---------------------------------------*/
function paused(){/*暂停时，清除计时器*/
    oNew.style.display="block";
    oExit.style.display="block";
    oContinue.style.display="block";
    oPausedBg.style.display="block";
    oPaused.style.display='none';
    oInstruction.style.display='block'
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
    clearInterval(bossTimer);
}
/*----------------------------------------继续游戏-----------------------------------*/
function continueGame(){/*继续游戏时，加上计时器*/
    oStart.style.display="none";
    oExit.style.display="none";
    oContinue.style.display="none";
    oNew.style.display="none";
    oPaused.style.display='block';
    oPausedBg.style.display="none";
    oInstruction.style.display='none'
    littlePlaneCreate1=setInterval(littlePlaneCreate,2000);
    littlePlaneMoveDown1=setInterval(littlePlaneMoveDown,10);
    playerPlaneLeftMove1=setInterval(playerPlaneLeftMove,3);
    playerPlaneTopMove1=setInterval(playerPlaneTopMove,3);
    playerPlaneRightMove1=setInterval(playerPlaneRightMove,3);
    playerPlaneBottomMove1=setInterval(playerPlaneBottomMove,3);
    ourBulletCreate1=setInterval(ourBulletCreate,200);
    ourBulletMoveUp1=setInterval(ourBulletMoveUp,2);
    bigPlaneCreate1=setInterval(bigPlaneCreate,5000);
    bigPlaneMoveDown1=setInterval(bigPlaneMoveDown,10);
    bossPlaneCreate1=setInterval(bossPlaneCreate,120000);
    bossPlaneMoveDown1=setInterval(bossPlaneDown,100);
    bossPlaneMoveLeft1=setInterval(bossPlaneMoveLeft,100);
    bossTimer=setInterval(decreaseBossTime,1000);
}
/*---------------------------------------新的游戏--------------------------------------*/
function newGame(){
    oContinue.style.display="none";
    oNew.style.display="none";
    oExit.style.display='none';
    oPausedBg.style.display="none";
    oInstruction.style.display='none'
    scoreNum=0;
    myBlood=5;
    bossTime=120;
    oBossTimer.innerHTML='BOSS COME IN:120s';
    oBossBlood.innerHTML='BOSS HP:100';
    oBossBlood.style.display='none';
    if(littlePlaneArray.length){
        for(var x=0;x<littlePlaneArray.length;x++){
            oMain.removeChild(littlePlaneArray[x].enemyPlaneNodes);
            littlePlaneArray.splice(x,1);
            x--;
        }
    }
    if(ourBulletArray.length){
        for(var n=0;n<ourBulletArray.length;n++){
            oMain.removeChild(ourBulletArray[n].myBulletNodes);
            ourBulletArray.splice(n,1);
            n--;
        }
    }
    if(bigPlaneArray.length){
        for(var z=0;z<bigPlaneArray.length;z++){
            oMain.removeChild(bigPlaneArray[z].enemyBigPlaneNodes);
            bigPlaneArray.splice(z,1);
            z--;
        }
    }
    if(bossPlaneArray.length){
        for(var v=0;v<bossPlaneArray.length;v++){
            oMain.removeChild(bossPlaneArray[v].enemyBossPlaneNodes);
            bigPlaneArray.splice(v,1);
            v--;
        }
    }
    if(plane.alive==true){
        oMain.removeChild(plane.myPlaneNodes);
    }
    startGame();
}
/*-----------------------------------------玩家阵亡-----------------------------------*/
function playerDead() {
    oNew.style.display = "block";
    oExit.style.display = "block";
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
    clearInterval(bossTimer)
}
/*----------------------------------------退出游戏----------------------------------------*/
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
/*----------------------判定按下的键是哪个键，从而为对应的变量赋值true-----------------------------*/
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
        //按下z键先立即发射一发子弹
        var ourBullet=new myBullet("images/bullet.png",2);
        if(ourBullet.state==true){
            ourBullet.create();
            ourBulletArray.push(ourBullet);
        }
        flag4=true;//按住z键时，子弹开始循环发射
    }
}



/*-------------------------------------------按键弹起-------------------------------------*/
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
        flag4=false;//松开z键，子弹停止发射
    }
}

/*---------------------------------子弹和小飞机碰撞判定-----------------------------------------*/
var bullet_littleimages;
function bullet_littlePlane(){
    for(var a=0;a<littlePlaneArray.length;a++){
        for(var b=0;b<ourBulletArray.length;b++){
            if(littlePlaneArray[a].dead==false){
                var plane_style = window.getComputedStyle ? window.getComputedStyle(document.getElementsByClassName('enemy_normal')[a], "") : ''
                var bullet_style = window.getComputedStyle ? window.getComputedStyle(document.getElementsByClassName('myBullet')[b], "") : ''
                var littlePlaneX=parseInt(plane_style.left);
                var littlePlaneY=parseInt(plane_style.top);
                var littlePlane_width=parseInt(plane_style.width);
                var littlePlane_height=parseInt(plane_style.height);
                var ourBulletX=parseInt(bullet_style.left);
                var ourBulletY=parseInt(bullet_style.top);
                var ourBullet_width=parseInt(bullet_style.width);
                var ourBullet_height=parseInt(bullet_style.height);
                if(ourBulletX<=littlePlaneX+littlePlane_width&&ourBulletX>=littlePlaneX-ourBullet_width){
                    if(ourBulletY<=littlePlaneY+littlePlane_height&&ourBulletY>=littlePlaneY-ourBullet_height){
                        littlePlaneArray[a].dead=true;
                        ourBulletArray[b].state=false;
                        littlePlaneArray[a].enemyPlaneNodes.className="normal_enemy_boom";
                        scoreNum++;
                        oScore.innerHTML="score:"+scoreNum;
                        oBoom_music.setAttribute("src","music/boommusic3.mp3");
                    }
                }
            }
        }
    }
}
/*---------------------------------子弹和大飞机碰撞判定---------------------------------*/
var bullet_bigimages;
function bullet_bigPlane(){
    for(var a=0;a<bigPlaneArray.length;a++){
        for(var b=0;b<ourBulletArray.length;b++){
            if(bigPlaneArray[a].dead==false){
                var bigPlaneX=parseInt(bigPlaneArray[a].enemyBigPlaneNodes.style.left);
                var bigPlaneY=parseInt(bigPlaneArray[a].enemyBigPlaneNodes.style.top);
                var ourBulletX=parseInt(ourBulletArray[b].myBulletNodes.style.left);
                var ourBulletY=parseInt(ourBulletArray[b].myBulletNodes.style.top);
                if(ourBulletX<=bigPlaneX+100&&ourBulletX>=bigPlaneX-21){
                    if(ourBulletY<=bigPlaneY+133&&ourBulletY>=bigPlaneY-47){
                        ourBulletArray[b].state=false;
                        bigPlaneArray[a].blood--;
                        ourBulletArray[b].touch();
                        if(bigPlaneArray[a].blood <= 0){
                            bigPlaneArray[a].dead=true;
                            bigPlaneArray[a].enemyBigPlaneNodes.className="middle_enemy_boom";
                            scoreNum+=5;
                            oScore.innerHTML="score:"+scoreNum;
                            oBoom_music.setAttribute("src","./material/media/blast0.mp3");
                        }
                        
                    }
                }
            }
        }
    }
}
/*-----------------------------------子弹和boss碰撞判定----------------------------------*/
var bullet_bossimages;
function bullet_bossPlane(){
    for(var a=0;a<bossPlaneArray.length;a++){
        for(var b=0;b<ourBulletArray.length;b++){
            if(bossPlaneArray[a].dead==false){
                var bigPlaneX=parseInt(bossPlaneArray[a].enemyBossPlaneNodes.style.left);
                var bigPlaneY=parseInt(bossPlaneArray[a].enemyBossPlaneNodes.style.top);
                var ourBulletX=parseInt(ourBulletArray[b].myBulletNodes.style.left);
                var ourBulletY=parseInt(ourBulletArray[b].myBulletNodes.style.top);
                if(ourBulletX<=bigPlaneX+150&&ourBulletX>=bigPlaneX-21){
                    if(ourBulletY<=bigPlaneY+134&&ourBulletY>=bigPlaneY-47){
                        ourBulletArray[b].state=false;
                        bossPlaneArray[a].bossBlood--;
                        ourBulletArray[b].touch()
                        oBossBlood.innerHTML="BOSS HP:"+bossPlaneArray[a].bossBlood;
                        if(bossPlaneArray[a].bossBlood<=0){
                            bossPlaneArray[a].dead=true;
                            scoreNum+=100;
                            oScore.innerHTML="score:"+scoreNum;
                            bossPlaneArray[a].enemyBossPlaneNodes.className="enemy_boss_boom";
                            oBoom_music.setAttribute("src","./material/media/showbomb.mp3");
                            oBossBlood.style.display='none'
                        }
                    }
                }
            }
        }
    }
}
/*--------------------------------玩家飞机和敌方小飞机碰撞判定----------------------------*/
var plane_littleimages;
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
                    littlePlaneArray[i].enemyPlaneNodes.className="normal_enemy_boom";
                    oBoom_music.setAttribute("src","music/boommusic3.mp3");
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
var plane_bigimages;
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
                    bigPlaneArray[i].enemyBigPlaneNodes.className="middle_enemy_boom";
                    oBoom_music.setAttribute("src","./material/media/blast0.mp3");
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
/*-----------------------------------玩家飞机和敌方boss飞机碰撞判定-------------------------------*/
var plane_bossimages;
function plane_bossPlane(){
    for(var i=0;i<bossPlaneArray.length;i++){
        if(bossPlaneArray[i].dead==false&&plane.alive==true){
            var littlePlaneX=parseInt(bossPlaneArray[i].enemyBossPlaneNodes.style.left);
            var littlePlaneY=parseInt(bossPlaneArray[i].enemyBossPlaneNodes.style.top);
            var planeX=parseInt(plane.myPlaneNodes.style.left);
            var planeY=parseInt(plane.myPlaneNodes.style.top);
            if(planeX<=littlePlaneX+100&&planeX>=littlePlaneX-73){
                if(planeY<=littlePlaneY+100&&planeY>=littlePlaneY-52){
                    oBoom_music.setAttribute("src","music/boommusic3.mp3");
                    plane.blood-=5;
                    myBlood=0;
                    oMyBlood.innerHTML="HP:0";
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

