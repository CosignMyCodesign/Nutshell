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
    ul.id = "message_ul";
    array.forEach(element => {
      let li = document.createElement("li");
      li.className = "message";
      li.textContent = `${element.userId}, ${element.date}: ${element.message}`;
      ul.appendChild(li);
    });
    return ul;
  }

  static renderMessages3(array) {
    let messageList = document.createElement("div");
    array.forEach(element => {
      let div = document.createElement("div");
      div.className = "message_div";
      
      let userHeading = document.createElement("h3")
      userHeading.textContent = `${element.userId} says: `
      div.appendChild(userHeading)

      let userMessage = document.createElement("button")
      userMessage.textContent = element.message
      userHeading.appendChild(userMessage)
      
      // let userTime = document.createElement("h4")
      // userTime.textContent = element.date
      // div.appendChild(userTime)

      let hiddenSelector = document.createElement("input")
      hiddenSelector.textContent = "edit message"
      hiddenSelector.style.display = "none"
      userMessage.appendChild(hiddenSelector)

      messageList.appendChild(div)

      userMessage.addEventListener("click", e => {
          hiddenSelector.style.display = "inline"
      })

      hiddenSelector.addEventListener("keypress", (event) => {
        var key = event.which || event.keyCode
        if (key === 13) {
          console.log(hiddenSelector.value)
            userMessage.innerText = hiddenSelector.value;
            hiddenSelector.style.display = "none";
            const editedMsg = {
                message: hiddenSelector.value
            }
            APICollection.patchAPI(`http://localhost:8088/messages/${element.id}`, editedMsg)
              .then(() => (userMessage.appendChild(hiddenSelector)))

        }
    })

    });
    return messageList
  }

  static displayMessages(toDisplay) {
    messageDiv.appendChild(toDisplay);
  }

  static clearDiv() {
    messageDiv.innerHTML = "";
  }
}
