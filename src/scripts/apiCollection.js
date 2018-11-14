// In charge of doing all database interactions with the API

export default class APICollection {
    static getAPI(url) {
        return fetch(url).then(response => response.json())
    }
    // post
    static postAPI(url, payload) {
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
    }
    // patch
    static patchAPI(url, payload) {
          return fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          })
        
    }
    // put
  //   static putAPI(url, payload) {
  //     fetch(url, {
  //         method: "PUT",
  //         headers: {
  //             "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify(payload)
  //     })
  // }
    // delete
    static deleteAPI(url) {
        return fetch(url, {
            method: "DELETE"
        })
    }
    // fetch array of users from DB
    static fetchUsers() {
        return fetch("http://localhost:8088/user").then(response => response.json())
    }
    // save user to DB
    static postUser(payload) {
        return fetch("http://localhost:8088/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
    }
}