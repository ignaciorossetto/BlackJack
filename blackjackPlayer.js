// TENGO QUE ARREGLAR LOS MENSAJES DE ACUERDO A LOS RESULTADOS DEL CASINO Y PLAYER... PERO VA BIEN

let message 
let sum = 0
let sumB = 0

let hasBlackJack = false
let isAlive = false
let casinosTurn = false
let gameFinished = false

let player = {
    name: "Nacho",
    chips: 150,
    turn: false
}
let cardMsg = document.getElementById('cards-msg')
let sumMsg = document.getElementById("sum-msg")
let messageEl = document.getElementById("message-el")

let playerInfo = document.getElementById("player-info")

let cardBMsg = document.getElementById('cardsB-msg')
let sumBMsg = document.getElementById("sumB-msg")

let cardsA = []
let cardsB = []


function getRandomCard() {
    let num = Math.floor(Math.random()*13) +1
    console.log(num)

    if (num === 11 || num === 12 || num === 13) {
        return 10
    } else if (num === 1) {
        return 11
    } else {
        return num
    }
}

function startGame() {

    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    player.turn = true

    let firstCardB = getRandomCard()

    sum = firstCard + secondCard
    sumB = firstCardB
    cardsA = [firstCard, secondCard]
    cardsB = [firstCardB]

    renderGame()
}


function renderGame() {

    cardMsg.innerText = "Cards: "
    sumMsg.innerText = "Sum: " + sum

    for (i = 0; i < cardsA.length; i++) {
        cardMsg.innerText += " " + cardsA[i] + " " 
    }

    cardBMsg.innerText = "Casino cards: "
    sumBMsg.innerText = "Casino sum: " + sumB

    for (i = 0; i < cardsB.length; i++) {
        cardBMsg.innerText += " " + cardsB[i] + " " 
    }

    playerInfo.innerText = "Name: " + player.name + " / " + "Chips: " + player.chips


    if(player.turn === true && casinosTurn === false) {
        if (sum <= 20) {
            message = "Do you want to draw an other card?"
            console.log(sum)
        } else if (sum === 21) {
            message = "Wohoo! You've got blackjack!"
            hasBlackJack = true
            console.log(sum)
        } else {
            message = "You're out of the game!"
            isAlive = false
            console.log(sum)
        }
    }

    if(player.turn === false && casinosTurn === true) {
        if (sum < sumB && sumB <= 21) {
            message = "Casino won!!"
            player.chips = player.chips - 10
            gameFinished = true
        } else if (sum > sumB) {
            message = "Player won!!"
            player.chips = player.chips + 10
            gameFinished = true
        } else if (sum === sumB) {
            message = "You're even!!"
            gameFinished = true
        } else if(sum < sumB && sumB > 21) {
            message = "Player won!!"
            player.chips = player.chips + 10
            gameFinished = true
        } else if (gameFinished = true) {
            player.turn = false
            casinosTurn = false
        }
    }

    messageEl.innerText = message

}


function takeNewCard() {
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


function takeNewCardB() {
    let card = getRandomCard()
    cardsB.push(card)
    sumB = sumB + card
    console.log("The card picked is..." + card)
    console.log("SumB is..." + sumB)
    renderGame()
    stop()    
}

function stop() {
    player.turn = false
    casinosTurn = true
    if (sumB < 17) {
        takeNewCardB()
    } else if (sumB >= 17  && sumB < 22) {
        console.log("compare results!!")
    } else {
        console.log("You win!!!")
    }
}

