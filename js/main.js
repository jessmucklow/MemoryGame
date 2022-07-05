/*----- constants -------*/
var SOURCE_CARDS = [
    {img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Color_icon_purple_v2.svg/800px-Color_icon_purple_v2.svg.png', matched: false},
    {img: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/MagentaIcon.png', matched: false},
    {img: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Shades_of_light_blue.png', matched: false},
    {img: 'hhttps://i0.wp.com/www.hisour.com/wp-content/uploads/2018/03/Shades-of-orange.jpg?fit=720%2C720&ssl=1&w=640', matched: false},
    {img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Color_icon_green.svg/800px-Color_icon_green.svg.png', matched: false},
    {img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Color_icon_yellow.svg/2048px-Color_icon_yellow.svg.png', matched: false},
    {img: 'https://benambridge.files.wordpress.com/2014/12/red.png', matched: false},
    {img: 'https://www.jenieyolland.com/wp-content/uploads/2021/10/1200px-Color_icon_cyan.svg_.png', matched: false}
  ];
  const CARD_BACK = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Color_icon_black.svg/800px-Color_icon_black.svg.png'; 


/*----- app's active state (variables) -----*/
let cards; //array of 16 cards in game board
let firstCard; //first card clicked (card object) or null


/*----- cached elements -----*/



/*----- event listeners -----*/



/*----- functions -----*/
Init();

function init(){
  cards = getShuffledCards();
  firstCard = null;
  render();
}

function render() {
  cards.forEach(function(card, idx) {
    const imgEl = document.getElementById(idx);
    imgEl.src = card.img;
    
  });
}

function getShuffledCards(){
let tempCards = [];
let cards = [];
for (let card of SOURCE_CARDS) {
  tempCards.push(card, card);
}
while (tempCards.length) {
  let rndIdx = Math.floor(Math.random() * tempCards.length);
  let card = tempCards.splice(rndIdx, 1)[0];
  cards.push(card);

}


return cards;
}

// change
