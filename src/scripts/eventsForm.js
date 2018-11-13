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

      let fieldsetEventNameDefinition = {
          "element_type": "fieldset",
          "attribute_descriptions": [
              {
                  "attribute_name": "class",
                  "attribute_value": "new_event_name"
              }
          ]
      }

      let labelEventNameDefinition = {
          "element_type": "label",
          "text_content": "Event Name",
          "attribute_descriptions": [
              {
                  "attribute_name": "for",
                  "attribute_value": "event_name"
              }
          ]
      }

      let inputEventNameDefinition = {
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

      let fieldsetEventDateDefinition = {
          "element_type": "fieldset",
          "attribute_descriptions": [
              {
                  "attribute_name": "class",
                  "attribute_value": "new_event_date"
              }
          ]
      }

      let labelEventDateDefinition = {
          "element_type": "label",
          "text_content": "Date",
          "attribute_descriptions": [
              {
                  "attribute_name": "for",
                  "attribute_value": "event_date"
              }
          ]
      }

      let inputEventDateDefinition = {
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

      let fieldsetEventTimeDefinition = {
        "element_type": "fieldset",
        "attribute_descriptions": [
            {
                "attribute_name": "class",
                "attribute_value": "new_event_time"
            }
        ]
    }

    let labelEventTimeDefinition = {
        "element_type": "label",
        "text_content": "Time",
        "attribute_descriptions": [
            {
                "attribute_name": "for",
                "attribute_value": "event_time"
            }
        ]
    }

    let inputEventTimeDefinition = {
        "element_type": "input",
        "attribute_descriptions": [
            {
                "attribute_name": "id",
                "attribute_value": "event_time"
            },
            {
                "attribute_name": "class",
                "attribute_value": "event_time"
            },
            {
                "attribute_name": "type",
                "attribute_value": "time"
            }
        ]
    }

      let fieldsetEventLocationDefinition = {
        "element_type": "fieldset",
        "attribute_descriptions": [
            {
                "attribute_name": "class",
                "attribute_value": "new_event_location"
            }
        ]
    }

    let labelEventLocationDefinition = {
        "element_type": "label",
        "text_content": "Location",
        "attribute_descriptions": [
            {
                "attribute_name": "for",
                "attribute_value": "event_location"
            }
        ]
    }

    let inputEventLocationDefinition = {
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

      let submitButtonEventDefinition = {
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

      let nameFieldset = ElementBuilder.buildHTMLElement(fieldsetEventNameDefinition.element_type, fieldsetEventNameDefinition.attribute_descriptions)
      let nameLabel = ElementBuilder.buildHTMLElement(labelEventNameDefinition.element_type, labelEventNameDefinition.attribute_descriptions, labelEventNameDefinition.text_content)
      let nameInput = ElementBuilder.buildHTMLElement(inputEventNameDefinition.element_type, inputEventNameDefinition.attribute_descriptions)

      let dateFieldset = ElementBuilder.buildHTMLElement(fieldsetEventDateDefinition.element_type, fieldsetEventDateDefinition.attribute_descriptions)
      let dateLabel = ElementBuilder.buildHTMLElement(labelEventDateDefinition.element_type, labelEventDateDefinition.attribute_descriptions, labelEventDateDefinition.text_content)
      let dateInput = ElementBuilder.buildHTMLElement(inputEventDateDefinition.element_type, inputEventDateDefinition.attribute_descriptions)

      let timeFieldset = ElementBuilder.buildHTMLElement(fieldsetEventTimeDefinition.element_type, fieldsetEventTimeDefinition.attribute_descriptions)
      let timeLabel = ElementBuilder.buildHTMLElement(labelEventTimeDefinition.element_type, labelEventTimeDefinition.attribute_descriptions, labelEventTimeDefinition.text_content)
      let timeInput = ElementBuilder.buildHTMLElement(inputEventTimeDefinition.element_type, inputEventTimeDefinition.attribute_descriptions)

      let locationFieldset = ElementBuilder.buildHTMLElement(fieldsetEventLocationDefinition.element_type, fieldsetEventLocationDefinition.attribute_descriptions)
      let locationLabel = ElementBuilder.buildHTMLElement(labelEventLocationDefinition.element_type, labelEventLocationDefinition.attribute_descriptions, labelEventLocationDefinition.text_content)
      let locationInput = ElementBuilder.buildHTMLElement(inputEventLocationDefinition.element_type, inputEventLocationDefinition.attribute_descriptions)

      let submitButton = ElementBuilder.buildHTMLElement(submitButtonEventDefinition.element_type, submitButtonEventDefinition.attribute_descriptions, submitButtonEventDefinition.text_content)

      // let hiddenElement = ElementBuilder.buildHTMLElement(hiddenSelector.element_type, hiddenSelector.attributes_descriptions)
      nameFieldset.appendChild(nameLabel)
      nameFieldset.appendChild(nameInput)
      dateFieldset.appendChild(dateLabel)
      dateFieldset.appendChild(dateInput)
      timeFieldset.appendChild(timeLabel)
      timeFieldset.appendChild(timeInput)
      locationFieldset.appendChild(locationLabel)
      locationFieldset.appendChild(locationInput)
      
      eventsForm.appendChild(nameFieldset)
      eventsForm.appendChild(dateFieldset)
      eventsForm.appendChild(timeFieldset)
      eventsForm.appendChild(locationFieldset)
      eventsForm.appendChild(submitButton)
      
      submitButton.addEventListener("click", () => {
          const newEventName = document.querySelector("#event_name").value
          const newEventDate = document.querySelector("#event_date").value
          const newEventTime = document.querySelector("#event_time").value
          const newEventLocation = document.querySelector("#event_location").value
          const new_event = {
              name: newEventName,
              date: newEventDate,
              time: newEventTime,
              location: newEventLocation
          }

          APICollection.postAPI("http://localhost:8088/events", new_event).then(
              window.location.reload("http://localhost:8080")
          )
      })

      return eventsForm
    }
  }