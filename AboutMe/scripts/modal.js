class Modal {
    constructor() {
        this.wrapper = null;
    }

    static render(content) {
        const modalWindow = document.createElement('div');
        const modalWrapper = document.createElement('div');

        modalWrapper.classList.add('modal-wrapper');
        modalWindow.classList.add('modal-window');
        modalWrapper.id = 'asddsa';

        modalWindow.append(content);
        modalWrapper.append(modalWindow);

        return modalWrapper;
    }

    close() {
        if (this.wrapper) {
            this.wrapper.remove();
        }
    }

    open(content) {
        this.wrapper = Modal.render(content);
        document.body.appendChild(this.wrapper);

        this.wrapper.addEventListener('click', (event) => {
            if (event.target === this.wrapper) {
                this.close();
            }
        });
    }
}