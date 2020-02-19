export default class {
    constructor({number, comment, brandImageUrl}) {
        this.id = `card${number.replace(' ', '')}`;
        this.number = number;
        this.comment = comment;
        this.brandImageUrl = brandImageUrl;
    };
    getAsHtml(buttonHandler) {
        const card = document.createElement('div');
        const button = document.createElement('button');
        
        card.setAttribute('class', 'list-card');
        card.setAttribute('id', this.id);
        card.innerHTML = `<div class="list-card__comment">${this.comment}</div>
            <div class="list-card__number">${this.number}</div>
            <img src="${this.brandImageUrl}"/>`;
        
        button.setAttribute('type', 'button');
        button.innerText = 'Remove'
        button.onclick = buttonHandler;
        card.append(button)

        return card;
    };
    removeButton() {
        
    };
}
