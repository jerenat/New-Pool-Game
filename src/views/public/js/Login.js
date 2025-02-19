"use strict";

let loginForm = document.querySelector("#loginForm");





async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

function formToJSON(elem) {
    let output = {};
    new FormData(elem).forEach((value, key) => {
        // Check if property already exist
        if (Object.prototype.hasOwnProperty.call(output, key)) {
            let current = output[key];
            if (!Array.isArray(current)) {
                // If it's not an array, convert it to an array.
                current = output[key] = [current];
            }
            current.push(value); // Add the new value to the array.
        } else {
            output[key] = value;
        }
    });
    return JSON.stringify(output);
}



loginForm.addEventListener("submit", async (e) => {
    var fData = formToJSON(loginForm);

    postData("/api/login", JSON.parse(fData)).then((data) => {
        switch (data.message) {
            case "OK":
                window.location.href = "/game/1";
                break;
        }
    });

    e.preventDefault();
});