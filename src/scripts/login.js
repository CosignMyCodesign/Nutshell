// handles user login, stores to session storage

import APICollection from "./apiCollection"

// function to save user to session storage
const saveUser = (username, password) => {
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("password", password);
    console.log("user saved to session storage")
}

// adding EL and logic to save button
const saveBtn = document.getElementById("submit-login");
saveBtn.addEventListener("click", e => {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    APICollection.fetchUsers().then(returned => {
        LoginCollection.verifyUser3(returned, username, password)
    })
})

// gets current session storage and logs to console
const retrieveBtn = document.getElementById("getUser")
retrieveBtn.addEventListener("click", e => {
    console.log("current user is", sessionStorage.getItem("username"))
})

// declare variable to hold result from checking
let testResult;


export default class LoginCollection {
    static verifyUser(array, un, pw) {
        array.forEach(element => {
            if (element.username.indexOf(un) > -1 ) {
                console.log(`${un} is in the database`)
                // now check password
                if (element.password.indexOf(pw) > -1) {
                    console.log("you are in!")
                    // log in
                    saveUser(username.value, password.value)
                    // save user to session storage, hide login div, show everything else
                } else {
                    console.log("your password does not match")
                    // if pass does not match, tell user their PW is wrong
                }
            }
            console.log("No username match found. Please register a new account.")
        });
    }
    static verifyUser2 (array, un) {
        array.some(function (value, index) {
            // console.log(index + ": " + value.username);
            console.log("no match yet...")
            return value.username === un;
        });
    }
    static verifyUser3 (array, un, pw) {
        for(let i=0; i < array.length; i++) {
            if (array[i].username.indexOf(un) > -1 ) {
                // now check password
                if (array[i].password.indexOf(pw) > -1) {
                    // log in
                    saveUser(username.value, password.value)
                    // save user to session storage, hide login div, show everything else
                    testResult = "You are logged in!"
                    break
                } else {
                    testResult = "Your password does not match. Please try again."
                    break
                }
            } else {
                testResult = "No username found. Please register a new account.";
            }
        } 
        // tell the user the result of the test
        console.log(testResult)
    }
}