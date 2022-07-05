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
let firstCard; //first card clicked (card object) or null
let ignoreClicks;


/*----- cached elements -----*/



/*----- event listeners -----*/
document.querySelector('container').addEventListener('click', handleChoice);


/*----- functions -----*/
init();

function init(){
  cards = getShuffledCards();
  firstCard = null;
  ignoreClicks = false;
  render();
}

function render() {
  cards.forEach(function(card, idx) {
    const imgEl = document.getElementById(idx);
    const src = (card.matched || card === firstCard) ? card.img : CARD_BACK;
    imgEl.src = src;
    
  });
}

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

//update all impacted state and then call render
function handleChoice(evt) {
const cardIdx = parseInt(evt.target.id);
if (isNaN(cardIdx) || ignoreClicks) return;
const card = cards[cardIdx]
if (firstCard) {
  if (firstCard.img === card.img) {
    firstCard.matched = card.matched = true;
    firstCard = null;
    //correct match 
  } else {
    
    // firstCard.matched = card.matched = false;
    //incorrect match

  }
} else {
    firstCard = card;
}
render();
}


// console.log(card)
// change
