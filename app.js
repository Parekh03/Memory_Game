const cardArray = [
    {
        name: "fries",
        img: "./images/fries.png"
    },

    {
        name: "cheeseburger",
        img: "./images/cheeseburger.png"
    },

    {
        name: "hotdog",
        img: "./images/hotdog.png"
    },

    {
        name: "ice-cream",
        img: "./images/ice-cream.png"
    },

    {
        name: "milkshake",
        img: "./images/milkshake.png"
    },

    {
        name: "pizza",
        img: "./images/pizza.png"
    }
]

let idWithCardName = [] // stores the card details for the grid

const grid = document.querySelector(".grid")
let cardsChosen = [] // stores the cards chosen by the user 
let ids = [] // stores the ids of the divs clicked 
let score = 0
let cardsMatched = [] // stores ids of the cards matched
const result = document.querySelector("#result")

function createBoard() {
    let id = 0
    for (let i = 0; i < 6; i++) {
        cardArray.sort(() => 0.5 - Math.random())
        let index = 0
        for (let j = 0; j < 6; j++) {
            let element = document.createElement("img")
            element.src = "./images/blank.png"
            element.classList.add("grid-element")
            element.setAttribute("id", id++)
            idWithCardName.push(cardArray[index++].name)
            grid.append(element)
            element.addEventListener("click", flipCard)
        }
    }
}

function flipCard() {
    const id = this.getAttribute("id"); // ID of clicked card

    // Prevent selecting the same card twice
    if (ids.includes(id)) {
        return;
    }

    const cardName = idWithCardName[id]; // Name of card clicked
    cardsChosen.push(cardName);
    ids.push(id);

    this.src = `./images/${cardName}.png`; // Display the image

    if (cardsChosen.length === 2) {
        checkScore()
    }
}


function checkScore() {
    let imgs = document.querySelectorAll(".grid-element")
    if (cardsChosen[0] === cardsChosen[1]) {
        // Matched pair
       setTimeout(() => {
        for (let id of ids) {
            imgs[id].setAttribute("src", "./images/white.png");
            imgs[id].removeEventListener("click", flipCard);
            cardsMatched.push(id);
        }
       }, 350);
        score++;
    } else {
        // Not matched, flip back after delay
        setTimeout(() => {
            for (let id of ids) {
                imgs[id].src = "./images/blank.png";
            }
        }, 350);
    }

    // Reset selections after checking the score
    setTimeout(() => {
        ids = [];
        cardsChosen = [];
    }, 350);

    result.innerText = `Score: ${score}`

    // Check if the game is over
    if (score==18) {
        setTimeout(() => {
            alert("Congratulations! You won!");
            location.reload(); // Refresh the page after user clicks "OK"
        }, 350);
    }
}

createBoard();