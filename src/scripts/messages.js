// In charge of the outputting messages

//A Contact component that displays a person's name, phone number, and address.

import ElementBuilder from "./elementBuilder";
import APICollection from "./apiCollection";
import MessagesList from "./messagesList"


export default class Message {
  constructor(message, userId, date) {
    this.message = message;
    this.userId = userId;
    this.date = date;
  }

  static messageMaster() {
    APICollection.getMessages()
      .then(msgArray => {
        // sort the messages by date
        return MessagesList.sortMessages(msgArray);
      })
      .then(sorted => {
        // build the ul
        console.log(sorted)
        // return MessagesList.renderMessages2(sorted);
        return MessagesList.renderMessages3(sorted);
      })
      .then(toAppend => {
        // append the ul
        console.log(toAppend)
        MessagesList.displayMessages(toAppend);
      });
  }
}
