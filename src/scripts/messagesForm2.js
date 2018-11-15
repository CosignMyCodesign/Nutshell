import APICollection from "./apiCollection"
import ElementBuilder from "./elementBuilder"
import MessagesList2 from "./messagesList2"
import DomManager from "./domManager"

export default class MessagesForm2 {
  static buildMessagesForm(form_action) {
    let messageDefinition = {
      "element_type": "form",
      "attribute_descriptions": [{
          "attribute_name": "action",
          "attribute_value": "",
        },
        {
          "attribute_name": "id",
          "attribute_value": "new_message_form"
        },
        {
          "attribute_name": "class",
          "attribute_value": "new_message_form submit_state"
        }
      ]
    }

    let fieldsetNameDefinition = {
      "element_type": "fieldset",
      "attribute_descriptions": [{
        "attribute_name": "class",
        "attribute_value": "new_message_title"
      }]
    }
    let labelNameDefinition = {
      "element_type": "label",
      "text_content": "Message Name ",
      "attribute_descriptions": [{
        "attribute_name": "for",
        "attribute_value": "message_name"
      }]
    }

    let inputNameDefinition = {
      "element_type": "input",
      "attribute_descriptions": [
          {
              "attribute_name": "id",
              "attribute_value": "message_title"
          },
          {
              "attribute_name": "class",
              "attribute_value": "message_title"
          },
          {
              "attribute_name": "type",
              "attribute_value": "text"
          }
      ]
  }

    let fieldsetDateDefinition = {
      "element_type": "fieldset",
      "attribute_descriptions": [{
        "attribute_name": "class",
        "attribute_value": "new_message_date"
      }]
    }

    let labelDateDefinition = {
      "element_type": "label",
      "text_content": "Date: ",
      "attribute_descriptions": [{
        "attribute_name": "for",
        "attribute_value": "message_date"
      }]
    }

    let inputDateDefinition = {
      "element_type": "input",
      "attribute_descriptions": [{
          "attribute_name": "id",
          "attribute_value": "message_date"
        },
        {
          "attribute_name": "class",
          "attribute_value": "message_date"
        },
        {
          "attribute_name": "type",
          "attribute_value": "date"
        }
      ]
    }

    let submitButtonDefinition = {
      "element_type": "button",
      "text_content": "Add Message",
      "attribute_descriptions": [{
        "attribute_name": "class",
        "attribute_value": "btn submit_message"
      }]
    }

    let messageForm = ElementBuilder.buildHTMLElement(messageDefinition.element_type, messageDefinition.attribute_descriptions)
    let messageTitleFieldset = ElementBuilder.buildHTMLElement(fieldsetNameDefinition.element_type, fieldsetNameDefinition.attribute_descriptions)
    let messageTitleLabel = ElementBuilder.buildHTMLElement(labelNameDefinition.element_type, labelNameDefinition.attribute_descriptions, labelNameDefinition.text_content)
    let messageTitleInput = ElementBuilder.buildHTMLElement(inputNameDefinition.element_type, inputNameDefinition.attribute_descriptions)
    let messageDateFieldset = ElementBuilder.buildHTMLElement(fieldsetDateDefinition.element_type, fieldsetDateDefinition.attribute_descriptions)
    let messageDateLabel = ElementBuilder.buildHTMLElement(labelDateDefinition.element_type, labelDateDefinition.attribute_descriptions, labelDateDefinition.text_content)
    let messageDateInput = ElementBuilder.buildHTMLElement(inputDateDefinition.element_type, inputDateDefinition.attribute_descriptions)
    let messageSubmitButton = ElementBuilder.buildHTMLElement(submitButtonDefinition.element_type, submitButtonDefinition.attribute_descriptions, submitButtonDefinition.text_content)
    messageTitleFieldset.appendChild(messageTitleLabel)
    messageTitleFieldset.appendChild(messageTitleInput)
    // messageDateFieldset.appendChild(messageDateLabel)
    messageDateFieldset.appendChild(messageDateInput)

    messageForm.appendChild(messageTitleFieldset)
    // messageForm.appendChild(messageDateFieldset)
    messageForm.appendChild(messageSubmitButton)

    messageSubmitButton.addEventListener("click", (event) => {
      event.preventDefault()
      const newMessageTitle = document.querySelector("#message_title").value
      // const newMessageDate = document.querySelector("#message_date").value.split("-")
      // const formattedMessageDate = `${newMessageDate[1]}/${newMessageDate[2]}/${newMessageDate[0]}`

      const new_message = {
        message: newMessageTitle,
        date: new Date(),
        userId: sessionStorage.getItem("username")
      }

      APICollection.postAPI("http://localhost:8088/messages", new_message).then(() => {
        document.querySelector("#messages_output").innerHTML = ""
        document.querySelector("#message_title").value = ""
        // document.querySelector("#message_date").value = ""
        let get_messages2_list = MessagesList2.buildMessagesList()
        DomManager.elementAppender(get_messages2_list, "#messages_output")
      })
    })

    return messageForm
  }
}