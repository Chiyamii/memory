/* eslint-disable no-param-reassign */
const images = [
  'img/1_pig.png', 'img/2_squirrel.png', 'img/3_rabbit.png', 'img/4_frog.png',
  'img/5_fox.png', 'img/6_bear.png', 'img/7_monkey.png', 'img/8_panda.png',
  'img/9_chick.png', 'img/10_tiger.png', 'img/11_penguin.png', 'img/12_racoon.png',
];

let finishedCards = 0;
let guesses = 0;
let activeCard = [];
let doStuff = true;

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  let j;
  let x;
  let i;
  for (i = a.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function checkWin() {
  if (finishedCards === images.length * 2) {
    alert(`You did it in ${guesses} tries!`);
  }
}

// Shuffle cards function
function shuffleCards() {
  const imagesShuffled = shuffle(images.concat(images));
  const imagesId = [];
  for (let i = 0; i < imagesShuffled.length; i += 1) {
    imagesId.push({ img: imagesShuffled[i] });
  }
  return imagesId;
}

// Display card
function showCard(id) {
  const template = document.querySelector('template');
  const clone = template.content.cloneNode(true);
  const deck = document.querySelector('main');
  clone.querySelector('img').src = id;
  deck.appendChild(clone);
}

// Display all cards
function showCards() {
  const imagesId = shuffleCards();
  imagesId.forEach((element) => {
    showCard(element.img);
  });
}

showCards();

const deck = document.querySelector('main');
deck.addEventListener('click', (e) => {
  if (doStuff) {
    if (activeCard.length < 2 && e.target.className === 'backside') {
      guesses += 1;
      document.querySelector('span').textContent = guesses;
      e.target.style = 'display: none';
      activeCard.push(e.target.parentElement.querySelector('.frontside').src);
    } else if (e.target.className === 'frontside') {
      if (e.target.src === activeCard[0]) activeCard.shift();
      else if (e.target.src === activeCard[1]) activeCard.pop();
      e.target.parentElement.querySelector('.backside').style = 'display: block';
    }
    if (activeCard.length === 2) {
      if (activeCard[0] === activeCard[1]) {
        const correctCard = document.querySelectorAll('.frontside');
        doStuff = false;
        setTimeout(() => {
          correctCard.forEach((element) => {
            if (element.src === activeCard[0]) {
              element.style = 'display: none';
            }
          });
          activeCard = [];
          finishedCards += 2;
          doStuff = true;
          checkWin();
        }, 1500);
      }
    }
  }
});

// The more ~Satisfying~ version
// deck.addEventListener("click", function(e) {
//     if (e.target.className === 'backside'){
//         e.target.style = 'display: none';
//     } else if (e.target.className != 'memoryCard') {
//         e.target.parentElement.querySelector('.backside').style = 'display: block'
//     }
// })
