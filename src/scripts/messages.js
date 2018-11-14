// In charge of the outputting messages

//A Contact component that displays a person's name, phone number, and address.

import ElementBuilder from "./elementBuilder"
import APICollection from "./apiCollection"

export default class Message {
    constructor(message, userId, date) {
        this.message = message
        this.userId = userId
        this.date = date
    }
}