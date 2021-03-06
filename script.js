let rope = '<img src="/img/hangman.png" alt="rope"></img>'
let head = '<img src="/img/head.png" alt="head">'
let body = '<img src="/img/headBody.png" alt="Body">'
let leftHand = '<img src="/img/leftHand.png" alt="leftHand">'
let bothHands = '<img src="/img/hands.png" alt="hands">'
let leftLeg = '<img src="/img/leftLeg.png" alt="leftLeg">'
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
                if(parseInt(localStorage.getItem('score')) >= 1) {
                    win(parseInt(localStorage.getItem('score')))
                } else {
                    win(0)
                }
            }
        } else { 
            document.querySelector('.guessedLetters').insertAdjacentHTML('afterbegin', `<span>${letter}</span>`)
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
        document.querySelector('#display').innerHTML = leftHand
    } else if(wrongGuesses == 4) {
        document.querySelector('#display').innerHTML = bothHands
    } else if(wrongGuesses == 5) {
        document.querySelector('#display').innerHTML = leftLeg
    } else if(wrongGuesses == 6) {
        document.querySelector('#display').innerHTML = dead
        wg = 0
        alert('You died, the word was '+ w.join().replace(/,/g, "") +'!')
        localStorage.setItem("score", 0)
        location = location
    } 
}

function guessWord() {
    let guessedWord = document.querySelector('#wordGuess').value.split("")
    let wrong = 0
    if(guessedWord.length>=1){
        //let correct = 0
        if(guessedWord.length != w.length) {
            wrong ++
        } else {
            for(let i = 0; i<guessedWord.length; i++) {
                if(guessedWord[i] === w[i]) {
                    wrong += 0
                } else {
                    wrong++
                }
            }
        }
        if(wrong == true) {
            wg++
            incorrect(wg)
        } else {
            if(parseInt(localStorage.getItem('score')) >= 1) {
                win(parseInt(localStorage.getItem('score')))
            } else {
                win(0)
            }
        }
    } else {
        alert('Shouldn\'t be empty')
    }
}

var localStorage = localStorage in window
function win(s) {
    s++
    localStorage.setItem("score", s)
    location = location
}

function clearScore() {
    if (confirm('Are you sure you want to remove your score?')) {
        localStorage.setItem('score', 0)
        document.querySelector('#score').innerHTML = parseInt(localStorage.getItem('score'))  
    }
}

// Event listeners
document.querySelector('#letterGuess').addEventListener('keypress', (e) => {
    if(e.keyCode == 13){
        letterGuess()
    }
})

document.querySelector('#wordGuess').addEventListener('keypress', (e) => {
    if(e.keyCode == 13){
        guessWord()
    }
})