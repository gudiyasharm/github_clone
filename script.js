const user_img = document.querySelector(".user_img");
const userName = document.querySelector(".user_name h1");
const followers_ = document.querySelector(".followers_ span");
const follow_ = document.querySelector(".follow_ span");
const btn_submit = document.querySelector(".btn_submit");


let user_name = '';

function inputFunction() {
    let input_user = document.querySelector(".input_user").value.trim();

    if (input_user.length <= 0) {
        alert("Please enter github user name");
        document.querySelector(".input_user").value = "";
        document.querySelector(".input_user").focus();
        return false;
    } else {
        user_name = input_user.split("").join("");
        fetchUser();

        document.querySelector(".input_user").value = "";
        document.querySelector(".input_user").focus();
    }
};

btn_submit.addEventListener("click", function () {
    inputFunction()
});

document.querySelector(".input_user").addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        inputFunction()
    }
})

//fetching user from github api
function fetchUser() {
    fetch(`https://api.github.com/users/${user_name}`)
        .then(response => response.json())
        .then(function (data) {
            console.log(data);
            if (data.message === "Not Found") {
                alert("user not found");
                return false;
            } else {
                user_img.innerHTML = `<img src="${data.avatar_url}">`;
                userName.innerHTML = data.login;
                followers_.innerHTML = data.followers;
                follow_.innerHTML = data.following;

            }
        })
}