// In charge of executing all the DOM-builders etc.

import NewsList from "./newsList"
import NewsForm from "./newsForm"
import DomManager from "./domManager"
import TasksList from "./tasksList"
import TasksForm from "./tasksForm"

let get_news_list = NewsList.buildNewsList()
console.log(get_news_list);

let get_task_list = TasksList.buildTaskList()
console.log(get_task_list)

DomManager.elementAppender(get_news_list, "#news_output")
DomManager.elementAppender(NewsForm.buildNewsForm("post"), "#news_form")
DomManager.elementAppender(get_task_list, "#tasks_output")
DomManager.elementAppender(TasksForm.buildTasksForm("post"), "#tasks_form")
