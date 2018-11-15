import ElementBuilder from "./elementBuilder"
import APICollection from "./apiCollection"

export default class Messages2 {
    constructor(message, date, userId, id) {
        this.message = message;
        this.date = date;
        this.userId = userId;
        this.id = id;
      }

    buildMessageDisplay() {
        let messageDivDefinition = {
            "element_type": "div",
            "attribute_descriptions": [{
                "attribute_name": "class",
                "attribute_value": "message"
            }]
        }
        let messageHeaderDefinition = {
            "element_type": "h3",
            "text_content": `${this.userId} says... `,
            "attribute_descriptions": [{
                "attribute_name": "class",
                "attribute_value": "message_header"
            }]
        }
        let messageNameDefinition = {
            "element_type": "button",
            "text_content": `${this.message}`,
            "attribute_descriptions": [{
                "attribute_name": "class",
                "attribute_value": `message_${this.id}`
            }]
        }
        let paragraphDefinition = {
            "element_type": "p",
            "text_content": `Post Date: ${this.date}`,
            "attribute_descriptions": [{
                "attribute_name": "class",
                "attribute_value": "date"
            }]
        }
        let hiddenSelector = {
            "element_type": "input",
            "attributes_descriptions": [{
                    "attribute_name": "type",
                    "attribute_value": "hidden"
                },
                {
                    "attribute_name": "id",
                    "attribute_value": "message_status"
                },
            ]
        }
        let hiddenSelector2 = {
            "element_type": "input",
            "attributes_descriptions": [{
                    "attribute_name": "type",
                    "attribute_value": "text"
                },
                {
                    "attribute_name": "class",
                    "attribute_value": `message_${this.id} editor`
                },
                {
                    "attribute_name": "style",
                    "attribute_value": "display:none"
                },
                {
                    "attribute_name": "placeholder",
                    "attribute_value": "Edit your message [press enter to save]"
                }
            ]
        }

        let messageDiv = ElementBuilder.buildHTMLElement(messageDivDefinition.element_type, messageDivDefinition.attribute_descriptions)
        let otherMessageHeader = ElementBuilder.buildHTMLElement(messageHeaderDefinition.element_type, messageHeaderDefinition.attribute_descriptions, messageHeaderDefinition.text_content)
        let messageHeader = ElementBuilder.buildHTMLElement(messageNameDefinition.element_type, messageNameDefinition.attribute_descriptions, messageNameDefinition.text_content)
        let messageParagraph = ElementBuilder.buildHTMLElement(paragraphDefinition.element_type, paragraphDefinition.attribute_descriptions, paragraphDefinition.text_content)
        let messageStatusUpdate = ElementBuilder.buildHTMLElement(hiddenSelector.element_type, hiddenSelector.attributes_descriptions)
        let messageNameEditor = ElementBuilder.buildHTMLElement(hiddenSelector2.element_type, hiddenSelector2.attributes_descriptions)

        messageDiv.appendChild(otherMessageHeader)
        messageDiv.appendChild(messageHeader)
        messageDiv.appendChild(messageParagraph)
        messageDiv.appendChild(messageStatusUpdate)
        messageHeader.appendChild(messageNameEditor)
        
        messageHeader.addEventListener("click", () => {
            messageNameEditor.style.display = "inline"
            console.log("hi")
        })
        messageNameEditor.addEventListener("keypress", (event) => {
            var key = event.which || event.keyCode
            if (key === 13) {
              console.log(messageNameEditor.value)
                messageHeader.innerText = messageNameEditor.value;
                messageNameEditor.style.display = "none";
                const newMessageStatus = {
                    message: messageNameEditor.value
                }
                APICollection.patchAPI(`http://localhost:8088/messages/${this.id}`, newMessageStatus)
                  .then(() => {messageHeader.appendChild(messageNameEditor)})

            }
        })
        return messageDiv
    }
}