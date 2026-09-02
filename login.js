const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginError = document.getElementById("login-error");


const DASHBOARD_BY_ROLE = {
    admin: "index.html",
    manager: "index.html",
    cashier: "index.html"
};

loginForm.addEventListener("submit", function(event){
    event.preventDefault();

    let username = usernameInput.value.trim();
    let password = passwordInput.value;

    let matchedUser = mockUsers.find(function(user){
        return user.username.toLowerCase() === username.toLowerCase()
            && user.password === password;
    });

    if(matchedUser === undefined){
        loginError.textContent = "Incorrect username or password.";
        loginError.classList.remove("hidden");
        passwordInput.value = "";
        return;
    }

    loginError.classList.add("hidden");

    let session = {
        username: matchedUser.username,
        role: matchedUser.role,
        canEditProducts: matchedUser.canEditProducts
    };

    sessionStorage.setItem("chb_session", JSON.stringify(session));

    window.location.href = DASHBOARD_BY_ROLE[matchedUser.role];
});