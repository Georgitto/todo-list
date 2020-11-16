import {Mediator} from "./mediator"

export class Block {
    meta = {};
    element = null;

    constructor(tagName = "div", props = {}) {
        this.mediator = () => new Mediator();
        this.meta = {
            tagName,
            props,
        }

        this.initializeEl();
    }

    subscribeEvents(mediator) {
        mediator.subscribe("Create", this.initializeEl().bind(this));
    }

    createEl() {
        this.element = document.createElement(this.meta.tagName)
    }

    initializeEl() {
        this.createEl();
        this.mediator().exec('Component-is-created')
    }

    setProps(newProps) {
        if (!newProps) {
            return;
        }
        Object.assign(this.meta.props, newProps);
    }
}


