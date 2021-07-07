document.addEventListener("click", (e) => {
    if (e.target == document.querySelector(".center img:nth-child(1)")) {
        document.querySelector(".start").classList.add("show-start");
    } else if (e.target == document.getElementById("searchIcon")) {
        // making the search button at the taskbar work
        console.log("search icon clicked");
        document.querySelector(".start").classList.add("show-start");
        //fixing wired start menu entry when search button clicked directly
        if (document.querySelector(".start").classList.contains("show-start")) {
            setTimeout(() => {
                document.getElementById("searchBar").focus();
            }, 0.4e3)
        }
        else document.getElementById("searchBar").focus();
    }
    // ? close the menu if the user clicks outside of it
    else if (e.target == document.getElementById("searchBar")) {
        console.log("searching for you");
        // handling the weird logic of closing start menu while clicking on searchIcon
    } else if (e.target.offsetParent != document.querySelector(".start")) {
        document.querySelector(".start").classList.remove("show-start");
    };
});
let dt = new Date().toLocaleString().split(", ");
document.querySelector(".time-date > span:nth-child(2)").innerText = dt[0];
document.querySelector(".time-date > span:nth-child(1)").innerText = dt[1];
setInterval(() => {
    document.querySelector(".time-date > span:nth-child(1)").innerText = new Date().toLocaleString().split(", ")[1];
}, 1e3)
