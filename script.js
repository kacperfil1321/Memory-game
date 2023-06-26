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
    
});