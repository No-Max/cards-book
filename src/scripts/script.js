import Card from './CardClass.js';
import CardList from './CardListClass.js';

const cardsContainer = document.getElementById('cardsContainer');

const card = new Card('22 22', 'lalal', 'images/970-250.jpg');
const card2 = new Card('22 232', 'lalal', 'images/970-250.jpg');
const cardList = new CardList(cardsContainer);
cardList.add(card);
cardList.add(card2);
console.log(cardList)