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
            "attribute_descriptions": [{
                "attribute_name": "class",
                "attribute_value": "task"
            }]
        }
        let taskNameDefinition = {
            "element_type": "button",
            "text_content": `${this.task}`,
            "attribute_descriptions": [{
                "attribute_name": "class",
                "attribute_value": `task_${this.id} incomplete`
            }]
        }
        let paragraphDefinition = {
            "element_type": "p",
            "text_content": `Expected Completion Date: ${this.date}`,
            "attribute_descriptions": [{
                "attribute_name": "class",
                "attribute_value": "date"
            }]
        }

        // let updateButtonDefinition = {
        //     "element_type": "button",
        //     "text_content": "Edit Task",
        //     "attribute_descriptions": [
        //         {
        //             "attribute_name": "class",
        //             "attribute_value": "btn edit_task"
        //         }
        //     ]
        // }
        let checkboxDefinition = {
            "element_type": "input",
            "attribute_descriptions": [{
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
            "attributes_descriptions": [{
                    "attribute_name": "type",
                    "attribute_value": "hidden"
                },
                {
                    "attribute_name": "id",
                    "attribute_value": "tasks_status"
                },
            ]
        }
        let hiddenSelector2 = {
            "element_type": "input",
            "text_content": "Press ENTER to save",
            "attributes_descriptions": [{
                    "attribute_name": "type",
                    "attribute_value": "text"
                },
                {
                    "attribute_name": "class",
                    "attribute_value": `task_${this.id} editor`
                },
                {
                    "attribute_name": "style",
                    "attribute_value": "display:none"
                },
                {
                    "attribute_name": "placeholder",
                    "attribute_value": "Rename your task"
                }
            ]
        }

        let taskDiv = ElementBuilder.buildHTMLElement(divDefinition.element_type, divDefinition.attribute_descriptions)
        let taskHeader = ElementBuilder.buildHTMLElement(taskNameDefinition.element_type, taskNameDefinition.attribute_descriptions, taskNameDefinition.text_content)
        let taskParagraph = ElementBuilder.buildHTMLElement(paragraphDefinition.element_type, paragraphDefinition.attribute_descriptions, paragraphDefinition.text_content)
        let checkButton = ElementBuilder.buildHTMLElement(checkboxDefinition.element_type, checkboxDefinition.attribute_descriptions)
        let tasksStatusUpdater = ElementBuilder.buildHTMLElement(hiddenSelector.element_type, hiddenSelector.attributes_descriptions)
        let taskNameEditor = ElementBuilder.buildHTMLElement(hiddenSelector2.element_type, hiddenSelector2.attributes_descriptions, hiddenSelector2.text_content)

        taskDiv.appendChild(taskHeader)
        taskDiv.appendChild(taskParagraph)
        taskDiv.appendChild(tasksStatusUpdater)
        taskDiv.appendChild(checkButton)
        taskHeader.appendChild(taskNameEditor)

        checkButton.addEventListener("click", () => {
            if (document.querySelector(`.task_${this.id}`).classList.contains("incomplete")) {
                document.querySelector(`.task_${this.id}`).classList.remove("incomplete")
                document.querySelector(`.task_${this.id}`).classList.add("complete")
                const newTaskStatus = {
                    completed: true
                }
                APICollection.patchAPI(`http://localhost:8088/tasks/${this.id}`, newTaskStatus)
            } else {
                document.querySelector(`.task_${this.id}`).classList.remove("complete")
                document.querySelector(`.task_${this.id}`).classList.add("incomplete")
                const newTaskStatus = {
                    completed: false
                }
                APICollection.patchAPI(`http://localhost:8088/tasks/${this.id}`, newTaskStatus)
            }

        })
        
        taskHeader.addEventListener("click", () => {
            taskNameEditor.style.display = "inline"
            console.log("hi")
        })
        taskNameEditor.addEventListener("keypress", (event) => {
            var key = event.which || event.keyCode
            if (key === 13) {
              console.log(taskNameEditor.value)
                taskHeader.innerText = taskNameEditor.value;
                taskNameEditor.style.display = "none";
                const newTaskStatus = {
                    task: taskNameEditor.value
                }
                APICollection.patchAPI(`http://localhost:8088/tasks/${this.id}`, newTaskStatus)
                  .then(() => {taskHeader.appendChild(taskNameEditor)})

            }
        })
        return taskDiv
    }
}