// In charge of assigning modules to specified parts of the DOM

export default class DomManager {
    //static method removes necessity for instance
    static elementAppender(virtual_element, dom_element_selector) {
        let selected_dom_element = document.querySelector(dom_element_selector)
        selected_dom_element.appendChild(virtual_element)
    }
}