// In charge of executing all the DOM-builders etc.
import EventsList from "./eventsList"
import EventsForm from "./eventsForm"
import NewsList from "./newsList"
import NewsForm from "./newsForm"
import DomManager from "./domManager"

let get_news_list = NewsList.buildNewsList()
console.log(get_news_list);
let get_events_list = EventsList.buildEventsList()

DomManager.elementAppender(get_events_list, "#events_output")
DomManager.elementAppender(EventsForm.buildEventForm("post"),"#events_form")
DomManager.elementAppender(get_news_list, "#news_output")
DomManager.elementAppender(NewsForm.buildNewsForm("post"), "#news_form")






// const dateSorted = (a, b) => {
//   let eventDateA = new Date(a.date), eventDateB = new Date(b.date);
//   return eventDateA - eventDateB;
// }
// let sortedEvents = get_events_list.dateSorted(a, b)