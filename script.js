let gameseq=[];
let userSeq=[];
let btns = ["yellow","red","green","blue"]
let start = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function(){
    if (start == false){
        console.log("game is started");
        start=true;

        levelUp();
    }

});
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },500);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },500);
}
function levelUp(){
    userSeq=[];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 3);
    let randcolor = btns[randIdx];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameseq.push(randcolor);
    console.log(gameseq);
    gameFlash(randbtn);
}

function checkAns(idx){
    if (userSeq[idx] == gameseq[idx]){
        if (userSeq.length==gameseq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        if (level > highScore) {
            highScore = level - 1; // -1 because level increments before game over
        }
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Press any key to start`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        
        reset();
    }
}
function btnPress(){
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);

}

let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    start=false;
    gameseq=[];
    userSeq=[];
    level=0;
}