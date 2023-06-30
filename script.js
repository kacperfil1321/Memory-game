var theme = 0, players = 0, size = 0;

function startPanel(x, y){
    switch(x){
        case 0:
            theme = y;
            break;
        case 1:
            players = y;
            break;
        case 2:
            size = y;
            break;
    }
    document.getElementsByClassName('choice')[x].getElementsByClassName('active')[0].classList.remove('active');
    document.getElementsByClassName('choice')[x].getElementsByTagName('button')[y].classList.add('active');
}

var timer;

document.getElementById('startGame').addEventListener('click', function (){
    //Number of players
    if(players == 0){
        document.getElementById('singlePlayer').style.display = 'flex';
        document.getElementById('multiPlayer').style.display = 'none';
    }
    else{
        document.getElementById('singlePlayer').style.display = 'none';
        document.getElementById('multiPlayer').style.display = 'flex';
        if(players == 1){
            document.getElementById('multiPlayer').getElementsByClassName('box')[2].style.display = 'none';
            document.getElementById('multiPlayer').getElementsByClassName('box')[3].style.display = 'none';
        }
        else{
            if(players == 2){
                document.getElementById('multiPlayer').getElementsByClassName('box')[2].style.display = 'flex';
                document.getElementById('multiPlayer').getElementsByClassName('box')[3].style.display = 'none';
            }
            else{
                document.getElementById('multiPlayer').getElementsByClassName('box')[2].style.display = 'flex';
                document.getElementById('multiPlayer').getElementsByClassName('box')[3].style.display = 'flex';
            }
        }
    }

    //Grid size
    document.getElementById('gameStartPanel').style.display = 'none';
    document.getElementById('game').style.display = 'flex';

    if(size == 0){
        size = 4;
    }
    else{
        size = 6;
    }
    var gameContent = '';
    var k = 0;
    for(var i = 0; i < size; i++){
        gameContent = gameContent + '<div class="row">';
        for(var j = 0; j < size; j++){
            gameContent = gameContent + '<div class="point" onclick="pointCheck(' + k + ')"></div>';
            k++;
        }
        gameContent = gameContent + '</div>';
    }
    document.getElementById('gameContent').innerHTML = gameContent;
    for(var i = 0; i < size; i++){
        document.getElementsByClassName('row')[i].style.height = 'calc(100% / ' + size + ')';
    }

    //Theme
    var point = document.getElementsByClassName('point');

    if(size == 4){
        var pairs = 8;
    }
    else{
        var pairs = 18;
    }

    for(var j = 0; j < 2; j++){
        for(var i = 0; i < pairs; i++){
            var done = 0;
            do{
                var random = Math.floor(Math.random() * point.length);
                if(point[random].innerText == ''){
                    point[random].innerText = i;
                    done = 1;
                }
            }
            while(done == 0);
        }
    }

    if(theme == 1){
        for(var i = 0; i < point.length; i++){
            var number = parseInt(point[i].innerText);
            switch(number){
                case 0:
                    var icon = '<ion-icon name="airplane"></ion-icon>';
                    break;
                case 1:
                    var icon = '<ion-icon name="accessibility"></ion-icon>';
                    break;
                case 2:
                    var icon = '<ion-icon name="balloon"></ion-icon>';
                    break;
                case 3:
                    var icon = '<ion-icon name="bowling-ball"></ion-icon>';
                    break;
                case 4:
                    var icon = '<ion-icon name="bulb"></ion-icon>';
                    break;
                case 5:
                    var icon = '<ion-icon name="call"></ion-icon>';
                    break;
                case 6:
                    var icon = '<ion-icon name="camera"></ion-icon>';
                    break;
                case 7:
                    var icon = '<ion-icon name="car"></ion-icon>';
                    break;
                case 8:
                    var icon = '<ion-icon name="construct"></ion-icon>';
                    break;
                case 9:
                    var icon = '<ion-icon name="diamond"></ion-icon>';
                    break;
                case 10:
                    var icon = '<ion-icon name="fish"></ion-icon>';
                    break;
                case 11:
                    var icon = '<ion-icon name="flash"></ion-icon>';
                    break;
                case 12:
                    var icon = '<ion-icon name="football"></ion-icon>';
                    break;
                case 13:
                    var icon = '<ion-icon name="game-controller"></ion-icon>';
                    break;
                case 14:
                    var icon = '<ion-icon name="lock-closed"></ion-icon>';
                    break;
                case 15:
                    var icon = '<ion-icon name="musical-notes"></ion-icon>';
                    break;
                case 16:
                    var icon = '<ion-icon name="paw"></ion-icon>';
                    break;
                case 17:
                    var icon = '<ion-icon name="skull"></ion-icon>';
                    break;
            }
            point[i].innerHTML = icon;
        }
    }
    //Time start
    var time = 0, m, s;
    timer = setInterval(function (){
        time = time + 1;
        s = time % 60;
        if(s < 10){
            s = '0' + s;
        }
        m = Math.floor(time / 60);
        document.getElementById('time').innerText = m + ':' + s;
    }, 1000);
});

var guessed = [], first = -1, firstId, secondId, ready = 1, moves = 0, turn = 0;
var points = [0, 0, 0, 0];
var point = document.getElementsByClassName('point');

function pointCheck(x){
    if(!guessed.includes(point[x].innerHTML) && ready == 1 && firstId != x){
        point[x].style.setProperty('--bgcolor', 'transparent');
        point[x].style.backgroundColor = '#FDA214';

        if(first == -1){
            first = point[x].innerHTML;
            firstId = x;
        }
        else{
            ready = 0;
            secondId = x;

            if(first == point[x].innerHTML){
                guessed.push(point[x].innerHTML);
                points[turn]++;
                document.getElementById('multiPlayer').getElementsByClassName('points')[turn].innerText = points[turn];
                if(guessed.length == point.length / 2){
                    //end game
                    clearInterval(timer);
                    document.getElementById('endPanel').style.display = 'flex';
                    if(players == 0){
                        document.getElementById('mainText').innerText = 'You did it!';
                        document.getElementById('text').innerText = "Game over! Here's how you got on...";
                        document.getElementById('contentBox').innerHTML = '' +
                        '<div class="box">' +
                            '<div class="text">Time Elapsed</div>' +
                            '<div class="value">' + document.getElementById('time').innerText + '</div>' +
                        '</div>' +
                        '<div class="box">' +
                            '<div class="text">Moves Taken</div>' +
                            '<div class="value">' + (moves + 1) + '</div>' +
                        '</div>';
                    }
                    else{
                        var max = Math.max(...points), winner = 0, winnerId;
                        
                        document.getElementById('contentBox').innerHTML = '';
                        for(var i = 0; i < players + 1; i++){
                            if(points[i] == max){
                                document.getElementById('contentBox').innerHTML += '' +
                                '<div class="box winner">' +
                                    '<div class="text">Player ' + (i + 1) + ' (Winner!)</div>' +
                                    '<div class="value">' + points[i] + ' Pairs</div>' +
                                '</div>';
                                winner++;
                                winnerId = i + 1;
                            }
                            else{
                                document.getElementById('contentBox').innerHTML += '' +
                                '<div class="box">' +
                                    '<div class="text">Player ' + (i + 1) + '</div>' +
                                    '<div class="value">' + points[i] + ' Pairs</div>' +
                                '</div>';
                            }
                        }

                        if(winner > 1){
                            document.getElementById('mainText').innerText = "It's a tie!";
                        }
                        else{
                            document.getElementById('mainText').innerText = "Player " + winnerId + " Wins!";
                        }
                        document.getElementById('text').innerText = "Game over! Here are the results...";

                        var box = document.getElementById('contentBox').getElementsByClassName('box');

                        for(var i = 0; i < box.length - 1; i++){
                            for(var j = 0; j < box.length - 1; j++){
                                if(parseInt(box[j].getElementsByClassName('value')[0].innerText) < parseInt(box[j + 1].getElementsByClassName('value')[0].innerText)){
                                    var temp = box[j].outerHTML;
                                    box[j].outerHTML = box[j + 1].outerHTML;
                                    box[j + 1].outerHTML = temp;
                                }
                            }
                        }
                    }
                }
            }
            else{
                setTimeout(function (){
                    point[firstId].style.setProperty('--bgcolor', '#304859');
                    point[secondId].style.setProperty('--bgcolor', '#304859');
                }, 500);
            }

            setTimeout(function (){
                point[firstId].style.backgroundColor = '#BCCED9';
                point[secondId].style.backgroundColor = '#BCCED9';
                ready = 1;
                firstId = -1;
            }, 500);

            if(players == 0){
                moves++;
                document.getElementById('moves').innerText = moves;
            }
            else{
                turn++;
                if(turn == players + 1){
                    turn = 0;
                }
                document.getElementById('multiPlayer').getElementsByClassName('active')[0].classList.remove('active');
                document.getElementById('multiPlayer').getElementsByClassName('box')[turn].classList.add('active');
            }

            first = -1;
        }
    }
}