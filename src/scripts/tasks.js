// In charge of the tasks page

import ElementBuilder from "./elementBuilder"
import APICollection from "./apiCollection"

export default class Tasks {
    constructor(task, date, userId, id, completed) {
        this.task = task
        this.date = date
        this.userId = userId
        this.id = id
        this.completed = completed
    }

    buildTaskDisplay() {
        let divDefinition = {
            "element_type": "div",
            "attribute_descriptions": [
                {
                    "attribute_name": "class",
                    "attribute_value": "task"
                }
            ]
        }
        let header3Definition = {
            "element_type": "h3",
            "text_content": `${this.task}`,
            "attribute_descriptions": [
                {
                    "attribute_name": "class",
                    "attribute_value": `task_${this.id} incomplete`
                }
            ]
        }
        let paragraphDefinition = {
            "element_type": "p",
            "text_content": `Expected Completion Date: ${this.date}`,
            "attribute_descriptions": [
                {
                    "attribute_name": "class",
                    "attribute_value": "date"
                }
            ]
        }

        let updateButtonDefinition = {
            "element_type": "button",
            "text_content": "Edit Task",
            "attribute_descriptions": [
                {
                    "attribute_name": "class",
                    "attribute_value": "btn edit_task"
                }
            ]
        }
        let checkboxDefinition = {
          "element_type": "input",
          "attribute_descriptions": [
              {
                  "attribute_name": "id",
                  "attribute_value": "task_checkbox"
              },
              {
                  "attribute_name": "class",
                  "attribute_value": "task_checkbox"
              },
              {
                  "attribute_name": "type",
                  "attribute_value": "checkbox"
              }
              
          ]
      }
      let hiddenSelector = {
            "element_type": "input",
            "attributes_descriptions": [
                {
                    "attribute_name": "type",
                    "attribute_value": "hidden"
                },
                {
                    "attribute_name": "id",
                    "attribute_value": "tasks_status"
                },
            ]
        }

        let taskDiv = ElementBuilder.buildHTMLElement(divDefinition.element_type, divDefinition.attribute_descriptions)
        let taskHeader = ElementBuilder.buildHTMLElement(header3Definition.element_type, header3Definition.attribute_descriptions, header3Definition.text_content)
        let taskParagraph = ElementBuilder.buildHTMLElement(paragraphDefinition.element_type, paragraphDefinition.attribute_descriptions, paragraphDefinition.text_content)
        let updateButton = ElementBuilder.buildHTMLElement(updateButtonDefinition.element_type, updateButtonDefinition.attribute_descriptions, updateButtonDefinition.text_content)
        let checkButton = ElementBuilder.buildHTMLElement(checkboxDefinition.element_type, checkboxDefinition.attribute_descriptions)
        let tasksStatusUpdater = ElementBuilder.buildHTMLElement(hiddenSelector.element_type, hiddenSelector.attributes_descriptions)

        taskDiv.appendChild(taskHeader)
        taskDiv.appendChild(taskParagraph)
        taskDiv.appendChild(updateButton)
        taskDiv.appendChild(tasksStatusUpdater)
        taskHeader.appendChild(checkButton)

        checkButton.addEventListener("click", () => {
          if(document.querySelector(`.task_${this.id}`).classList.contains("incomplete")) {
            document.querySelector(`.task_${this.id}`).classList.remove("incomplete")
            document.querySelector(`.task_${this.id}`).classList.add("complete")
            const newTaskStatus = {
              task: this.task,
              date: this.date,
              userId: 3,
              id: this.id,
              completed: true
            }
            APICollection.patchAPI(`http://localhost:8088/tasks/${this.id}`,newTaskStatus)
          } else {
            document.querySelector(`.task_${this.id}`).classList.remove("complete")
            document.querySelector(`.task_${this.id}`).classList.add("incomplete")
            const newTaskStatus = {
              task: this.task,
              date: this.date,
              userId: 3,
              id: this.id,
              completed: false
            }
            APICollection.patchAPI(`http://localhost:8088/tasks/${this.id}`,newTaskStatus)
          }
        })

        return taskDiv
    }
}