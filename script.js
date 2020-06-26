let rope = '<img src="/img/hangman.png" alt="rope"></img>'
let head = '<img src="/img/head.png" alt="head">'
let body = '<img src="/img/headBody.png" alt="Body">'
let hands = '<img src="/img/hands.png" alt="hands">'
let dead = '<img src="/img/dead.png" alt="dead">'
let score = 0;
let wg = 0
let uns;
let words = ["checkbook",
    "twister",
    "pencil",
    "glow", "stick",
    "toe", "ring",
    "thermometer",
    "lamp",
    "spoon",
    "paint", "brush",
    "food",
    "cork",
    "twezzers",
    "puddle",
    "pillow",
    "television",
    "radio",
    "rug",
    "chapter", "book",
    "button",
    "lamp", "shade",
    "outlet",
    "blouse",
    "beef",
    "needle",
    "desk",
    "plastic", "fork",
    "photo", "album",
    "tire", "swing",
    "rubber", "duck",
    "sand", "paper"
]
let w;

function getRandom() {
    return Math.floor(Math.random()*30)
}

function startGame() {
    if (localStorage.getItem('score')) {
        document.querySelector('#score').innerHTML = parseInt(localStorage.getItem('score'))
    } else {
        document.querySelector('#score').innerHTML = 0
    }

    let us;
    document.querySelector('#display').innerHTML = rope
    let word = getUnderscore(words[getRandom()])
    document.querySelector('#letters').innerHTML = word
    us = document.querySelector('#letters').innerHTML
    
    us = us.split(" ")
    us.pop()
    uns = us;
}

function getUnderscore(cw) {
    let word = cw.split("")
    let underscores = ''
    for (let i = 0; i<word.length; i++) {
        underscores = underscores.concat("_ ")
    }
    w = word;
    return underscores
}

function letterGuess() {
    let letter = document.querySelector('#letterGuess').value
    if(letter){    
        if(w.includes(letter)) {
            let correct = w.indexOf(letter)

            //Check if the letter repeats itself
            var count = 0;
            for(var i = 0; i<w.length; ++i){
            if(w[i] == letter) {
                count++
            }
            }

            if(count>1){
                var indices = []
                for(var i=0; i < w.length; ++i){
                    if(w[i] == letter) {
                        indices.push(i)
                        for(let i = 0; i<indices.length; i++) {
                            uns[indices[i]] = letter
                        }
                    } 
                }
            } else {
                uns[correct] = letter
            }
            uns = uns.join()
            uns = uns.replace(/,/g, " ")
            
            document.querySelector('#letters').innerHTML = uns
            if(!uns.includes('_')){
                if(parseInt(localStorage.getItem('score')) > 1) {
                    win(parseInt(localStorage.getItem('score')))
                } else {
                    win(0)
                }
            }
        } else { 
            uns = uns.join()
            uns = uns.replace(/,/g, " ")
            wg++
            incorrect(wg)
        }
        uns = uns.split(" ")
    } else {
        alert('Shouldn\'t be empty')
    }
}

function incorrect(wrongGuesses) {
    if(wrongGuesses == 1) {
        document.querySelector('#display').innerHTML = head
    } else if(wrongGuesses == 2) {
        document.querySelector('#display').innerHTML = body
    } else if(wrongGuesses == 3) {
        document.querySelector('#display').innerHTML = hands
    } else if(wrongGuesses == 4) {
        document.querySelector('#display').innerHTML = dead
        wg = 0
        alert('You died')
        location = location
    } 
}
var localStorage = localStorage in window
function win(s) {
    s++
    localStorage.setItem("score", s)
    location = location
}

// Event listeners
document.querySelector('#letterGuess').addEventListener('keypress', (e) => {
    if(e.keyCode == 13){
        letterGuess()
    }
})