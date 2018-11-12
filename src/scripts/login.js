// handles user login, stores to session storage

import APICollection from "./apiCollection"

// function to save user to session storage
const saveUser = (username, password) => {
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("password", password);
}

// adding EL and logic to save button
const saveBtn = document.getElementById("submit-login");
saveBtn.addEventListener("click", e => {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    saveUser(username, password)
    console.log("user saved to session storage")
})

// gets current session storage and logs to console
const retrieveBtn = document.getElementById("getUser")
retrieveBtn.addEventListener("click", e => {
    console.log("current user is", sessionStorage.getItem("username"))
})


export default class LoginCollection {
    static verifyUser(array, un, pw) {
        array.forEach(element => {
            if (element.username.indexOf(un) > -1 ) {
                console.log(`${un} is in the database`)
                // now check password
                // how to exit loop when this happens?
                if (element.password.indexOf(pw) > -1) {
                    console.log("you are in!")
                } else {
                    console.log("your password does not match")
                }
                // if pass matches, log in, hide login div and show everything else
                // if pass does not match, tell user their PW is wrong
            }
                // if no match, alert user to register
        });
    }
    static verifyUser2 (array, un) {
        array.some(function (value, index) {
            // console.log(index + ": " + value.username);
            console.log("no match yet...")
            return value.username === un;
        });
    }
}