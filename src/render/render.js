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