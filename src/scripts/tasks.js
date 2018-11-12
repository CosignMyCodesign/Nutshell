// In charge of the tasks page

import ElementBuilder from "./elementBuilder"
import APICollection from "./apiCollection"

export default class Tasks {
    constructor(task, date, userId, id) {
        this.task = task
        this.date = date
        this.userId = userId
        this.id = id
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
                    "attribute_name": "id",
                    "attribute_value": `task_${this.id}`
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
        let checkButtonDefinition = {
            "element_type": "button",
            "text_content": "Check task as complete",
            "attribute_descriptions": [
                {
                    "attribute_name": "class",
                    "attribute_value": "btn checkOff_task"
                }
            ]
        }

        let taskDiv = ElementBuilder.buildHTMLElement(divDefinition.element_type, divDefinition.attribute_descriptions)
        let taskHeader = ElementBuilder.buildHTMLElement(header3Definition.element_type, header3Definition.attribute_descriptions, header3Definition.text_content)
        let taskParagraph = ElementBuilder.buildHTMLElement(paragraphDefinition.element_type, paragraphDefinition.attribute_descriptions, paragraphDefinition.text_content)
        let updateButton = ElementBuilder.buildHTMLElement(updateButtonDefinition.element_type, updateButtonDefinition.attribute_descriptions, updateButtonDefinition.text_content)
        let checkButton = ElementBuilder.buildHTMLElement(checkButtonDefinition.element_type, checkButtonDefinition.attribute_descriptions, checkButtonDefinition.text_content)

        taskDiv.appendChild(taskHeader)
        taskDiv.appendChild(taskParagraph)
        taskDiv.appendChild(updateButton)
        taskDiv.appendChild(checkButton)

        checkButton.addEventListener("click", () => {
            APICollection.deleteAPI(`http://localhost:8088/tasks/${this.id}`).then(
                window.location.reload("http://localhost:8080")
            )
        })

        return taskDiv
    }
}