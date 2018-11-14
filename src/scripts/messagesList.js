//This module takes the message and displays it in the dom

import Message from "./messages";
import APICollection from "./apiCollection";
import ElementBuilder from "./elementBuilder";

const messageDiv = document.getElementById("messages_output");

export default class MessagesList {
  static sortMessages(array) {
    let sorted = array.sort(function(a, b) {
      let c = new Date(a.date);
      let d = new Date(b.date);
      return c - d;
    });
    return sorted;
  }

  static renderMessages2(array) {
    let ul = document.createElement("ul");
    ul.id = "message_ul"
    array.forEach(element => {
      let li = document.createElement("li");
      li.className = "message";
      li.textContent = `${element.userId}, ${element.date}: ${element.message}`;
      ul.appendChild(li);
    });
    return ul;
  }

  static displayMessages(toDisplay) {
    messageDiv.appendChild(toDisplay);
  }

  static clearDiv() {
      messageDiv.innerHTML = ""
  }
}
