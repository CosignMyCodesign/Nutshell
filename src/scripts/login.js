// handles user login, stores to session storage

import APICollection from "./apiCollection";

// function to save user to session storage - no longer needed! can delete
const saveUser = username => {
  sessionStorage.setItem("username", username);
  // sessionStorage.setItem("password", password);
  console.log("user saved to session storage");
};

// TODO - move username and password outside of these EL's
// but they will have different ID's when dynamically created

// TESTING
const username = document.getElementById("username");
const password = document.getElementById("password");

// function to clear fields
const clearFields = () => {
    username.value = "";
    password.value = "";
}

// adding EL and logic to "go" button
const saveBtn = document.getElementById("submit-login");
saveBtn.addEventListener("click", e => {
//   const username = document.getElementById("username");
//   const password = document.getElementById("password");
  APICollection.fetchUsers().then(returned => {
    LoginCollection.verifyUser(returned, username.value, password.value);
  });
  username.value = "";
  password.value = "";
});

const registerButton = document.getElementById("submit-register");
registerButton.addEventListener("click", e => {
//   const username = document.getElementById("username");
//   const password = document.getElementById("password");
  APICollection.fetchUsers().then(returned => {
    LoginCollection.registerUser(returned, username.value, password.value);
  });
//   username.value = "";
//   password.value = "";
});

// gets current session storage and logs to console
const retrieveBtn = document.getElementById("getUser");
retrieveBtn.addEventListener("click", e => {
  console.log("current user is", sessionStorage.getItem("username"));
});

const logout = document.getElementById("logout");
logout.addEventListener("click", e => {
    LoginCollection.logout();
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

export default class LoginCollection {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  static verifyUser(array, un, pw) {
    // declare variable to hold result from checking
    let testResult;
    for (let i = 0; i < array.length; i++) {
      if (array[i].username.indexOf(un) > -1) {
        // now check password
        if (array[i].password.indexOf(pw) > -1) {
          // log in
          // store user ID (from matching object) in session storage
          sessionStorage.setItem("userID", array[i].id)
          sessionStorage.setItem("username", array[i].username)
          // TODO: save user to session storage, hide login div, show everything else

          testResult = "You are logged in!";
          break;
        } else {
          testResult = "Your password does not match. Please try again.";
          break;
        }
      } else {
        testResult = "No username found. Please register a new account.";
      }
    }
    // tell the user the result of the test
    console.log(testResult);
  }

  static registerUser(array, un, pw) {
    // check database to see if user exists
    let verified = true;
    let message = "";
    for (let i = 0; i < array.length; i++) {
      if (array[i].username.indexOf(un) != -1) {
        console.log(array[i].username.indexOf(un))
        console.log(array[i].username)
        console.log(un)
        // problem
        message = "Username already exists, please try logging in.";
        verified = false;
        break;
      } else {
        console.log("no match:" + array[i])
        verified = true;
      }
    }
    // if user was not in database, allow registration
    if (verified) {
      message = "saving new user";
      let toSave = new LoginCollection(un, pw);
      APICollection.postUser(toSave);
    }
    console.log(message);
  }

  static logout() {
    // clear out session storage
    sessionStorage.clear();
    // TODO: hide all divs, show login div
  }
}
