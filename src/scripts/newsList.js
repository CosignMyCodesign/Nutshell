//This module takes the message and displays it in the dom
//sort by date

import News from "./news"
import APICollection from "./apiCollection"
import ElementBuilder from "./elementBuilder"

export default class NewsList {
    static buildNewsList() {
        let unorderedListDefinition = {
            "element_type": "ul",
            "attributes_descriptions": [
                {
                    "attribute_name": "id",
                    "attribute_value": "news_list"
                },
                {
                    "attribute_name": "class",
                    "attribute_value": "news_list"
                }
            ]
        }

        let listDefinition = {
            "element_type": "li",
            "attributes_descriptions": [
                {
                    "attribute_name": "class",
                    "attribute_value": "news"
                }
            ]
        }

        let unordered_news_list = ElementBuilder.buildHTMLElement(unorderedListDefinition.element_type, unorderedListDefinition.attributes_descriptions)

        APICollection.getAPI("http://localhost:8088/news").then((news) => {
            news.forEach((article) => {
                let currentArticle = new News(article.title, article.synopsis, article.url, article.date, article.userId, article.id)
                let currentArticleDisplay = currentArticle.buildNewsDisplay()

                let listed_article = ElementBuilder.buildHTMLElement(listDefinition.element_type, listDefinition.attributes_descriptions)
                listed_article.appendChild(currentArticleDisplay)
                unordered_news_list.appendChild(listed_article)
            })
            //needs to return outside of loop so it cycles through ALL articles
        })
        return unordered_news_list
    }
}