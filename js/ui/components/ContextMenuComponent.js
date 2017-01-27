import * as PubSub from 'pubsub-js';

export class ContextMenuComponent {

    constructor() {
        this._contextMenu = undefined;
        this._clickedElementName = undefined;

        this.menuItems = [
            { label: 'Kindelemente ein-/ausblenden', handler: this._handleToggleChildElements.bind(this)}
        ];

        this._createContextMenu();
        this._bindEvents();
    }

    _createContextMenu() {
        var contextMenu = document.createElement('div');
        contextMenu.classList.add('context-menu');

        var ul = document.createElement('ul');

        var li;
        for (let item of this.menuItems) {
            li = document.createElement('li');
            li.innerHTML = item.label;
            li.addEventListener('click', item.handler);
            ul.appendChild(li);
        }

        contextMenu.appendChild(ul);
        document.body.appendChild(contextMenu);

        this._contextMenu = contextMenu;
    }

    _showContextMenu(position) {
        this._contextMenu.style.top = position.y + 'px';
        this._contextMenu.style.left = position.x + 'px';
        this._contextMenu.style.display = 'block';
    }

    _hideContextMenu() {
        this._contextMenu.style.display = 'none';
    }

    _bindEvents() {
        document.addEventListener('click', (event) => {
            this._hideContextMenu();
        });

        PubSub.subscribe('elementRightClicked', (eventName, args) => {
            this._clickedElementName = args.elementName;
            this._showContextMenu(args.position);
        });
    }

    _handleToggleChildElements() {
        PubSub.publish('toggleChildElements', {
            elementName: this._clickedElementName
        });
    }
}