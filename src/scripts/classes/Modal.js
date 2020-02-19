export default class {
    constructor (modalSelector) {
        this.modalSelector = modalSelector;
        this.showModal();
        this.closeModalSelector = modalSelector.querySelector('.close');
        this.addCloseButtonHandler();
    };
    showModal() {
        this.modalSelector.classList.add('active');
    };
    hideModal() {
        this.modalSelector.classList.remove('active');
    };
    addCloseButtonHandler() {
        this.closeModalSelector.onclick = () => {
            this.hideModal();
        };
    };
}