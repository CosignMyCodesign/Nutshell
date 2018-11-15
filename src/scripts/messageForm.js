//in charge of taking in messages and building the form
//username/email before message
//user edits own message

import APICollection from "./apiCollection"
import Message from "./messages";
import MessagesList from "./messagesList";



export default class MessageForm {
    // create forms
    static msgFormCreator () {
        const formTarget = document.getElementById("messages_form");
        
        // create form element
        let form = document.createElement("form")
        form.id = "msgForm"

        // create field to hold message body
        let msgBodyField = document.createElement("textarea")
        msgBodyField.setAttribute("rows", "10")
        msgBodyField.setAttribute("cols", "50")
        msgBodyField.setAttribute("style", "resize:none")
        msgBodyField.id = "message_body"
        // append to form
        form.appendChild(msgBodyField)

        // create send button
        let sendBtn = document.createElement("button")
        sendBtn.innerText = "Send"
        sendBtn.id = "send_btn"
        // append to form
        form.appendChild(sendBtn)

        // append whole thing to formTarget (DOM)
        formTarget.appendChild(form)

        // add event listener for submit (click or enter)
        document.getElementById("msgForm").addEventListener("submit", (e) => {
            e.preventDefault();
            let currDate = new Date
            let body = document.getElementById("message_body").value
            let message = new Message(body, sessionStorage.getItem("username"), currDate)
            // post message to database, clear out div, re-render
            APICollection.postMessage(message)
            // APICollection.postMessage(message).then(response => {
            //     // let li = document.createElement("li")
            //     // li.id = "message"
            //     // li.textContent = `${response.userId}, ${response.date}: ${response.message}`
            //     // document.getElementById("").appendChild(li)
            // })
        })
    }
}