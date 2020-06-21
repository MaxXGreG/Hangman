let rope = '<img src="/img/hangman.png" alt="rope"></img>'
let head = '<img src="/img/head.png" alt="head">'
let body = '<img src="/img/headBody.png" alt="Body">'
let legs = '<img src="/img/legs.png" alt="legs">'
let hands = '<img src="/img/hands.png" alt="legs">'
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

function getRandom() {
    return Math.floor(Math.random()*30)
}

function startGame() {
    let word = getUnderscore(words[getRandom()])
    document.querySelector('#letters').innerHTML = word
}

function getUnderscore(cw) {
    let word = cw.split("")
    let underscores = ''
    for (let i = 0; i<word.length; i++) {
        underscores = underscores.concat("_ ")
    }
    return (underscores)
}

function letterGuess() {
    let letter = document.querySelector('#letterGuess').value

}