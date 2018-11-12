//In charge of taking in the events

import APICollection from "./apiCollection"
import ElementBuilder from "./elementBuilder"

export default class EventsForm {
  static buildEventForm(form_action) {
      let formDefinition = {
          "element_type": "form",
          "attribute_descriptions": [
              {
                  "attribute_name": "action",
                  "attribute_value": ""
              },
              {
                  "attribute_name": "id",
                  "attribute_value": "event_form"
              },
              {
                  "attribute_name": "class",
                  "attribute_value": "event_form submit_state"
              }
          ]
      }

      let breakDefinition = {
          "element_type": "br",
          "attribute_descriptions": []
      }

      let fieldsetNameDefinition = {
          "element_type": "fieldset",
          "attribute_descriptions": [
              {
                  "attribute_name": "class",
                  "attribute_value": "new_event_name"
              }
          ]
      }

      let labelNameDefinition = {
          "element_type": "label",
          "text_content": "Event Name",
          "attribute_descriptions": [
              {
                  "attribute_name": "for",
                  "attribute_value": "event_name"
              }
          ]
      }

      let inputNameDefinition = {
          "element_type": "input",
          "attribute_descriptions": [
              {
                  "attribute_name": "id",
                  "attribute_value": "event_name"
              },
              {
                  "attribute_name": "class",
                  "attribute_value": "event_name"
              },
              {
                  "attribute_name": "type",
                  "attribute_value": "text"
              }
          ]
      }

      let fieldsetDateDefinition = {
          "element_type": "fieldset",
          "attribute_descriptions": [
              {
                  "attribute_name": "class",
                  "attribute_value": "new_event_date"
              }
          ]
      }

      let labelDateDefinition = {
          "element_type": "label",
          "text_content": "Date",
          "attribute_descriptions": [
              {
                  "attribute_name": "for",
                  "attribute_value": "event_date"
              }
          ]
      }

      let inputDateDefinition = {
          "element_type": "input",
          "attribute_descriptions": [
              {
                  "attribute_name": "id",
                  "attribute_value": "event_date"
              },
              {
                  "attribute_name": "class",
                  "attribute_value": "event_date"
              },
              {
                  "attribute_name": "type",
                  "attribute_value": "date"
              }
          ]
      }

      let fieldsetLocationDefinition = {
        "element_type": "fieldset",
        "attribute_descriptions": [
            {
                "attribute_name": "class",
                "attribute_value": "new_event_location"
            }
        ]
    }

    let labelLocationDefinition = {
        "element_type": "label",
        "text_content": "Location",
        "attribute_descriptions": [
            {
                "attribute_name": "for",
                "attribute_value": "event_location"
            }
        ]
    }

    let inputLocationDefinition = {
        "element_type": "input",
        "attribute_descriptions": [
            {
                "attribute_name": "id",
                "attribute_value": "event_location"
            },
            {
                "attribute_name": "class",
                "attribute_value": "event_location"
            },
            {
                "attribute_name": "type",
                "attribute_value": "text"
            }
        ]
    }

      let submitButtonDefinition = {
          "element_type": "button",
          "text_content": "Save Event",
          "attribute_descriptions": [
              {
                  "attribute_name": "class",
                  "attribute_value": "btn submit_event"
              }
          ]
      }

      let eventsForm = ElementBuilder.buildHTMLElement(formDefinition.element_type, formDefinition.attribute_descriptions)

      let nameFieldset = ElementBuilder.buildHTMLElement(fieldsetNameDefinition.element_type, fieldsetNameDefinition.attribute_descriptions)
      let nameLabel = ElementBuilder.buildHTMLElement(labelNameDefinition.element_type, labelNameDefinition.attribute_descriptions, labelNameDefinition.text_content)
      let nameInput = ElementBuilder.buildHTMLElement(inputNameDefinition.element_type, inputNameDefinition.attribute_descriptions)

      let dateFieldset = ElementBuilder.buildHTMLElement(fieldsetDateDefinition.element_type, fieldsetDateDefinition.attribute_descriptions)
      let dateLabel = ElementBuilder.buildHTMLElement(labelDateDefinition.element_type, labelDateDefinition.attribute_descriptions, labelDateDefinition.text_content)
      let dateInput = ElementBuilder.buildHTMLElement(inputDateDefinition.element_type, inputDateDefinition.attribute_descriptions)

      let locationFieldset = ElementBuilder.buildHTMLElement(fieldsetLocationDefinition.element_type, fieldsetLocationDefinition.attribute_descriptions)
      let locationLabel = ElementBuilder.buildHTMLElement(labelLocationDefinition.element_type, labelLocationDefinition.attribute_descriptions, labelLocationDefinition.text_content)
      let locationInput = ElementBuilder.buildHTMLElement(inputLocationDefinition.element_type, inputLocationDefinition.attribute_descriptions)

      let submitButton = ElementBuilder.buildHTMLElement(submitButtonDefinition.element_type, submitButtonDefinition.attribute_descriptions, submitButtonDefinition.text_content)

      // let hiddenElement = ElementBuilder.buildHTMLElement(hiddenSelector.element_type, hiddenSelector.attributes_descriptions)
      nameFieldset.appendChild(nameLabel)
      nameFieldset.appendChild(nameInput)
      dateFieldset.appendChild(dateLabel)
      dateFieldset.appendChild(dateInput)
      locationFieldset.appendChild(locationLabel)
      locationFieldset.appendChild(locationInput)
      
      eventsForm.appendChild(nameFieldset)
      eventsForm.appendChild(dateFieldset)
      eventsForm.appendChild(locationFieldset)
      eventsForm.appendChild(submitButton)
      
      submitButton.addEventListener("click", () => {
          const newEventName = document.querySelector("#event_name").value
          const newEventDate = document.querySelector("#event_date").value
          const newEventLocation = document.querySelector("#event_location").value
          const new_event = {
              name: newEventName,
              date: newEventDate,
              location: newEventLocation
          }

          APICollection.postAPI("http://localhost:8088/events", new_event).then(
              window.location.reload("http://localhost:8080")
          )
      })

      return eventsForm
    }
  }