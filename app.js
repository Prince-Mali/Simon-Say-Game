let gameSeq = [];
let userSeq = [];

let btns = ["red", "green", "blue", "yellow"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

let h3 = document.querySelector("h3");
let highScore = 0;

document.addEventListener("keypress", function (){
    if(started == false){
        console.log("Game is started!");
        started = true;

        levelup();
    }
});


function gameflash(btn){
    btn.classList.add("gameflash");
    setTimeout(() => {
        btn.classList.remove("gameflash")
    }, 250);
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random()*4);
    let randomColor = btns[randomIdx];
    let randombtn = document.querySelector(`.${randomColor}`);

    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameflash(randombtn);
}

let allBtn = document.querySelectorAll(".btn");
for(btn of allBtn){
    btn.addEventListener("click", btnPress);
}

function btnPress() {
    let btn = this;
    userflash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkSeq(userSeq.length-1);
}

function checkSeq(idx) {
    if(gameSeq[idx] == userSeq[idx]){
        if(gameSeq.length == userSeq.length){
        setTimeout(levelup,1000);
        }
    }else{
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(()=> {
            document.querySelector("body").style.backgroundColor = "white";
        },100);
        if(highScore<level){
            highScore = level;
        }
        h3.innerText = `Your highest Score is ${highScore}`;
        h2.innerText = `Game is Over!!! 
        Your score was ${level}.
        press Any key to start the game.`;
        reset();
    }
}

function reset(){
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}
