// handles user login, stores to session storage

import APICollection from "./apiCollection";

// target div to display user messages
const messageDiv = document.getElementById("message_div");

// function to clear fields
const clearFields = () => {
  username.value = "";
  password.value = "";
};

// gets current session storage and logs to console
const retrieveBtn = document.getElementById("getUser");
retrieveBtn.addEventListener("click", e => {
  console.log("current user is", sessionStorage.getItem("username"));
});

// logout button
const logout = document.getElementById("logout");
logout.addEventListener("click", e => {
  LoginCollection.logout();
  console.log("You've been logged out. Thanks for using Nutshell!");
//   messageDiv.innerText = "You've been logged out. Thanks for using Nutshell!"
});

// creates login forms dynamically
const loginFormFactory = () => {
  const loginSection = document.getElementById("login_fields");
  loginSection.innerHTML = "";

  let user_field = document.createElement("input");
  user_field.setAttribute("type", "text");
  user_field.id = "username";
  let user_label = document.createElement("label");
  user_label.innerHTML = "Username";

  let pass_field = document.createElement("input");
  pass_field.setAttribute("type", "password");
  pass_field.id = "password";
  let pass_label = document.createElement("label");
  pass_label.innerHTML = "Password";

  let loginButton = document.createElement("button");
  loginButton.innerText = "Login";
  loginButton.id = "submit-login";

  loginSection.appendChild(user_field);
  loginSection.appendChild(user_label);
  loginSection.appendChild(pass_field);
  loginSection.appendChild(pass_label);
  loginSection.appendChild(loginButton);
};

// add EL + call function to create login forms
document.getElementById("login_form_button").addEventListener("click", e => {
  loginFormFactory();
  console.log("login forms created");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  // adding EL and logic to "go" button
  const saveBtn = document.getElementById("submit-login");
  saveBtn.addEventListener("click", e => {
    APICollection.fetchUsers()
      .then(returned => {
        LoginCollection.verifyUser(returned, username.value, password.value);
      })
      .then(data => {
        clearFields();
      });
  });
});

// creates registration forms dynamically
const regFormFactory = () => {
  const loginSection = document.getElementById("login_fields");
  loginSection.innerHTML = "";

  let user_field = document.createElement("input");
  user_field.setAttribute("type", "text");
  user_field.id = "username";
  let user_label = document.createElement("label");
  user_label.innerHTML = "Username";

  let pass_field = document.createElement("input");
  pass_field.setAttribute("type", "text");
  pass_field.id = "password";
  let pass_label = document.createElement("label");
  pass_label.innerHTML = "Desired Password";

  let loginButton = document.createElement("button");
  loginButton.innerText = "Login";
  loginButton.id = "register_user";

  loginSection.appendChild(user_field);
  loginSection.appendChild(user_label);
  loginSection.appendChild(pass_field);
  loginSection.appendChild(pass_label);
  loginSection.appendChild(loginButton);
};

// add EL + call function to create registration forms
document.getElementById("registration_forms").addEventListener("click", e => {
  regFormFactory();
    const registerButton = document.getElementById("register_user");
  registerButton.addEventListener("click", e => {
    APICollection.fetchUsers()
      .then(returned => {
        LoginCollection.registerUser(returned, username.value, password.value);
      })
      .then(data => {
        clearFields();
      });
  });
});

// class to handle all login/registration/logout interactions
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
        if (array[i].password === pw) {
          // log in
          // store user ID (from matching object) in session storage
          sessionStorage.setItem("userID", array[i].id);
          sessionStorage.setItem("username", array[i].username);
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
    // messageDiv.innerText = testResult;
  }

  static registerUser(array, un, pw) {
    // check database to see if user exists
    let verified = true;
    let message = "";
    for (let i = 0; i < array.length; i++) {
      if (array[i].username.indexOf(un) != -1) {
        // console.log(array[i].username.indexOf(un));
        // console.log(array[i].username);
        // console.log(un);
        // problem
        message = "Username already exists, please try logging in.";
        verified = false;
        break;
      } else {
        // console.log("no match:" + array[i]);
        verified = true;
      }
    }
    // if user was not in database, allow registration
    if (verified) {
      message = "New user saved. Please log in.";
      let toSave = new LoginCollection(un, pw);
      APICollection.postUser(toSave);
    }
    console.log(message);
    // messageDiv.innerText = testResult;
  }

  static logout() {
    // clear out session storage
    sessionStorage.clear();
    // TODO: hide all divs, show login div
  }
}
