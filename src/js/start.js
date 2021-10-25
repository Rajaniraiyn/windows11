// for Start and Search
document.addEventListener("click", (e) => {
    if (e.target == document.querySelector(".center img:nth-child(1)")) {
        document.querySelector(".start").classList.toggle("show-start");
    } else if (e.target == document.getElementById("searchIcon")) {
        // making the search button at the taskbar work
        console.log("search icon clicked");
        document.querySelector(".start").classList.toggle("show-start");
        //fixing weird start menu entry when search button clicked directly
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

// for Date Time
let dt = new Date().toLocaleString().split(", ");
document.querySelector(".time-date > span:nth-child(2)").innerText = dt[0];
document.querySelector(".time-date > span:nth-child(1)").innerText = dt[1];
setInterval(() => {
    document.querySelector(".time-date > span:nth-child(1)").innerText = new Date().toLocaleString().split(", ")[1];
}, 1e3)

// for Battery Saver Icons
let bIcon1 = document.querySelector(".taskbar .right .action-center-button > img:nth-child(3)")
let bIcon2 = document.querySelector(".ac-bottom > div.battery > img");
document.querySelector(".action-center figure:nth-child(4) > img").onclick = () => {
    if (bIcon1.src.includes("Full")) {
        bIcon1.src = bIcon2.src = bIcon1.src.replace("Full", "Saver")
    } else bIcon1.src = bIcon2.src = bIcon1.src.replace("Saver", "Full")
}

// for Action Center
let acButton = document.querySelector(".action-center-button")
/*acButton.onclick = (e) => {
    document.querySelector(".action-center").style.setProperty("transform","translateY(0)");
}*/
let bSlider = document.querySelector(".brightness input");
bSlider.oninput = () => {
    var x = bSlider.valueAsNumber;
    silderBackground(bSlider, x);
    x = x < 20 ? 80 : 100 - x;
    document.querySelector(".brightness-overlay").style.background = `rgb(0 0 0 / ${x}%)`
}
let vSlider = document.querySelector(".volume input");
vSlider.oninput = () => {
    silderBackground(vSlider, vSlider.value)
}
function silderBackground(elem, x) {
    elem.style.setProperty("--track-color", `linear-gradient(90deg, #005fba ${x}%, #888888 ${x}%)`)
}
document.getElementById('acCheck').onclick = _ => {
    if (document.getElementById('acCheck').checked) {
        document.querySelector(".action-center").style.setProperty("transform", "translateY(660px)");
    }
    else if (document.getElementById('acCheck').checked == false) {
        document.querySelector(".action-center").style.setProperty("transform", "translateY(0)");
    }
}

// for Battery /* *Use extra when needed* */
(function () {
    let /*batterySupported = document.getElementById("battery-supported"),*/
        batteryLevel = document.querySelector("body > div.action-center > div.ac-bottom > div.battery > span");
    /*chargingStatus = document.getElementById("charging-status"),
    batteryCharged = document.getElementById("battery-charged"),
    batteryDischarged = document.getElementById("battery-discharged");*/

    let success = function (battery) {
        if (battery) {
            function setStatus() {
                console.log("Set status");
                batteryLevel.innerHTML = Math.round(battery.level * 100) + "%";
                // use these when notification is ready
                /*chargingStatus.innerHTML = (battery.charging)? "" : "not ";
                batteryCharged.innerHTML = (battery.chargingTime == "Infinity")? "Infinity" : parseInt(battery.chargingTime / 60, 10);
                batteryDischarged.innerHTML = (battery.dischargingTime == "Infinity")? "Infinity" : parseInt(battery.dischargingTime / 60, 10);*/
            }

            // Set initial status
            setStatus();

            // Set events
            battery.addEventListener("levelchange", setStatus, false);
            /*battery.addEventListener("chargingchange", setStatus, false);
            battery.addEventListener("chargingtimechange", setStatus, false);
            battery.addEventListener("dischargingtimechange", setStatus, false);*/
        } else {
            throw new Error('Battery API not supported on your device/computer');
        }
    };

    let noGood = function (error) {
        console.log(error.message)
    };

    navigator.getBattery() //returns a promise
        .then(success)
        .catch(noGood);
})();
