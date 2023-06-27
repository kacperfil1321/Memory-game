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
    for(var i = 0; i < size; i++){
        gameContent = gameContent + '<div class="row">';
        for(var j = 0; j < size; j++){
            gameContent = gameContent + '<div class="point"></div>';
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
});