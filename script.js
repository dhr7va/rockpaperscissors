const btnRules = document.querySelector('.rules-btn');
const btnNext = document.querySelector('.next-btn');

const btnClose = document.querySelector('.close-btn');
const modalRules = document.querySelector('.modal');

const CHOICES = [
    { name: "paper", beats: "rock" },
    { name: "scissors", beats: "paper" },
    { name: "rock", beats: "scissors" },
];

const choiceButtons = document.querySelectorAll('.choice-btn');
const gameDiv = document.querySelector('.game');
const resultsDiv = document.querySelector('.results');
const resultDivs = document.querySelectorAll('.results-result');
const header = document.querySelector('.header');

const resultWinner = document.querySelector('.results-winner');
const resultText = document.querySelector('.results-text');

const playAgain = document.querySelector('.play-again');
const playAgain2 = document.querySelector('.play-again-2');


const computerScore = document.querySelector('.computer-score-number');
const yourScore = document.querySelector('.your-score-number');

const animation = document.querySelector('.congrats');
let computerScoreNo = 0;
let yourScoreNo = 0;

document.addEventListener('DOMContentLoaded', () => {
    const storedComputerScore = localStorage.getItem('computerScore');
    if (storedComputerScore) {
        computerScoreNo = JSON.parse(storedComputerScore);
        computerScore.innerText = computerScoreNo;
    }

    const storedYourScore = localStorage.getItem('yourScore');
    if (storedYourScore) {
        yourScoreNo = JSON.parse(storedYourScore);
        yourScore.innerText = yourScoreNo;
    }
});

choiceButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const choiceName = button.dataset.choice;
        const choice = CHOICES.find(choice => choice.name === choiceName);
        playRound(choice);
    });
});

function playRound(userChoice) {
    const computerChoice = getComputerChoice();
    displayResults([userChoice, computerChoice]);
    displayWinner([userChoice, computerChoice]);
}

function getComputerChoice() {
    const rand = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[rand];
}

function displayResults(results) {
    resultDivs.forEach((resultDiv, idx) => {
        setTimeout(() => {
            resultDiv.innerHTML = `
                <div class="choice ${results[idx].name}">
                    <img src="images/${results[idx].name}.png" alt="${results[idx].name}" />
                </div>
            `;
        }, idx * 1000);
    });

    gameDiv.classList.toggle('hidden');
    resultsDiv.classList.toggle('hidden');
}

function displayWinner(results) {
    setTimeout(() => {
        const userWins = isWinner(results);
        const computerWins = isWinner(results.reverse());

        if (userWins) {
            resultText.innerHTML = "You Win";
            resultDivs[0].classList.toggle('winner');
            updateYourScore(1);
            btnRules.style.right = 15 + 'rem';
            btnNext.classList.remove('hidden');
        } else if (computerWins) {
            resultText.innerHTML = "You Lose";
            resultDivs[1].classList.toggle('winner');
            updateComputerScore(1);
        } else {
            resultText.innerHTML = "Draw";
        }

        resultWinner.classList.toggle('hidden');
        resultsDiv.classList.toggle('show-winner');
    }, 1000);
}

function isWinner(results) {
    return results[0].beats === results[1].name;
}

function updateYourScore(point) {
    yourScoreNo += point;
    yourScore.innerText = yourScoreNo;
    localStorage.setItem('yourScore', JSON.stringify(yourScoreNo));
}

function updateComputerScore(point) {
    computerScoreNo += point;
    computerScore.innerText = computerScoreNo;
    localStorage.setItem('computerScore', JSON.stringify(computerScoreNo));

}


playAgain.addEventListener('click', () => {
    gameDiv.classList.toggle('hidden');
    resultsDiv.classList.toggle('hidden');

    resultDivs.forEach(resultDiv => {
        resultDiv.innerHTML = "";
        resultDiv.classList.remove('winner');
    });

    resultText.innerText = "";
    resultWinner.classList.toggle('hidden');
    resultsDiv.classList.toggle('show-winner');
    btnRules.style.right = 5 + 'rem';
    btnNext.classList.add('hidden');
});

btnRules.addEventListener('click', () => {
    modalRules.classList.toggle('show-modal');
});

btnClose.addEventListener('click', () => {
    modalRules.classList.toggle('show-modal');
});


btnNext.addEventListener('click', () => {
    header.classList.add('hidden');
    gameDiv.classList.add('hidden');
    resultsDiv.classList.add('hidden');
    animation.classList.remove('hidden');
    btnNext.classList.add('hidden');
    btnRules.style.right = 5 + 'rem';

    animateText();

    animateBlobs();
})

playAgain2.addEventListener('click', () => {
    header.classList.remove('hidden');
    gameDiv.classList.remove('hidden');
    resultsDiv.classList.add('hidden');
    animation.classList.add('hidden');
    btnRules.style.right = 5 + 'rem';

    resultDivs.forEach(resultDiv => {
        resultDiv.innerHTML = "";
        resultDiv.classList.remove('winner');
    });

    resultText.innerText = "";
    resultWinner.classList.add('hidden');
    btnNext.classList.add('hidden');
    playAgain.classList.remove('hidden');
    resultsDiv.classList.toggle('show-winner');
    yourScoreNo = 0;
    updateYourScore(yourScoreNo);
    computerScoreNo = 0;
    updateComputerScore(computerScoreNo);
});


$(document).ready(function () {
    var numberOfStars = 20;

    for (var i = 0; i < numberOfStars; i++) {
        $('.congrats').append('<div class="blob fa fa-star ' + i + '"></div>');
    }

    animateText();

    animateBlobs();
});

$('.congrats').click(function () {
    reset();

    animateText();

    animateBlobs();
});

function reset() {
    $.each($('.blob'), function (i) {
        TweenMax.set($(this), { x: 0, y: 0, opacity: 1 });
    });

    TweenMax.set($('h1'), { scale: 1, opacity: 1, rotation: 0 });
}

function animateText() {
    TweenMax.from($('h1'), 0.8, {
        scale: 0.4,
        opacity: 0,
        rotation: 15,
        ease: Back.easeOut.config(4),
    });

}

function animateBlobs() {
    var xSeed = _.random(350, 380);
    var ySeed = _.random(120, 170);

    $.each($('.blob'), function (i) {
        var $blob = $(this);
        var speed = _.random(1, 5);
        var rotation = _.random(5, 100);
        var scale = _.random(0.8, 1.5);
        var x = _.random(-xSeed, xSeed);
        var y = _.random(-ySeed, ySeed);

        TweenMax.to($blob, speed, {
            x: x,
            y: y,
            ease: Power1.easeOut,
            opacity: 0,
            rotation: rotation,
            scale: scale,
            onStartParams: [$blob],
            onStart: function ($element) {
                $element.css('display', 'block');
            },
            onCompleteParams: [$blob],
            onComplete: function ($element) {
                $element.css('display', 'none');
            }
        });
    });
};
