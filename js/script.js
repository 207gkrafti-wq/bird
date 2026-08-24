'use strict'
document.addEventListener('DOMContentLoaded', ()=>{

    const place = document.getElementById('place');
    const bird = document.getElementById('bird');
    const barrier = document.getElementById('barrier');
    const score = document.querySelectorAll('#score');

    const menu = document.getElementById('menu');
    const start = document.getElementById('start');
    const reset = document.getElementById('reset');
    const play = document.getElementById('play');
    const pause = document.getElementById('pause');
    const gamePlay = document.getElementById('gamePlay');
    const gameStop = document.getElementById('gameStop');

    
    let move = (place.clientHeight-bird.clientHeight)/2;
    let birdSize = [0, bird.clientHeight];
    const placeBord = [0,place.clientHeight];
    

    let scoreCount = 0;

    let barrierZone = barrier.clientWidth;

    let speedBar = 2;

    let game = false;

    start.addEventListener('click',function() {
        game=true;
        menu.style.display='none';
        gameStop.style.display='none';
        pause.style.display='inline-block';
        createBar()
        moveBird()
    })

    pause.addEventListener('click',function() {
        menu.style.display='flex';
        gamePlay.style.display='flex';
        pause.style.display='none';
        game=false;
    })

    play.addEventListener('click',function() {
        game=true;
        menu.style.display='none';
        gamePlay.style.display='flex';
        pause.style.display='inline-block';
        moveBird()
        moveBar()
    })
    reset.addEventListener('click', () => {location.reload()})

    
    document.addEventListener('click', ()=>{
        if(!game) return;
        move-=120;
    });
    document.addEventListener('keydown',(event)=>{
        if(!game) return;
        if (event.keyCode===32) {
            move-=120;
        }
    })
    

    function moveBird() {
        if(!game) return;
        // console.log(move)
        bird.style.transform=`translateY(${move}px)`;
        move+=4;
        
        checkBird()
        requestAnimationFrame(moveBird);
    };

    function checkBird() {
        if (move >= placeBord[1]-birdSize[1]) {
            move=placeBord[1]-birdSize[1]
        }else if(move <= placeBord[0]-birdSize[0]){
            move=placeBord[0]-birdSize[0]
        }
    }

    function createBar() {
        for(let i=1; i <= 999;i++){

            let randBar = Math.floor(Math.random()*4)+2;
            let bar = document.createElement('div');
            bar.classList='bar';
            bar.id='bar';
            barrier.style.gridTemplateColumns=`repeat(${i}, 150px)`;
            barrier.appendChild(bar);

            for(let k=1; k <= 6;k++){
                
                let elem = document.createElement('div');
                elem.classList='elem';
                if (randBar==k) {
                    elem.classList.add('void')
                    elem.id='void';
                }
                bar.appendChild(elem)
            }
        }
        moveBar()
    }

    function moveBar() {
        if(!game) return;
        barrierZone-=speedBar;
        barrier.style.transform=`translateX(${barrierZone}px)`;
        checkBar()
        requestAnimationFrame(moveBar);
    }

    function checkBar() {
        let elements = document.querySelectorAll('#bar');
        let elemVoid = document.querySelectorAll('#void');

        let birdZone = bird.getBoundingClientRect()
        let placeZone = place.getBoundingClientRect()

        if (placeZone.height <= birdZone.bottom) {
            gameOver()
        }
        
        elements.forEach((bar, index)=>{
            let barZone = bar.getBoundingClientRect()
            let elem = elemVoid[index].getBoundingClientRect();
            
            if (barZone.left <= birdZone.right-20 && birdZone.left+20 <= barZone.right) {
                
                if (elem.bottom <= birdZone.bottom-20 || birdZone.top+20 <= elem.top) {
                    gameOver()
                }else{
                    checkScore(index);
                }
                

            }


        })
    }

    function gameOver() {
        game=false
        play.style.display='none';
        menu.style.display='flex';
        gamePlay.style.display='flex';
        pause.style.display='none';
    }

    function checkScore(index) {
        if (index==scoreCount) {
            scoreCount++;
            score.forEach((elem)=>{
                elem.textContent=`Счет: ${scoreCount}`;
            })
        }
    }

    
    
});

 