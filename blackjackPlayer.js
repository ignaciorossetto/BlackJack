// TENGO QUE ARREGLAR LOS MENSAJES DE ACUERDO A LOS RESULTADOS DEL CASINO Y PLAYER... PERO VA BIEN
// TENGO QUE AREGLAR LA LOGICA DE LOS BOTONES Y BOOL VARIABLES... 
// CREO QUE HAY QUE ELIMINAR VARIABLES, UNIR FUNCIONES Y ACHICAR EL CODIGO... LA LOGICA DEL JUEGO YA ESTA ARMADA.. FALTA LA DE BOTONES

let message
let sum = 0
let sumB = 0

let hasBlackJack = false
let isAlive = false
let casinosTurn = false
let gameFinished = false
let stopButtonAvailable = false
let playerWon = false

let player = {
    name: "Nacho",
    chips: 150,
    turn: false
}

let cardMsg = document.getElementById('cards-msg')
let sumMsg = document.getElementById("sum-msg")
let messageEl = document.getElementById("message-el")

let playerName = document.getElementById("player-name")
let playerChips = document.getElementById("player-chips")

let cardBMsg = document.getElementById('cardsB-msg')
let sumBMsg = document.getElementById("sumB-msg")

let cardsA = []
let cardsB = []


function getRandomCard() {
    let num = Math.floor(Math.random() * 13) + 1
    console.log(num)

    if (num === 11 || num === 12 || num === 13) {
        return 10
    } else if (num === 1) {
        return 11
    } else {
        return num
    }
}


function restartGame() {



}

// Want to play?
// Cards:
// Sum:
// Casino Cards:
// Casino Sum:




function startGame() {

    isAlive = true
    hasBlackJack = false
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    player.turn = true
    casinosTurn = false
    stopButtonAvailable = true
    playerWon = false

    let firstCardB = getRandomCard()

    sum = firstCard + secondCard
    sumB = firstCardB
    cardsA = [firstCard, secondCard]
    cardsB = [firstCardB]

    renderGame()
}


function renderGame() {


    cardMsg.innerText = "Cards:"

    cardBMsg.innerText = "Casino cards: "
    sumBMsg.innerText = "Casino sum: " + sumB

    playerName.innerText = "Name: " + player.name
    playerChips.innerText = "Chips: " + player.chips


    for (i = 0; i < cardsA.length; i++) {
        cardMsg.innerText += " " + cardsA[i] + " "
    }


    for (i = 0; i < cardsB.length; i++) {
        cardBMsg.innerText += " " + cardsB[i] + " "
    }


    if (player.turn === true && casinosTurn === false) {
        if (sum <= 20) {
            message = "Do you want to draw an other card?"
            sumMsg.innerText = "Sum: " + sum
            console.log(sum)
        } else if (sum === 21) {
            message = "Wohoo! You've got blackjack!"
            sumMsg.innerText = "Sum: " + sum
            hasBlackJack = true
            console.log(sum)
        } else {
            message = "You're out of the game!"
            sumMsg.innerText = "Sum: " + sum
            isAlive = false
            stopButtonAvailable = false
            chips()
            console.log(sum)
        }
    }

    if (player.turn === false && casinosTurn === true) {
        if (sum < sumB && sumB <= 21) {
            message = "Casino won!!"
            isAlive = false
            gameFinished = true
            // chips()
        } else if (sum > sumB) {
            message = "Player won!!"
            playerWon = true
            stopButtonAvailable = false
            // chips()
        } else if (sum === sumB) {
            message = "You're even!!"
            gameFinished = true
        } else if (sum < sumB && sumB > 21) {
            message = "Player won!!"
            playerWon = true
            stopButtonAvailable = false
            // chips()
        } else if (gameFinished = true) {
            player.turn = false
            casinosTurn = false
            renderGame()
        }
    }

    messageEl.innerText = message

}


function takeNewCard() {
    if (gameFinished === false) {
        if (isAlive === true && hasBlackJack === false) {
            let card = getRandomCard()
            cardsA.push(card)
            sum = sum + card
            console.log("The card picked is..." + card)
            renderGame()
        } else {
            console.warn("You cant pick a new card!!")
        }
    }
}


function takeNewCardB() {
    let card = getRandomCard()
    cardsB.push(card)
    sumB += card
    console.log("The card picked is..." + card)
    console.log("SumB is..." + sumB)
    renderGame()
    stop()
}

function stop() {
    if (stopButtonAvailable) {
        player.turn = false
        casinosTurn = true
        if (sumB < 17) {
            takeNewCardB()
        } else if (sumB >= 17 && sumB < 22) {
            compare()
        } else {
            playerWon = true
            chips()
            console.log("You win!!!")
        }
    }
}

function chips() {
    if (isAlive === false) {
        player.chips -= 10
        return playerChips.innerText = "Chips: " + player.chips
    }
    if (playerWon === true) {
        player.chips += 10
        return playerChips.innerText = "Chips: " + player.chips
    }
}

function compare() {
    if (sum > sumB) {
        gameFinished = true
        playerWon = true
        chips()
        console.log("You win!!")
    } else if (sum < sumB) {
        gameFinished = true
        isAlive = false
        chips()
        console.log("You lost!!")
    }
}

