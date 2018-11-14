//This module takes the message and displays it in the dom

import Message from "./messages";
import APICollection from "./apiCollection";
import ElementBuilder from "./elementBuilder";

export default class MessagesList {
  static sortMessages(a, b) {
    // function to sort message array by date
    let eventDateA = new Date(a.date),
      eventDateB = new Date(b.date);
    return eventDateA - eventDateB;
  }

  static sortMessages2(array) {
    array.sort(function(a,b){return a.getTime() - b.getTime()});
  }

  static renderMessages() {
    // function to render messages from database
  }
}
