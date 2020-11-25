console.log('Welcome to the %cMAZE!', `
font-size:40px;
color:tomato;
font-weight:bold;
text-shadow:2px 3px white;
animation:animate 1s ease-in-out infinite;
`)

console.log('%c.', `
padding:30px 450px;
background-size:contain;
background-image:url('https://media.giphy.com/media/Rm9RzjSAfXm4o/giphy.gif');
`)


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


function randomNbr(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let completed_level_count = 1;
let startposx;
let startposy;
//define start position of player
let player_current_pos_x
let player_current_pos_y
let player

function generate_level() {
    startposx = randomNbr(1, 12)
    startposy = randomNbr(1, 11)
    let endposx = randomNbr(startposx + 1, 13)
    let endposy = randomNbr(1, 11)
    let posX_table = [startposx, endposx]
    let posY_table = [startposy, endposy]

    function incrementposX(x, y) {
        if (x < endposx) {
            x++;
            posX_table.unshift(x)
            posY_table.unshift(y)
            // console.log('incremented x', x);
        } else {
            x--;
            posX_table.unshift(x)
            posY_table.unshift(y)
            // console.log('decremented x', x);
        }
    }

    function incrementposY(x, y) {
        if (y < endposy) {
            y++;
            posY_table.unshift(y)
            posX_table.unshift(x)
            // console.log('incremented y', y);
        } else {
            y--;
            posY_table.unshift(y)
            posX_table.unshift(x)
            // console.log('decremented y', y);
        }
    }

    let dist = (endposx - startposx) + (Math.abs((endposy - startposy))) + Math.abs((endposx + endposy) - (startposx + startposy))
    console.log('this is dist', dist);

    for (i = 0; i <= (dist); i++) {
        if (posX_table[0] != endposx && posY_table[0] != endposy) {
            let rand = Math.floor(Math.random() * 2)
            if (rand < 1) {
                incrementposX(posX_table[0], posY_table[0])
            } else {
                incrementposY(posX_table[0], posY_table[0])
            }
        } else if (posX_table[0] != endposx) {
            incrementposX(posX_table[0], posY_table[0])
        } else if (posY_table[0] != endposy) {
            incrementposY(posX_table[0], posY_table[0])
        } else {
            i = dist;
        }
        //console.log('i =', i)
    }

    let arr = [];
    for (i = 0; i < 143; i++) {
        // console.log('path Normal at ' + i);
        let random = Math.floor(Math.random() * 3)
        random < 2 ? arr.push('*') : arr.push('.');
    }
    for (y = 0; y < posX_table.length; y++) {
        if (y == posX_table.length - 2) {
            let res = posX_table[y] + ((posY_table[y] * 13) - 13)
            arr.splice(res - 1, 1, 'S')
        } else if (y == posX_table.length - 1) {
            let res = posX_table[y] + ((posY_table[y] * 13) - 13)
            arr.splice(res - 1, 1, 'T')
        } else {
            let res = posX_table[y] + ((posY_table[y] * 13) - 13)
            console.table(posX_table[y], posY_table[y], res)
            arr.splice(res - 1, 1, '.')
        }
    }
    let arr_splitter_counter = 0
    const multi_arr = [];
    for (elem of arr) {
        arr_splitter_counter < 13 ? multi_arr.push(elem) + arr_splitter_counter++ : multi_arr.push('\n', elem) + (arr_splitter_counter = 1);
    }
    const final_arr = multi_arr.join("");
    return final_arr;
}


let current_level = 1;

function load_level() {
    if (current_level < 2) {
        startposx = 2;
        startposy = 2;
        use_level = multiline;
    } else {
        use_level = generate_level();
    }
    current_level++

    for (i = 0; i < 11; i++) {
        let section = document.createElement('section')
        section.className = 'section';
        //console.log(document.body.firstElementChild, "THIS IS THE FIRST CHILD")
        document.body.insertBefore(section, document.body.firstElementChild);
    }
    let player_posx
    let player_posy
    let current_section = 1;
    let nbr_of_tiles_per_section = 0;


    for (i = 0; i < use_level.length; i++) {
        let a = use_level[i].split('');
        if (a == " ") {
            i++
            a = use_level[i].split('');
        }
        if (a == "*") {
            let create_div = document.createElement('div');
            create_div.className = 'wall'
            document.querySelector("body > section:nth-child(" + current_section + ")").appendChild(create_div)
        } else if (a == ".") {
            let create_div = document.createElement('div');
            create_div.className = 'path'
            document.querySelector("body > section:nth-child(" + current_section + ")").appendChild(create_div)
        } else if (a == "S") {
            let create_div = document.createElement('div');
            create_div.className = 'start'
            player_posx = i
            player_posy = current_section
            document.querySelector("body > section:nth-child(" + current_section + ")").appendChild(create_div)
        } else if (a == "T") {
            let create_div = document.createElement('div');
            create_div.className = 'end'
            document.querySelector("body > section:nth-child(" + current_section + ")").appendChild(create_div)
        }
        nbr_of_tiles_per_section++
        if (nbr_of_tiles_per_section == 14 && current_section <= 11) {
            current_section++
            nbr_of_tiles_per_section = 0
        }
    }
    create_player();
    //define start position of player
    player_current_pos_x = startposx;
    player_current_pos_y = startposy;
    create_rainbow();
}

function reset_map() {
    console.log('i entered reset');

    for (i = 1; i < 12; i++) {

        let hi = document.body.querySelectorAll(".section");
        document.body.removeChild(hi[0]);
        //console.log('Ive dealt with', i);

    }
}

load_level();

//Function takes in position x and y and then returns the correct path for it's tile
function player_pos(pos_x, pos_y) {
    //console.table([pos_x, pos_y]);
    return document.querySelector("body > section:nth-child(" + pos_y + ")" + "> div:nth-child(" + pos_x + ")")
}
//creates rainbow on user position and on user landing position
function create_rainbow() {
    player_pos(player_current_pos_x, player_current_pos_y).classList.remove('path')
    player_pos(player_current_pos_x, player_current_pos_y).classList.remove('start')
    player_pos(player_current_pos_x, player_current_pos_y).classList.add('path_rainbow')
}


//instantiate player
function create_player() {
    let create_player = document.createElement('div')
    create_player.className = 'player'
    document.querySelector('.start').appendChild(create_player);
    player = document.querySelector('.player')
}
create_rainbow();


document.addEventListener('keydown', function (event) {
    let target = event.code;
    if (target == 'ArrowUp') {
        //first section is nthchild 1
        if (player_current_pos_y - 1 < 1) {
            console.log('hit a wall');
        } else if (player_pos(player_current_pos_x, player_current_pos_y - 1).classList.contains('wall')) {
            console.log('hit a wall');
        } else {
            console.log('moved up');
            player_current_pos_y--
            player_pos(player_current_pos_x, player_current_pos_y).appendChild(player);
            create_rainbow();
        }
    } else if (target == 'ArrowRight') {

        if (player_pos(player_current_pos_x + 1, player_current_pos_y).classList.contains('wall')) {
            console.log('hit a wall');
        } else {
            console.log('moved right');
            player_current_pos_x++
            player_pos(player_current_pos_x, player_current_pos_y).appendChild(player);
            create_rainbow();
        }
    } else if (target == 'ArrowDown') {
        //SHOULD create a variable for section.length ||||| 12 == last section
        if (player_current_pos_y == 12) {
            console.log('hit a wall');
        } else if (player_pos(player_current_pos_x, (player_current_pos_y + 1)).classList.contains('wall')) {
            console.log('hit a wall');
        } else {
            console.log('moved down');
            player_current_pos_y++
            player_pos(player_current_pos_x, player_current_pos_y).appendChild(player);
            create_rainbow();
        }
    } else if (target == 'ArrowLeft') {

        if (player_pos(player_current_pos_x - 1, player_current_pos_y).classList.contains('wall')) {
            console.log('hit a wall');
        } else {
            console.log('moved left');
            player_current_pos_x--
            player_pos(player_current_pos_x, player_current_pos_y).appendChild(player);
            create_rainbow();
        }

    }
    if (player_pos(player_current_pos_x, player_current_pos_y).classList.contains('end')) {
        alert('winner winner chicken dinner');
        completed_level_count++;
        document.getElementById('current_level').innerHTML = 'Current level : ' + completed_level_count;
        reset_map();
        load_level();
    }
})



let h1 = document.createElement('h1');
h1.innerHTML = "Amazing"
document.body.appendChild(h1);
let h2 = document.createElement('h2');
h2.innerHTML = "Current level : " + completed_level_count;
h2.id = 'current_level'
document.body.appendChild(h2);

let audio = document.createElement('audio');
audio.controls = true;
audio.autoplay = true;
audio.loop = true;
audio.volume = 0.02;
audio.style = 'width:240px';
document.querySelector('body').appendChild(audio)
let source = document.createElement('source');
source.src = '/music/nyan.mp3'
audio.appendChild(source)
let source2 = document.createElement('source');
source2.src = '/music/nyan.ogg'
audio.appendChild(source2);


// var startTime = new Date;
// var currentTime = new Date;
// var seconds;
// function timer() {
//     currentTime = new Date;
//     seconds = parseFloat((currentTime - startTime) / 1000).toFixed(1);
//     console.log(document.querySelector("body > div").innerText);
//     console.log(seconds);
// }
// timer();