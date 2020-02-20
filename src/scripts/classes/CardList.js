import Card from './Card';

const emptyContainerText = 'Your card list is empty, try add new cards using \'Add\' button above';
const localStorageName = 'cards-list';

export default class {
    constructor(containerSelector, deleteConfirmModal) {
        this.cards = [];
        this.containerSelector = containerSelector;
        this.deleteConfirmModal = deleteConfirmModal;

        this.cardsToObjects();
        this.updateCardsContainer();
    };
    add(card) {
        this.cards.push(card);
        this.updateCardsContainer();
    };
    remove(cardId) {
        this.cards = this.cards.filter(item => item.id !== cardId);
        this.updateCardsContainer();
    };
    updateCardsContainer() {
        this.containerSelector.innerHTML = '';
        if(this.cards.length > 0) {
            this.cards.forEach(card => {
                this.containerSelector.append(card.getAsHtml(() => { 
                    this.deleteConfirmModal.show();
                    this.deleteConfirmModal.saveButtonHandler(() => {
                        this.remove(card.id);
                        this.deleteConfirmModal.hide();
                    })
                }));
            });
        } else {
            this.containerSelector.innerText = emptyContainerText; 
        }
        localStorage.setItem(localStorageName, JSON.stringify(this.cards));
    };
    cardsToObjects() {
        let cardsArray = JSON.parse(localStorage.getItem(localStorageName));
        if (cardsArray) {
            cardsArray.forEach( item => {
                this.cards.push(new Card(item));
            });
        }
    };
}