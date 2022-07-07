/*----- constants -------*/
var SOURCE_CARDS = [
  {img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Color_icon_purple_v2.svg/800px-Color_icon_purple_v2.svg.png', matched: false},
  {img: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/MagentaIcon.png', matched: false},
  {img: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Shades_of_light_blue.png', matched: false},
  {img: 'https://i0.wp.com/www.hisour.com/wp-content/uploads/2018/03/Shades-of-orange.jpg?fit=720%2C720&ssl=1&w=640', matched: false},
  {img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Color_icon_green.svg/800px-Color_icon_green.svg.png', matched: false},
  {img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Color_icon_yellow.svg/2048px-Color_icon_yellow.svg.png', matched: false},
  {img: 'https://benambridge.files.wordpress.com/2014/12/red.png', matched: false},
  {img: 'https://www.jenieyolland.com/wp-content/uploads/2021/10/1200px-Color_icon_cyan.svg_.png', matched: false}
];
const CARD_BACK = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Color_icon_black.svg/800px-Color_icon_black.svg.png'; 

/*----- app's active state (variables) -----*/
let cards; //array of 16 cards in game board
let firstCard; //first card clicked by player
let secondCard; //second card clicked by player
let ignoreClicks; //black space that isnt a card
let score; //track gamestatus until endgame 
let attempts; //track number of failed attempts

/*----- cached elements -----*/
let header = document.querySelector("h1"); //to replace game header with end message

/*----- event listeners -----*/
document.querySelector('container').addEventListener('click', handleChoice);
document.querySelector('button').addEventListener('click', refreshBoard);

/*----- functions -----*/
init();

//initial gameboard
function init(){
  cards = getShuffledCards();
  firstCard = null;
  ignoreClicks = false;
  render();
  score = 0;
  attempts = 0;
}

//render function
function render() {
  cards.forEach(function(card, idx) {
    const imgEl = document.getElementById(idx);
    const src = (card.matched || card === firstCard || card === secondCard) ? card.img : CARD_BACK;
    imgEl.src = src;
    gameStatus();
    failedMatches();
  });
}

//upates number of matches until game is complete
function gameStatus() {
  if (score === 8) {
   return header.innerText = "Your Memory is Memorable.";
  }
}

//counts failed attempts at matches
function failedMatches() {
  if (attempts === 13) {
   return header.innerText = "Did you drink your coffee this morning?";
  } if (attempts === 18) {
   return header.innerText = "Statistically, you should have made a little progress by now..";
  } if (attempts >= 25) {
    return header.innerText = `You've failed ${attempts} times so far. That's a little embarassing.`;
  }
}

//button to manually reshuffle cards
function refreshBoard(){
  window.location.reload();
} 

//shuffle cards 
function getShuffledCards(){
  let tempCards = [];
  let cards = [];
  for (let card of SOURCE_CARDS) {
    tempCards.push({...card}, {...card});
  }
  while (tempCards.length) {
    let rndIdx = Math.floor(Math.random() * tempCards.length);
    let card = tempCards.splice(rndIdx, 1)[0];
    cards.push(card);

  }
return cards;
}

//game match logic
function handleChoice(evt) {
  const cardIdx = parseInt(evt.target.id);
  if (isNaN(cardIdx) || ignoreClicks) return; 
  const card = cards[cardIdx];
  if (firstCard) {
    if (secondCard) {
      if (firstCard.img === secondCard.img) {
      // correct match
        firstCard.matched = secondCard.matched = true;
        score++ // increase score by 1
      } 
      firstCard = null;
      secondCard = null;
   } else {
     if (
         isNaN(cardIdx) ||
          ignoreClicks  ||
          cards[cardIdx] === firstCard) return;
        secondCard = card;
        attempts++ //increase failed attempts by 1
      }   
  } else {
   firstCard = card;
  }
  render();
}

