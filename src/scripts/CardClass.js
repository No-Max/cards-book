export default class {
    constructor(number, comment, brandImageUrl) {
        this.id = `card${number.replace(' ', '')}`;
        this.number = number;
        this.comment = comment;
        this.imageBrandUrl = brandImageUrl;
    };
    getAsHtml() {
        const card = document.createElement('div');
        card.setAttribute('class', 'list-card');
        card.setAttribute('id', this.id);
        card.innerHTML = `<div class="list-card__comment">${this.comment}</div>
            <div class="list-card__number">${this.number}</div>
            <img src="${this.imageBrandUrl}"/>`;

        return card;
    };
}
