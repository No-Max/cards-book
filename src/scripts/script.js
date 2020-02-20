import CardList from './classes/CardList.js';
import CardForm from './classes/CardForm.js';
import Modal from './classes/Modal.js';


const cardModal = new Modal(document.getElementById('cardModal'));
const deleteConfirmModal = new Modal(document.getElementById('deleteConfirmModal'));

const cardList = new CardList(document.getElementById('cardsContainer'), deleteConfirmModal);

new CardForm({
        numberInput: document.querySelector('.card-number'),
        numberError: document.querySelector('.card-number-error'),
        commentInput: document.querySelector('.card-comment'),
        commentError: document.querySelector('.card-comment-error'),
        addCardButton: document.getElementById('addCard'),
    }, 
    cardModal, 
    cardList,
);
