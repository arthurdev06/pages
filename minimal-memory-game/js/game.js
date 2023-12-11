const grid = document.querySelector(".grid");
const turnCardSound = new Audio("../sounds/turn_card.wav");
const approvationSound = new Audio(
    "../sounds/aprovation.mp3"
);
const playAgainButton = document.querySelector(".play-again-button");
const winWindow = document.querySelector(".win-window");
const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");

const characters = [
    "Buster",
    "Gus",
    "Janet",
    "Jessei",
    "Lola",
    "Otis",
    "Penny",
    "Tara",
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

let firstCard = "";
let secondCard = "";

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll(".disabled-card");

    console.log("ok");

    if (disabledCards.length == 16) {
        approvationSound.play();
        clearInterval(this.loop);
        winWindow.style.display = "flex";
    }
};

const playAgain = () => {
    winWindow.style.display = "none";

    location.reload();
};

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute("data-character");
    const secondCharacter = secondCard.getAttribute("data-character");

    if (firstCharacter == secondCharacter) {
        firstCard.firstChild.classList.add("disabled-card");
        secondCard.firstChild.classList.add("disabled-card");

        firstCard = "";
        secondCard = "";

        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove("reveal-card");
            secondCard.classList.remove("reveal-card");

            firstCard = "";
            secondCard = "";
        }, 500);
    }
};

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes("reveal-card")) {
        return;
    }

    if (firstCard == "") {
        target.parentNode.classList.add("reveal-card");

        firstCard = target.parentNode;

        turnCardSound.play();
    } else if (secondCard == "") {
        target.parentNode.classList.add("reveal-card");

        secondCard = target.parentNode;

        turnCardSound.play();
        checkCards();
    }
};

const createCards = (character) => {
    const card = createElement("div", "card");
    const front = createElement("div", "face front");
    const back = createElement("div", "face back");

    front.style.backgroundImage = `url("..images/${character}.jpg")`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", revealCard);
    card.setAttribute("data-character", character);

    return card;
};

const loadGame = () => {
    const duplicateCharacters = [...characters, ...characters];

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
        const card = createCards(character);
        grid.appendChild(card);
    });
};

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
};

window.onload = () => {
    const playerName = localStorage.getItem("player");
    spanPlayer.innerHTML = `${playerName}`;

    startTimer();
    loadGame();
};

playAgainButton.addEventListener("click", playAgain);
