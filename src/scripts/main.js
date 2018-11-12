// In charge of executing all the DOM-builders etc.

import NewsList from "./newsList"
import NewsForm from "./newsForm"
import DomManager from "./domManager"
import APICollection from "./apiCollection";
import LoginCollection from "./login"

let get_news_list = NewsList.buildNewsList()
console.log(get_news_list);

DomManager.elementAppender(get_news_list, "#news_output")
DomManager.elementAppender(NewsForm.buildNewsForm("post"), "#news_form")

// fetch the collection, then call verifyUser to loop over array for matches
// this will actually be called when user clicks submit
// this is just for testing
// APICollection.fetchUsers().then(returned => {
//     LoginCollection.verifyUser(returned, "zac", "saban")
// })