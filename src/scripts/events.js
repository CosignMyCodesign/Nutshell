// In charge of displaying the events page
// name, date, location, url
// update and delete buttons


import ElementBuilder from "./elementBuilder"
import APICollection from "./apiCollection"

export default class Events {
    constructor(name, date, time, location, userId, id) {
        this.name = name,
            this.date = date,
            this.time = time,
            this.location = location,
            this.userId = userId,
            this.id = id
    }

    // create the Events elements and attributes and place into variables

    buildEventsDisplay() {
        let divDefinition = {
            "element_type": "div",
            "attribute_descriptions": [
                {
                    "attribute_name": "class",
                    "attribute_value": "events"
                }
            ]
        }
        let header3Definition = {
            "element_type": "h3",
            "text_content": `${this.name}`,
            "attribute_descriptions": [
                {
                    "attribute_name": "id",
                    "attribute_value": `events_${this.id}`
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
            "text_content": `${this.time}`,
            "attribute_descriptions": [
                {
                    "attribute_name": "class",
                    "attribute_value": "time"
                }
            ]
        }
        let paragraphDefinition3 = {
            "element_type": "p",
            "text_content": `Location: ${this.location}`,
            "attribute_descriptions": [
                {
                    "attribute_name": "class",
                    "attribute_value": "location"
                }
            ]
        }
        let updateButtonDefinition = {
            "element_type": "button",
            "text_content": "Edit This Event",
            "attributes_descriptions": [
                {
                    "attribute_name": "class",
                    "attribute_value": "btn update_event"
                }
            ]
        }
        let deleteButtonDefinition = {
            "element_type": "button",
            "text_content": "Delete This Event",
            "attributes_descriptions": [
                {
                    "attribute_name": "class",
                    "attribute_value": "btn delete_event"
                }
            ]
        }

        // send into the element builder to create html and assign to variables

        let eventsDiv = ElementBuilder.buildHTMLElement(divDefinition.element_type, divDefinition.attribute_descriptions)
        let eventsHeader = ElementBuilder.buildHTMLElement(header3Definition.element_type, header3Definition.attribute_descriptions, header3Definition.text_content)
        let eventsParagraph = ElementBuilder.buildHTMLElement(paragraphDefinition.element_type, paragraphDefinition.attribute_descriptions, paragraphDefinition.text_content)
        let eventsParagraph2 = ElementBuilder.buildHTMLElement(paragraphDefinition2.element_type, paragraphDefinition2.attribute_descriptions, paragraphDefinition2.text_content)
        let eventsParagraph3 = ElementBuilder.buildHTMLElement(paragraphDefinition3.element_type, paragraphDefinition3.attribute_descriptions, paragraphDefinition3.text_content)
        let updateButton = ElementBuilder.buildHTMLElement(updateButtonDefinition.element_type, updateButtonDefinition.attributes_descriptions, updateButtonDefinition.text_content)
        let deleteButton = ElementBuilder.buildHTMLElement(deleteButtonDefinition.element_type, deleteButtonDefinition.attributes_descriptions, deleteButtonDefinition.text_content)

        // chain it all together

        eventsDiv.appendChild(eventsHeader)
        eventsDiv.appendChild(eventsParagraph)
        eventsDiv.appendChild(eventsParagraph2)
        eventsDiv.appendChild(eventsParagraph3)
        eventsDiv.appendChild(updateButton)

        eventsDiv.appendChild(deleteButton)


        updateButton.addEventListener("click", () => {
            document.querySelector("#event_name").value = this.name
            document.querySelector("#event_date").value = this.date
            document.querySelector("#event_time").value = this.time
            document.querySelector("#event_location").value = this.location
            document.querySelector("#event_id").value = this.id
            

            document.querySelector("#event_form").classList.remove("submit_state")
            document.querySelector("#event_form").classList.add("edit_state")
        })

        // add delete function to button

        deleteButton.addEventListener("click", () => {
            APICollection.deleteAPI(`http://localhost:8088/events/${this.id}`).then(
                window.location.reload("http://localhost:8080")
            )
        })

        return eventsDiv
    }

}