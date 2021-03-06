// In charge of executing all the DOM-builders etc.
import EventsList from "./eventsList";
import EventsForm from "./eventsForm";
import NewsList from "./newsList";
import NewsForm from "./newsForm";
import DomManager from "./domManager";
import APICollection from "./apiCollection";
import LoginCollection from "./login";
import TasksList from "./tasksList";
import TasksForm from "./tasksForm";
// import MessageForm from "./messageForm";
// import MessagesList from "./messagesList";
// import Message from "./messages";
import MessageForm2 from "./messagesForm2";
import MessagesList2 from "./messagesList2";

// messages //

// window.onload = MessageForm.msgFormCreator();

// Message.messageMaster()

EventsList.buildEventsList()
.then(function(eventsList) {
  DomManager.elementAppender(eventsList, "#events_output")
  let container = document.getElementById("events_list").childNodes[0]
  if(container) {
    container.classList.add("prominent")
  }
})
DomManager.elementAppender(EventsForm.buildEventForm("post"), "#events_form");

let get_messages_list = MessagesList2.buildMessagesList()
DomManager.elementAppender(get_messages_list, "#messages_output")
DomManager.elementAppender(MessageForm2.buildMessagesForm("post"), "#messages_form");

let get_task_list = TasksList.buildTaskList()
DomManager.elementAppender(get_task_list, "#tasks_output")
DomManager.elementAppender(TasksForm.buildTasksForm("post"), "#tasks_form")

let get_news_list = NewsList.buildNewsList()
DomManager.elementAppender(get_news_list, "#news_output")
DomManager.elementAppender(NewsForm.buildNewsForm("post"), "#news_form")
