import Card from './CardClass';

const localStorageName = 'cards-list';

export default class {
    constructor(containerSelector) {
        this.cards = [];
        this.containerSelector = containerSelector;
        this.cardsToObjects();
        this.updateCardsContainer();
    };
    add(card) {
        if (this.isCardNumberUnicue(card.number)) {
            this.cards.push(card);
            this.updateCardsContainer();
        } else {
            console.log('err')
        }
    };
    remove(cardId) {
        this.cards = this.cards.filter(item => item.id == cardId);
        this.updateCardsContainer();
    };
    updateCardsContainer() {
        this.containerSelector.innerHTML = '';
        this.cards.forEach(card => {
            this.containerSelector.append(card.getAsHtml());
        });
    };
    cardsToObjects() {        
        let cardsArray = JSON.parse(localStorage.getItem(localStorageName));
        if (cardsArray) {
            cardsArray.forEach( item => {
                this.cards.push(new Card(item));
            }).bind(this);
        }
    };
    isCardNumberUnicue(cardNumber) {
        return !this.cards.find(card => card.number === cardNumber);
    }
}