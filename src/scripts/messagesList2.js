//This module takes the message and displays it in the dom
//sort by date

import Messages2 from "./messages2"
import APICollection from "./apiCollection"
import ElementBuilder from "./elementBuilder"

export default class MessagesList2 {
    static buildMessagesList() {
        let unorderedListDefinition = {
            "element_type": "ul",
            "attributes_descriptions": [
                {
                    "attribute_name": "id",
                    "attribute_value": "messages_list"
                },
                {
                    "attribute_name": "class",
                    "attribute_value": "messages_list"
                }
            ]
        }

        let listDefinition = {
            "element_type": "li",
            "attributes_descriptions": [
                {
                    "attribute_name": "class",
                    "attribute_value": "messages"
                }
            ]
        }

        let unordered_messages_list = ElementBuilder.buildHTMLElement(unorderedListDefinition.element_type, unorderedListDefinition.attributes_descriptions)

        APICollection.getAPI("http://localhost:8088/messages?_sort=date&_order=desc").then((messages) => {
            messages.forEach((message) => {
                let currentMessage = new Messages2(message.message, message.date, message.userId, message.id)
                let currentMessageDisplay = currentMessage.buildMessageDisplay()

                let listed_message = ElementBuilder.buildHTMLElement(listDefinition.element_type, listDefinition.attributes_descriptions)
                listed_message.appendChild(currentMessageDisplay)
                unordered_messages_list.appendChild(listed_message)
            })
        })
        return unordered_messages_list
    }
}