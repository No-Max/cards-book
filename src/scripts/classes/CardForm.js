import Card from './Card.js'
import cardHelper from '../helpers/card.js';

const cardInfoApiKey = 'b09f0613ed846051bfe94c7174ab16e8';
const cardInfoApiUrl = 'https://api.cardinfo.online';

const messages = {
    cardNumberRequired: 'Card Number is required',
    cardNumberLength: 'Your card number should has 16 symbols',
    cardType: 'Your card must be only Visa or MasterCard',
    cardTypeApiRequest: 'Error in API request for card number validation',
    cardIsAlreadyExists: 'You already has card with this number',
    cardCommentLength: 'Your comment should has maximum 1024 symbols',
};

export default class {
    constructor(selectors, cardModal, cardList) {
        this.selectors = selectors;
        this.hasErrors = false;
        this.numberError = '';
        this.commentError = '';
        this.cardModal = cardModal;
        this.cardList = cardList;

        this.cardLogoImage = '';
        this.cardNumber = '';
        this.cardComment = '';

        this.handleCardNumberInput();
        this.handleCardCommentInput();
        this.handleCreateCardButton();
        this.handleOpenModal();
    };
    cardNumberRequired(cb) {
        if(!this.cardNumber) {
            cb(messages.cardNumberRequired);
        } else {
            this.cardNumberLength(cb);
        }
    };
    cardNumberLength(cb) {
        if(cardHelper.removeSpaces(this.cardNumber).length !== 16) {
            cb(messages.cardNumberLength);
        } else {
            this.cardIsAlreadyExists(cb);
        }
    };
    cardIsAlreadyExists(cb) {
        if(!!this.cardList.cards.find(item => item.number === this.cardNumber)){
            cb(messages.cardIsAlreadyExists);
        } else {
            this.cardType(cb);
        }      
    };
    cardType(cb) {
        const requestUrl = `${cardInfoApiUrl}?input=${cardHelper.getFirstSixNumbers(this.cardNumber)}&apiKey=${cardInfoApiKey}`;
        fetch(requestUrl).then((response) => response.json())
        .then((data) => {
            if((data.brandAlias === 'mastercard') || (data.brandAlias === 'visa')) {                
                cb();
                this.cardLogoImage = data.brandLogoOriginalPng;
            } else {
                cb(messages.cardType);
            }
        }).catch(() => {
            cb(messages.cardTypeApiRequest);
        })
    };
    cardCommentLength(cb) {
        if(this.cardComment.length > 1024) {
            cb(messages.cardCommentLength);
        } else {
            cb();
        };
    };
    validateNumber(cb) {
        this.cardNumberRequired((message) => {
            if(message) {
                this.hasErrors = true;
                this.selectors.numberError.innerText = message;
            } else {
                this.hasErrors = false;
                this.selectors.numberError.innerText = '';
                if(cb) cb();
            }
        })
    };
    validateComment() {
        this.cardCommentLength((message) => {
            if(message) {
                this.hasErrors = true;
                this.selectors.commentError.innerText = message;
            } else {
                this.hasErrors = false;
                this.selectors.commentError.innerText = '';
            }
        })
    };
    handleCardNumberInput() {
        this.selectors.numberInput.onchange = (e) => {
            const number = e.target.value;
            this.cardNumber = number;
            this.validateNumber();
        };
    };
    handleCardCommentInput() {
        this.selectors.commentInput.onchange = (e) => {
            const comment = e.target.value;
            this.cardComment = comment;
            this.validateComment();
        };       
    };
    handleCreateCardButton () {
        this.cardModal.saveButtonHandler(() => {
            this.validateNumber(() => {
                const card = new Card({
                    number: this.cardNumber,
                    comment: this.cardComment,
                    brandImageUrl: this.cardLogoImage
                });
                this.cardList.add(card);
                this.cardModal.hide();
                this.clear();
            });
        });
    };
    handleOpenModal() {
        this.selectors.addCardButton.onclick = () => {
            this.cardModal.show();
        }
    };
    clear() {
        this.cardNumber = '';
        this.cardComment = '';
        this.cardLogoImage = '';
        this.selectors.commentInput.value = '';
        this.selectors.numberInput.value = '';
    };
}