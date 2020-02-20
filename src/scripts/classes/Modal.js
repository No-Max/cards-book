export default class {
    constructor (modalSelector) {
        this.modalSelector = modalSelector;
        this.closeModalSelector = modalSelector.querySelector('.close');
        this.saveModalSelector = modalSelector.querySelector('.save');

        this.closeButtonHandler(() => {
            this.hide();
        });
    };
    show() {
        this.modalSelector.classList.add('active');
    };
    hide() {
        this.modalSelector.classList.remove('active');
    };
    disableButtons() {
        this.closeModalSelector.setAttribute('disabled', 'disabled');
        this.saveModalSelector.setAttribute('disabled', 'disabled');
    };
    enableButtons() {
        this.closeModalSelector.removeAttribute('disabled');
        this.saveModalSelector.removeAttribute('disabled');
    };
    closeButtonHandler(cb) {
        this.closeModalSelector.onclick = cb;
    };
    saveButtonHandler(cb) {
        this.saveModalSelector.onclick = cb;
    }
}