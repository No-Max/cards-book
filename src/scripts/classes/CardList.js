import Card from './Card';

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
        console.log(cardId);
        console.log(this.cards)
        this.cards = this.cards.filter(item => item.id === cardId);
        this.updateCardsContainer();
        console.log(this.cards)
    };
    updateCardsContainer() {
        this.containerSelector.innerHTML = '';
        this.cards.forEach(card => {
            this.containerSelector.append(card.getAsHtml( () => { this.remove(card.id) }));
        });
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
    isCardNumberUnicue(cardNumber) {
        return !this.cards.find(card => card.number === cardNumber);
    }
}