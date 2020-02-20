import cardHelper from '../helpers/card.js';

export default class {
    constructor({ number, comment, brandImageUrl }) {
        this.id = `card${cardHelper.removeSpaces(number)}`;
        this.number = number;
        this.comment = comment;
        this.brandImageUrl = brandImageUrl;
    };

    getAsHtml(buttonHandler) {
        const card = document.createElement('div');
        const button = document.createElement('button');
        
        card.setAttribute('class', 'list-card');
        card.innerHTML = `
            <div class="list-card__comment">${this.comment}</div>
            <div class="list-card__number">${cardHelper.splitByFourNumbers(this.number)}</div>
            <img src="${this.brandImageUrl}"/>`;
        
        button.setAttribute('type', 'button');
        button.innerText = 'Remove';
        button.onclick = buttonHandler;
        card.append(button)

        return card;
    };
}
