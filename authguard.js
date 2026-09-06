function getSession() {
    let raw = sessionStorage.getItem("chb_session");

    if (raw === null) {
        return null;
    }

    try {
        return JSON.parse(raw);
    } catch (error) {
        sessionStorage.removeItem("chb_session");
        return null;
    }
}

const DASHBOARD_BY_ROLE = {
    admin: "admin.html",
    manager: "manager.html",
    cashier: "cashier.html"
};

(function enforceSession() {
    let session = getSession();

    if (session === null) {
        window.location.replace("login.html");
        return;
    }

    let requiredRole = document.body.dataset.role;

    if (requiredRole && session.role !== requiredRole) {
        let correctDashboard = DASHBOARD_BY_ROLE[session.role];

        if (correctDashboard) {
            window.location.replace(correctDashboard);
        } else {
            
            sessionStorage.removeItem("chb_session");
            window.location.replace("login.html");
        }
    }
})();

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