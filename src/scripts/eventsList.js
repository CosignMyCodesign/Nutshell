// Takes the events and displays them in the dom
// Sort by date of event

import Events from "./events"
import APICollection from "./apiCollection"
import ElementBuilder from "./elementBuilder"

export default class NewsList {
  static buildEventsList() {
      let unorderedListDefinition = {
          "element_type": "ul",
          "attributes_descriptions": [
              {
                  "attribute_name": "id",
                  "attribute_value": "events_list"
              },
              {
                  "attribute_name": "class",
                  "attribute_value": "events_list"
              }
          ]
      }

      let listDefinition = {
        "element_type": "li",
        "attributes_descriptions": [
            {
                "attribute_name": "class",
                "attribute_value": "events"
            }
        ]
    }

    let unordered_events_list = ElementBuilder.buildHTMLElement(unorderedListDefinition.element_type, unorderedListDefinition.attributes_descriptions)

    APICollection.getAPI("http://localhost:8088/events").then((events) => {
      events.forEach((event) => {
          let currentEvent = new Events(event.name, event.date, event.location, event.userId, event.id)
          let currentEventDisplay = currentEvent.buildEventsDisplay()

          let listed_event = ElementBuilder.buildHTMLElement(listDefinition.element_type, listDefinition.attributes_descriptions)
          listed_event.appendChild(currentEventDisplay)
          unordered_events_list.appendChild(listed_event)
      })
      //needs to return outside of loop so it cycles through ALL events
  })
  return unordered_events_list







    }
  }