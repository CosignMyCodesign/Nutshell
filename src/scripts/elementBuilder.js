// In charge of building the HTML elements

export default class ElementBuilder {
    static buildHTMLElement(element_type, attribute_descriptions, text_content) {
        let built_element = document.createElement(element_type)
        if (text_content) {
            built_element.textContent = text_content
        }
        attribute_descriptions.forEach((attribute) => {
            built_element.setAttribute(attribute.attribute_name, attribute.attribute_value)
        })
        return built_element
    }
}