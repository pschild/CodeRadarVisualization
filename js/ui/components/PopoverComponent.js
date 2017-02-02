export class PopoverComponent {

    constructor(componentElement) {
        this._componentElement = componentElement;

        this.toggleButton = componentElement.querySelector('.popover-toggle-btn');
        this.popoverFloatingWrapper = componentElement.querySelector('.popover-floating-wrapper');
    }

    _bindEvents() {
        document.addEventListener('click', (event) => {
            var path = event.path;
            var close = true;
            for (var obj of path) {
                if (obj.id && obj.id == this._componentElement.id) {
                    close = false;
                    break;
                }
            }

            if (close) {
                this._hidePopoverContainer();
                this._setButtonStateInactive();
            }
        });

        this.toggleButton.addEventListener('click', () => {
            this._toggleDimensionSelectionContainerVisibility();
            this._toggleButtonActiveState();
        });
    }

    _toggleDimensionSelectionContainerVisibility() {
        if (this.popoverFloatingWrapper.style.display == 'block') {
            this._hidePopoverContainer();
        } else {
            this._showPopoverContainer();
        }
    }

    _toggleButtonActiveState() {
        if (this.toggleButton.classList.contains('active')) {
            this._setButtonStateInactive()
        } else {
            this._setButtonStateActive();
        }
    }

    _showPopoverContainer() {
        this.popoverFloatingWrapper.style.display = 'block';
    }

    _hidePopoverContainer() {
        this.popoverFloatingWrapper.style.display = 'none';
    }

    _setButtonStateActive() {
        this.toggleButton.classList.add('active');
    }

    _setButtonStateInactive() {
        this.toggleButton.classList.remove('active');
    }
}