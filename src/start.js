document.addEventListener("click", (e) => {
    if (e.target == document.querySelector(".center img:nth-child(1)")) {
        document.querySelector(".start").classList.add("show-start");
    }
    // ? close the menu if the user clicks outside of it
    else if (e.target.offsetParent != document.querySelector(".start")) {
        document.querySelector(".start").classList.remove("show-start");
    };
});
let dt = new Date().toLocaleString().split(", ");
document.querySelector(".time-date > span:nth-child(2)").innerHTML = dt[0];
document.querySelector(".time-date > span:nth-child(1)").innerHTML = dt[1];
setInterval(() => {
    document.querySelector(".time-date > span:nth-child(1)").innerHTML = new Date().toLocaleString().split(", ")[1];
}, 1e3)