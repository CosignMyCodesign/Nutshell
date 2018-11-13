// handles user login, stores to session storage

import APICollection from "./apiCollection"

// function to save user to session storage
const saveUser = (username, password) => {
    sessionStorage.setItem("username", username);
    // sessionStorage.setItem("password", password);
    console.log("user saved to session storage")
}

// adding EL and logic to "go" button
const saveBtn = document.getElementById("submit-login");
saveBtn.addEventListener("click", e => {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    APICollection.fetchUsers().then(returned => {
        LoginCollection.verifyUser(returned, username, password)
    })
})

const registerButton = document.getElementById("submit-register");
registerButton.addEventListener("click", e => {
    console.log("register clicked")
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    LoginCollection.registerUser(username, password);
})

// gets current session storage and logs to console
const retrieveBtn = document.getElementById("getUser")
retrieveBtn.addEventListener("click", e => {
    console.log("current user is", sessionStorage.getItem("username"))
})

// creates login forms dynamically - tabled until core functionality is working
// const loginFormFactory = () => {
//     const loginSection = document.getElementById("login")
//     loginSection.innerHTML = ""
    
//     let user_field = document.createElement("input")
//     user_field.setAttribute("type", "text")
//     let user_label = document.createElement("label")
//     user_label.innerHTML = "Username"
    
//     let pass_field = document.createElement("input")
//     pass_field.setAttribute("type", "text")
//     let pass_label = document.createElement("label")
//     pass_label.innerHTML = "Password"

    
//     loginSection.appendChild(user_field)
//     loginSection.appendChild(user_label)
//     loginSection.appendChild(pass_field)
//     loginSection.appendChild(pass_label)
// }

// document.getElementById("login_forms").addEventListener("click", e => {
//     loginFormFactory();
//     console.log("login forms created")
// })

// creates registration forms dynamically




// declare variable to hold result from checking
let testResult;


export default class LoginCollection {
    constructor(username, password) {
        this.username = username
        this.password = password
    }
    
    static verifyUser (array, un, pw) {
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
    static registerUser (un, pw) {
        // check database to see if user exists


        // if they don't exist, allow new registration
        // this should return the user ID from the database, which is what we store in sess store
        let toSave = new LoginCollection (un, pw)
        APICollection.postUser(toSave)

        // send this login info to the database "postUser" method from API collection
    }

    static logout () {
        // clear out session storage

        // hide all divs, show login div
    }
}