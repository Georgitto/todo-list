class Mediator {
    constructor() {
        this.obj = {
            subscriptions: {}
        }
    }

    subscribe(subscription, callback) {
        if (!this.obj.subscriptions[subscription]) this.obj.subscriptions[subscription] = [];
        this.obj.subscriptions[subscription].push({context: this, callback: callback})
    }

    unsubscribe(subscription, callback) {
        this.obj.subscriptions[subscription] = this.obj.subscriptions[subscription]
            .filter(sub => sub !== callback)
    }

    exec(subscription, ...args) {
        this.obj.subscriptions[subscription].forEach(function (sub) {
            sub(...args)
        })
    }
}
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



class Render {
    constructor() {

    }

    renderEl(el, entryId, type = 'append') {
        const domEl = document.getElementById(entryId);
        const newDomEl = this.recursiveRender(el);

        switch (type) {
            case 'append': {
                domEl.append(newDomEl);
            }break;
            case 'prepend': {
                domEl.prepend(newDomEl);
            }break;
            case 'before': {
                domEl.before(newDomEl);
            }break;
            case 'after': {
                domEl.after(newDomEl);
            }break;
            case 'replaceWith': {
                domEl.replaceWith(newDomEl);
            }break;
            default: {
                alert(`Unknown type ${type}`);
            }
        }
    }

    recursiveRender(el,parent = null) {
        let domEl = document.createElement(el.tagName);
        domEl.id = el.props.id;
        domEl.innerHTML = el.props.innerHTML
        for (let key in el.props) {
            if (key === 'id' || key === 'innerHtml') continue;
            domEl.style[key] = el.props[key];
        }

        el.child.map(function (obj){
            this.recursiveRender(obj, domEl);
        }.bind(this))

        if (parent === null) {
            return domEl;
        }
        else {
            parent.append(domEl);
        }
    }
}

let ul = new Block('block', {
    display: 'block',
    margin: '10%',
    background: 'red'
})

console.log(ul);