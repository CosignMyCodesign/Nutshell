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
            "text_content": `Date Added: ${this.date}`,
            "attribute_descriptions": [
                {
                    "attribute_name": "class",
                    "attribute_value": "date"
                }
            ]
        }
        let anchorDefinition = {
            "element_type": "a",
            "text_content": "Link to Article",
            "attribute_descriptions": [
                {
                    "attribute_name": "href",
                    "attribute_value": `${this.url}`
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
        // let updateButtonDefinition = {
        //     "element_type": "button",
        //     "text_content": "Edit This Article",
        //     "attributes_descriptions": [
        //         {
        //             "attribute_name": "class",
        //             "attribute_value": "btn update_article"
        //         }
        //     ]
        // }
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
        let newsParagraph2 = ElementBuilder.buildHTMLElement(anchorDefinition.element_type, anchorDefinition.attribute_descriptions, anchorDefinition.text_content)
        let newsParagraph3 = ElementBuilder.buildHTMLElement(paragraphDefinition3.element_type, paragraphDefinition3.attribute_descriptions, paragraphDefinition3.text_content)
        let deleteButton = ElementBuilder.buildHTMLElement(deleteButtonDefinition.element_type, deleteButtonDefinition.attributes_descriptions, deleteButtonDefinition.text_content)

        newsDiv.appendChild(newsHeader)
        newsDiv.appendChild(newsParagraph)
        newsDiv.appendChild(newsParagraph2)
        newsDiv.appendChild(newsParagraph3)
        newsDiv.appendChild(deleteButton)

        deleteButton.addEventListener("click", () => {
            APICollection.deleteAPI(`http://localhost:8088/news/${this.id}`).then(
                window.location.reload("http://localhost:8080")
            )
        })

        return newsDiv
    }
}