function getSession() {
    let raw = sessionStorage.getItem("chb_session");

    if (raw === null) {
        return null;
    }

    try {
        return JSON.parse(raw);
    } catch (error) {
        // Corrupted/tampered value — treat as logged out, and clean it up
        // so it doesn't keep failing on every future check.
        sessionStorage.removeItem("chb_session");
        return null;
    }
}

// Runs immediately at script load, before the rest of the page renders.
(function enforceSession() {
    let session = getSession();

    if (session === null) {
        window.location.replace("login.html");
    }
})();

// Runs once the DOM exists — wires up logout if a logout button is present.
document.addEventListener("DOMContentLoaded", function () {
    let logoutBtn = document.getElementById("logout-btn");

    if (logoutBtn === null) {
        return;
    }

    logoutBtn.addEventListener("click", function () {
        sessionStorage.removeItem("chb_session");
        window.location.replace("login.html");
    });
});