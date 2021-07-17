// accessing required elements
let powerOnBox = document.querySelector(".powerOnBox");
let powerOnBtn = document.getElementById("powerOnBtn");
// turning off the boot process for development purpose
function skipBoot() {
    powerOnBox.style.display = "none";
    document.querySelector(".desktop").style.display = "block";
    document.querySelector(".taskbar").style.display = "grid";
    document.querySelector(".start").style.display = "block";
    document.body.style.background = "#fff url(src/wallpaper/light.jpg) center center/cover no-repeat";
}
// skipBoot();
if (window.location.hash == "#dev") {
    skipBoot()
}
else {
    powerOnBtn.addEventListener("click", event => {
        fullScreen();
        boot();
    })
}

function boot() {
    // Boot the os after the power button has been clicked
    powerOnBox.style.display = "none";
    document.querySelector(".boot").style.display = "flex";
    // display .boot box for 3 seconds and play the video of starting windows
    setTimeout(() => {
        document.querySelector(".boot").style.display = "none";
        // play the video
        document.querySelector(".boot-animation").style.display = "flex";
        document.getElementById("startupVideo").play();
        // remove the video div after the video has been played
        document.getElementById("startupVideo").addEventListener("ended", event => {
            document.querySelector(".boot-animation").style.display = "none";
        })

        // Ask user for password
        lockScreen.style.display = "flex";
        passwordPhase();
        // now display the desktop
        document.querySelector(".desktop").style.display = "block";
        document.querySelector(".taskbar").style.display = "grid";
        document.querySelector(".start").style.display = "block";
        document.body.style.background = "#fff url(src/wallpaper/light.jpg) center center/cover no-repeat";
    }, 3000)
}
// making  the date and time in the  lock Screen dynamic
let days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    getDayName(dayNumber) {
        return this[dayNumber];
    }
}
setInterval(() => {
    let date = new Date();
    let hours = date.getHours();
    let minute = date.getMinutes();
    let timeString = hours + ":" + minute;
    document.querySelector(".time").innerText = timeString;
    // making dynamic date
    let dayName = days.getDayName(date.getDay());
    let month = date.toLocaleString('en-us', { month: 'long' }); /* June */
    let year = date.getFullYear();
    let dateString = dayName + ", " + month + ", " + year;
    document.querySelector(".date").innerText = dateString;
}, 1000);

// if the user clicks or press any key on the keyboard the lock screen should disappear and passwordSceen should appear
function passwordPhase() {
    let lockScreen = document.getElementById("lockScreen");
    let timeBox = document.getElementById("timeBox");
    let passwordDialog = document.querySelector(".passwordDialog");
    let passwordField = document.getElementById("passwordField");
    lockScreen.addEventListener("click", askPassword);
    lockScreen.addEventListener("keypess", askPassword);

    function askPassword() {
        console.log("asking for password");
        // move the time div and blur the box
        timeBox.style.transition = "0.3s";
        lockScreen.style.transition = "1s";
        timeBox.style.transform = "translateY(-700px)";
        lockScreen.style.filter = "blur(8px)";
        passwordDialog.style.display = "flex";
        passwordField.focus()
            // check if user enters correct password
        passwordField.addEventListener("keyup", event => {
            if (passwordField.value == "12345") {
                console.log("login was successful");
                passwordDialog.style.display = "none";
                lockScreen.style.display = "none";
                // alert("apply a loader here..if you like..");
            }
        })
        passwordField.addEventListener("keypress", event => {
            if (event.key == "Enter") {
                if (passwordField.value != "12345") {
                    console.log("login was not successful");
                    alert("Incorrect password");
                    // style this.....
                }
            }
        })

    }
}
// function to fullscreen the document
function fullScreen() {
    let elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}
