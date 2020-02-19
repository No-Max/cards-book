import CardList from './classes/CardList.js';
import CardForm from './classes/CardForm.js';
import Modal from './classes/Modal.js';
import Card from './classes/Card';

const cardsContainerSelector = document.getElementById('cardsContainer');
const cardFormSelector = document.getElementById('cardForm');
const cardFormModalSelector = document.getElementById('cardFormModal');

const cardFormModal = new Modal(cardFormModalSelector);

const card = new Card({number: '4323 2314 3145 2155', comment: 'test', brandImageUrl: 'images/970-250.jpg'})

const cardList = new CardList(cardsContainerSelector);
//cardList.add(card);
const cardForm = new CardForm(cardFormSelector);