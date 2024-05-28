document.addEventListener("DOMContentLoaded", function () {
    document
        .getElementById("login-link")
        .addEventListener("click", function (event) {
            event.preventDefault();
            let signup_container = document.querySelector(".signup-container");
            let currentZIndex_sign = window.getComputedStyle(signup_container).zIndex;

            let login_container = document.querySelector(".login-container");
            let currentZIndex_login= window.getComputedStyle(login_container).zIndex;
            console.log(`sign ${currentZIndex_sign}`);
            // console.log(`login ${currentZIndex_login}`);
            if (currentZIndex_login == "3") {
                login_container.style.zIndex = 4;
                signup_container.style.zIndex=3
            } else {
                login_container.style.zIndex = 3;
            }
        });
});

document.addEventListener("DOMContentLoaded", function () {
    document
        .getElementById("signup-link")
        .addEventListener("click", function (event) {
            event.preventDefault();
            let signup_container = document.querySelector(".signup-container");
            let currentZIndex_sign = window.getComputedStyle(signup_container).zIndex;

            let login_container = document.querySelector(".login-container");
            let currentZIndex_login= window.getComputedStyle(login_container).zIndex;
            console.log(`sign ${currentZIndex_sign}`);
            // console.log(`login ${currentZIndex_login}`);
            if (currentZIndex_login == "4") {
                signup_container.style.zIndex = 4;
                login_container.style.zIndex=3;
                console.log(`sign ${currentZIndex_sign}`);
            } else {
                login_container.style.zIndex = 3;
            }
        });
});

// document.addEventListener("DOMContentLoaded", function () {
//     document
//         .getElementById("signup-link")
//         .addEventListener("click", function (event) {
//             event.preventDefault();
//             let signup_container = document.querySelector(".login-container");
//             // let currentZIndex_sign = window.getComputedStyle(signup_container).zIndex;

//             let login_container = document.querySelector(".signup-container");
//             let currentZIndex_login =window.getComputedStyle(login_container).zIndex;
//             console.log(currentZIndex_login);
//             if (currentZIndex_login == "3") {
//                 signup_container.style.zIndex = 4;
//                 login_container.style.zIndex = 3;
//             } else {
//                 signup_container.style.zIndex = 5;
//             }
//         });
// });
