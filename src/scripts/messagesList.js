//This module takes the message and displays it in the dom

import Message from "./messages";
import APICollection from "./apiCollection";
import ElementBuilder from "./elementBuilder";

export default class MessagesList {
  static sortMessages(array) {
    let sorted = array.sort(function(a, b) {
      let c = new Date(a.date);
      let d = new Date(b.date);
      return c - d;
    });
    return sorted
  }

  static renderMessages() {
    // function to render messages from database
    let ul = {
      element_type: "div",
      attribute_descriptions: [
        {
          attribute_name: "class",
          attribute_value: "news"
        }
      ]
    };
    let li = {
      element_type: "h3",
      text_content: `${this.title}`,
      attribute_descriptions: [
        {
          attribute_name: "id",
          attribute_value: `news_${this.id}`
        }
      ]
    };
  }

  static renderMessages2(array) {
    let ul = document.createElement("ul");
    array.forEach(element => {
        let li = document.createElement("li")
        li.className = "message"
        li.textContent = `${element.userId}, ${element.date}: ${element.message}`
        ul.appendChild(li)
    });
    return ul
  }
}
