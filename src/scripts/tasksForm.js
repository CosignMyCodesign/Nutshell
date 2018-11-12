// // This module is for the input tasks form

import APICollection from "./apiCollection"
import ElementBuilder from "./elementBuilder"

export default class TasksForm {
  static buildTasksForm(form_action) {
    let taskDefinition = {
      "element_type": "form",
      "attribute_descriptions": [{
          "attribute_name": "action",
          "attribute_value": "",
        },
        {
          "attribute_name": "id",
          "attribute_value": "new_task_form"
        },
        {
          "attribute_name": "class",
          "attribute_value": "new_task_form submit_state"
        }
      ]
    }

    let breakDefinition = {
      "element_type": "br",
      "attribute_descriptions": []
    }

    let fieldsetNameDefinition = {
      "element_type": "fieldset",
      "attribute_descriptions": [{
        "attribute_name": "class",
        "attribute_value": "new_task_title"
      }]
    }
    let labelNameDefinition = {
      "element_type": "label",
      "text_content": "Task Name: ",
      "attribute_descriptions": [{
        "attribute_name": "for",
        "attribute_value": "task_name"
      }]
    }

    let inputNameDefinition = {
      "element_type": "input",
      "attribute_descriptions": [
          {
              "attribute_name": "id",
              "attribute_value": "task_title"
          },
          {
              "attribute_name": "class",
              "attribute_value": "task_title"
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
        "attribute_value": "new_task_date"
      }]
    }

    let labelDateDefinition = {
      "element_type": "label",
      "text_content": "Date",
      "attribute_descriptions": [{
        "attribute_name": "for",
        "attribute_value": "task_date"
      }]
    }

    let inputDateDefinition = {
      "element_type": "input",
      "attribute_descriptions": [{
          "attribute_name": "id",
          "attribute_value": "task_date"
        },
        {
          "attribute_name": "class",
          "attribute_value": "task_date"
        },
        {
          "attribute_name": "type",
          "attribute_value": "date"
        }
      ]
    }

    let submitButtonDefinition = {
      "element_type": "button",
      "text_content": "Add Task",
      "attribute_descriptions": [{
        "attribute_name": "class",
        "attribute_value": "btn submit_task"
      }]
    }

    let tasksForm = ElementBuilder.buildHTMLElement(taskDefinition.element_type, taskDefinition.attribute_descriptions)
    let taskTitleFieldset = ElementBuilder.buildHTMLElement(fieldsetNameDefinition.element_type, fieldsetNameDefinition.attribute_descriptions)
    let taskTitleLabel = ElementBuilder.buildHTMLElement(labelNameDefinition.element_type, labelNameDefinition.attribute_descriptions, labelNameDefinition.text_content)
    let taskTitleInput = ElementBuilder.buildHTMLElement(inputNameDefinition.element_type, inputNameDefinition.attribute_descriptions)
    let taskDateFieldset = ElementBuilder.buildHTMLElement(fieldsetDateDefinition.element_type, fieldsetDateDefinition.attribute_descriptions)
    let taskDateLabel = ElementBuilder.buildHTMLElement(labelDateDefinition.element_type, labelDateDefinition.attribute_descriptions, labelDateDefinition.text_content)
    let taskDateInput = ElementBuilder.buildHTMLElement(inputDateDefinition.element_type, inputDateDefinition.attribute_descriptions)
    let taskSubmitButton = ElementBuilder.buildHTMLElement(submitButtonDefinition.element_type, submitButtonDefinition.attribute_descriptions, submitButtonDefinition.text_content)
    // let hiddenElement = ElementBuilder.buildHTMLElement(hiddenSelector.element_type, hiddenSelector.attributes_descriptions)
    taskTitleFieldset.appendChild(taskTitleLabel)
    taskTitleFieldset.appendChild(taskTitleInput)
    taskDateFieldset.appendChild(taskDateLabel)
    taskDateFieldset.appendChild(taskDateInput)

    tasksForm.appendChild(taskTitleFieldset)
    tasksForm.appendChild(taskDateFieldset)
    tasksForm.appendChild(taskSubmitButton)

    taskSubmitButton.addEventListener("click", () => {
      const newTaskTitle = document.querySelector("#task_title").value
      const newTaskDate = document.querySelector("#task_date").value
      const newTaskStatus = false
      // const newDate = new Date()
      // const newDateMonth = newDate.getMonth()+1
      // const newDateDay = newDate.getDate()
      // const newDateYear = newDate.getFullYear()

      const new_task = {
        title: newTaskTitle,
        date: newTaskDate,
        completed: newTaskStatus
      }

      APICollection.postAPI("http://localhost:8088/tasks", new_task).then(
        window.location.reload("http://localhost:8080")
      )
    })

    return tasksForm
  }
}