// In charge of executing all the DOM-builders etc.
import EventsList from "./eventsList"
import EventsForm from "./eventsForm"
import NewsList from "./newsList"
import NewsForm from "./newsForm"
import DomManager from "./domManager"

let get_news_list = NewsList.buildNewsList()
console.log(get_news_list);
let get_events_list = EventsList.buildEventsList()
console.log(get_events_list);

DomManager.elementAppender(get_events_list, "#events_output")
DomManager.elementAppender(EventsForm.buildEventForm("post"),"#events_form")
DomManager.elementAppender(get_news_list, "#news_output")
DomManager.elementAppender(NewsForm.buildNewsForm("post"), "#news_form")