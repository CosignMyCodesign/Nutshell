// This module takes the task and displays it in the DOM

import Tasks from "./tasks"
import APICollection from "./apiCollection"
import ElementBuilder from "./elementBuilder"

export default class TaskList {
  static buildTaskList() {
    let orderedListDefinition = {
      "element_type": "ol",
      "attributes_descriptions": [{
          "attribute_name": "id",
          "attribute_value": "task_list"
        },
        {
          "attribute_name": "class",
          "attribute_value": "task_list"
        }
      ]
    }

    let listDefinition = {
      "element_type": "li",
      "attributes_descriptions": [{
        "attribute_name": "class",
        "attribute_value": "task"
      }]
    }

    let ordered_task_list = ElementBuilder.buildHTMLElement(orderedListDefinition.element_type, orderedListDefinition.attributes_descriptions)

    APICollection.getAPI("http://localhost:8088/tasks").then((tasks) => {
      tasks.forEach((task) => {
        let currentTask = new Tasks(task.task, task.date, task.userId, task.id)
        let currentUser = sessionStorage.getItem("username")
        if(task.userId === currentUser) {
          let currentTaskDisplay = currentTask.buildTaskDisplay()
  
          let listed_task = ElementBuilder.buildHTMLElement(listDefinition.element_type, listDefinition.attributes_descriptions)
  
          listed_task.appendChild(currentTaskDisplay)
          ordered_task_list.appendChild(listed_task)
        }
      })
    })
    return ordered_task_list
  }
}