// =====================================
// Echo Peak
// game.js
// Part 1
// =====================================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const GRAVITY = 1800;
const MOVE_SPEED = 260;
const JUMP_FORCE = -620;

let lastTime = 0;

const keys = {};

document.addEventListener("keydown", e=>{
    keys[e.code]=true;
});

document.addEventListener("keyup", e=>{
    keys[e.code]=false;
});

// ==========================
// Player
// ==========================

const player={

    x:120,
    y:100,

    w:24,
    h:32,

    vx:0,
    vy:0,

    grounded:false,

    color:"#ffdb66"

};

// ==========================
// Level
// ==========================

const ground=460;

// ==========================

function update(dt){

    player.vx=0;

    if(keys["KeyA"]){

        player.vx=-MOVE_SPEED;

    }

    if(keys["KeyD"]){

        player.vx=MOVE_SPEED;

    }

    if(keys["Space"] && player.grounded){

        player.vy=JUMP_FORCE;
        player.grounded=false;

    }

    player.vy+=GRAVITY*dt;

    player.x+=player.vx*dt;
    player.y+=player.vy*dt;

    if(player.y+player.h>=ground){

        player.y=ground-player.h;

        player.vy=0;

        player.grounded=true;

    }

}

// ==========================

function drawBackground(){

    // Sky

    ctx.fillStyle="#8ed7ff";
    ctx.fillRect(0,0,WIDTH,HEIGHT);

    // Mountains

    ctx.fillStyle="#78b2d4";

    ctx.beginPath();

    ctx.moveTo(0,HEIGHT);

    ctx.lineTo(180,240);

    ctx.lineTo(340,HEIGHT);

    ctx.fill();

    ctx.beginPath();

    ctx.moveTo(180,HEIGHT);

    ctx.lineTo(470,180);

    ctx.lineTo(700,HEIGHT);

    ctx.fill();

    ctx.beginPath();

    ctx.moveTo(600,HEIGHT);

    ctx.lineTo(870,220);

    ctx.lineTo(960,HEIGHT);

    ctx.fill();

}

// ==========================

function drawGround(){

    ctx.fillStyle="#4ca55a";

    ctx.fillRect(0,ground,WIDTH,HEIGHT-ground);

    ctx.fillStyle="#63cb71";

    ctx.fillRect(0,ground,WIDTH,8);

}

// ==========================

function drawPlayer(){

    // Hood

    ctx.fillStyle="#5930d9";

    ctx.fillRect(player.x,player.y,player.w,player.h);

    // Face

    ctx.fillStyle="#ffd8a8";

    ctx.fillRect(

        player.x+6,
        player.y+8,
        12,
        12

    );

    // Eyes

    ctx.fillStyle="black";

    ctx.fillRect(player.x+9,player.y+12,2,2);

    ctx.fillRect(player.x+15,player.y+12,2,2);

    // Glowing scarf

    ctx.fillStyle="#00f7ff";

    ctx.fillRect(

        player.x+4,
        player.y+22,
        16,
        4

    );

}

// ==========================

function draw(){

    drawBackground();

    drawGround();

    drawPlayer();

}

// ==========================

function loop(timestamp){

    const dt=(timestamp-lastTime)/1000;

    lastTime=timestamp;

    update(dt);

    draw();

    requestAnimationFrame(loop);

}

requestAnimationFrame(loop);

// Hide the start screen when Begin Adventure is clicked

const startBtn=document.getElementById("startBtn");

startBtn.addEventListener("click",()=>{

    document.getElementById("startScreen").style.display="none";

});
// =====================================
// Menu Controls
// =====================================

const pauseMenu = document.getElementById("pauseMenu");

const resumeBtn = document.getElementById("resumeBtn");
const restartBtn = document.getElementById("restartBtn");

let paused = false;


// Pause with Escape

document.addEventListener("keydown", e => {

    if(e.code === "Escape"){

        paused = !paused;

        if(paused){

            pauseMenu.classList.remove("hidden");

        }else{

            pauseMenu.classList.add("hidden");

        }

    }

});


// Resume button

resumeBtn.addEventListener("click", ()=>{

    paused = false;

    pauseMenu.classList.add("hidden");

});


// Restart button

restartBtn.addEventListener("click", ()=>{

    player.x = 120;
    player.y = 100;

    player.vx = 0;
    player.vy = 0;

    paused = false;

    pauseMenu.classList.add("hidden");

});


// Stop game updates while paused

const oldUpdate = update;

update = function(dt){

    if(paused) return;

    oldUpdate(dt);

};
