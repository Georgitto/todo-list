class Block {
    meta = {};
    element = null;

    constructor(tagName = "div", props = {id:'', innerHTML:''}, child = []) {
        this.mediator = () => new Mediator();
        this.meta = {
            tagName,
            props,
            child,
        }

        // this.subscribeEvents(this.mediator());
        // this.initializeEl();
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

    setParent(parentEl,currentEl) {
        currentEl.parent = parentEl.props.className;
    }
}


