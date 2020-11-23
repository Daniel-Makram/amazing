const multiline = `***********.* 
*S.....**.*.T
*****.....*.*
*****.***.*.*
*****.*****.*
*****.*****.*
*****.......*
*****.*******
*.........***
*.******...**
*....********`

for (i = 0; i < 12; i++) {
    let section = document.createElement('section')
    section.id = i
    document.body.appendChild(section);
}

let id = 0;
let y = 0;

for (i = 0; i < multiline.length; i++) {
    let a = multiline[i].split('');
    if (a == " ") {
        i++
        a = multiline[i].split('');
    }
    if (a == "*") {
        let create_div = document.createElement('div');
        create_div.className = 'wall'
        document.getElementById(id).appendChild(create_div)
    } else if (a == ".") {
        let create_div = document.createElement('div');
        create_div.className = 'path'
        document.getElementById(id).appendChild(create_div)
    } else if (a == "S") {
        let create_div = document.createElement('div');
        create_div.className = 'start'
        document.getElementById(id).appendChild(create_div)
    } else if (a == "T") {
        let create_div = document.createElement('div');
        create_div.className = 'end'
        document.getElementById(id).appendChild(create_div)
    }
    y++
    if (y == 14 && id <= 10) {
        id++
        y = 0
    }
}

let create_player=document.createElement('div')
create_player.className='player'
document.querySelector('.start').appendChild(create_player);
let player=document.querySelector('.player')

let current_pos_x=2;
let current_pos_y=1;

document.addEventListener('keydown', function (event) {
    let target = event.code;
    if (target == 'ArrowUp') {
        if(document.querySelector("#\\3"+(current_pos_y-1)+" > div:nth-child("+current_pos_x+")").classList.contains('wall')){
            console.log('hit a wall');
        }else{
            console.log('moved up');
            current_pos_y--
            document.querySelector("#\\3"+current_pos_y+ " > div:nth-child("+current_pos_x+")").appendChild(player);
        }
    } else if (target == 'ArrowRight') {
        if(document.querySelector("#\\3"+current_pos_y+" > div:nth-child("+(current_pos_x+1)+")").classList.contains('wall')){
            console.log('hit a wall');
        }else{
            console.log('moved right');
            current_pos_x++
            console.log(current_pos_x);
            document.querySelector("#\\3"+current_pos_y+ " > div:nth-child("+current_pos_x+")").appendChild(player);
        }
    } else if (target == 'ArrowDown') {
        if(document.querySelector("#\\3"+(current_pos_y+1)+" > div:nth-child("+current_pos_x+")").classList.contains('wall')){
            console.log('hit a wall');
        }else{
            console.log('moved down');
            current_pos_y++
            document.querySelector("#\\3"+current_pos_y+ " > div:nth-child("+current_pos_x+")").appendChild(player);
        }
    } else if (target == 'ArrowLeft') {
        if(document.querySelector("#\\3"+current_pos_y+" > div:nth-child("+(current_pos_x-1)+")").classList.contains('wall')){
            console.log('hit a wall');
        }else{
            console.log('moved left');
            current_pos_x--
            document.querySelector("#\\3"+current_pos_y+ " > div:nth-child("+current_pos_x+")").appendChild(player);
        }
    }
    if(current_pos_y==1 && current_pos_x==13){
        alert('winner winner chicken dinner')
    }
})