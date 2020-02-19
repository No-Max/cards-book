const cardInfoApiKey = 'b09f0613ed846051bfe94c7174ab16e8';
const cardInfoApiUrl = 'https://api.cardinfo.online';

const messages = {
    cardNumberLength: 'Your card number should has 16 symbols',
    cardNumberRequired: 'Card Number is required',
    cardType: 'Your card must be only Visa or MasterCard',
    cardCommentLength: 'Your comment should has maximum 1024 symbols',
    cardIsalreadyExists: 'You are already has card with this number',
    cardTypeRequestError: 'Card info request error'
};

export default class {
    constructor(formSelector, modal) {
        this.formSelector = formSelector;
        this.isPending = false;
        this.hasErrors = false;
        this.currentError = '';
        this.modal = modal;
    };
    cardNumberLength(cardNumber) {
        if(cardNumber.length !== 16){
            this.currentError = messages.cardNumberLength;
            this.hasErrors = true;
        } else {
            this.currentError = '';
            this.hasErrors = false;
        }
    };
    cardNumberRequired(cardNumber) {
        if(cardNumber) {
            this.currentError = messages.cardNumberRequired;
            this.hasErrors = true;
        } else {
            this.currentError = '';
            this.hasErrors = false;
        }
    };
    cardType(cardNumber) {
        const firstSixCardNumbers = cardNumber.slice(0, 6);
        const requestUrl = `${cardInfoApiUrl}?input=${firstSixCardNumbers}&apiKey=${cardInfoApiKey}`
        this.isPending = true;
        fetch(requestUrl)
            .then((response) => {
                return response.json()
            }).then((data) => {
                console.log(data);
                this.isPending = false;
            }).catch((error) => {
                console.error(error);
                this.isPending = false;
            })
    };
}