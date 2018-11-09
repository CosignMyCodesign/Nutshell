// In charge of the news page
// title, synopsis, url
// save article(post)

import ElementBuilder from "./elementBuilder"
import APICollection from "./apiCollection"

export default class News {
    constructor(title, synopsis, url, date, userId, id) {
        this.title = title,
        this.synopsis = synopsis,
        this.url = url
        this.date = date
        this.userId = userId
        this.id = id
    }

    buildNewsDisplay() {
        let divDefinition = {
            "element_type": "div",
            "attribute_descriptions": [
                {
                    "attribute_name": "class",
                    "attribute_value": "news"
                }
            ]
        }
        let header3Definition = {
            "element_type": "h3",
            "text_content": `${this.title}`,
            "attribute_descriptions": [
                {
                    "attribute_name": "id",
                    "attribute_value": `news_${this.id}`
                }
            ]
        }
        let paragraphDefinition = {
            "element_type": "p",
            "text_content": `${this.date}`,
            "attribute_descriptions": [
                {
                    "attribute_name": "class",
                    "attribute_value": "date"
                }
            ]
        }
        let paragraphDefinition2 = {
            "element_type": "p",
            "text_content": `${this.url}`,
            "attribute_descriptions": [
                {
                    "attribute_name": "class",
                    "attribute_value": "url"
                }
            ]
        }
        let paragraphDefinition3 = {
            "element_type": "p",
            "text_content": `Synopsis: ${this.synopsis}`,
            "attribute_descriptions": [
                {
                    "attribute_name": "class",
                    "attribute_value": "synopsis"
                }
            ]
        }
        let updateButtonDefinition = {
            "element_type": "button",
            "text_content": "Edit This Article",
            "attributes_descriptions": [
                {
                    "attribute_name": "class",
                    "attribute_value": "btn update_article"
                }
            ]
        }
        let deleteButtonDefinition = {
            "element_type": "button",
            "text_content": "Delete This Article",
            "attributes_descriptions": [
                {
                    "attribute_name": "class",
                    "attribute_value": "btn delete_article"
                }
            ]
        }

        let newsDiv = ElementBuilder.buildHTMLElement(divDefinition.element_type, divDefinition.attribute_descriptions)
        let newsHeader = ElementBuilder.buildHTMLElement(header3Definition.element_type, header3Definition.attribute_descriptions, header3Definition.text_content)
        let newsParagraph = ElementBuilder.buildHTMLElement(paragraphDefinition.element_type, paragraphDefinition.attribute_descriptions, paragraphDefinition.text_content)
        let newsParagraph2 = ElementBuilder.buildHTMLElement(paragraphDefinition2.element_type, paragraphDefinition2.attribute_descriptions, paragraphDefinition2.text_content)
        let newsParagraph3 = ElementBuilder.buildHTMLElement(paragraphDefinition3.element_type, paragraphDefinition3.attribute_descriptions, paragraphDefinition3.text_content)
        let updateButton = ElementBuilder.buildHTMLElement(updateButtonDefinition.element_type, updateButtonDefinition.attributes_descriptions, updateButtonDefinition.text_content)
        let deleteButton = ElementBuilder.buildHTMLElement(deleteButtonDefinition.element_type, deleteButtonDefinition.attributes_descriptions, deleteButtonDefinition.text_content)

        newsDiv.appendChild(newsHeader)
        newsDiv.appendChild(newsParagraph)
        newsDiv.appendChild(newsParagraph2)
        newsDiv.appendChild(newsParagraph3)
        newsDiv.appendChild(updateButton)
        newsDiv.appendChild(deleteButton)

        return newsDiv
    }
}