//getting cookies
function getCookie(name) {
    let result = document.cookie.match("(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)")
    return result ? result.pop() : ""
}
const firstBoot = getCookie("firstBoot") == 1 ? true : false;

// accessing required elements
let powerOnBox = document.querySelector(".powerOnBox");
let powerOnBtn = document.getElementById("powerOnBtn");
// turning off the boot process for development purpose
function skipBoot() {
    powerOnBox.remove();
    document.querySelector(".desktop").style.display = "block";
    document.querySelector(".taskbar").style.display = "grid";
    document.querySelector(".start").style.display = "block";
    document.body.style.background = "#fff url(src/wallpaper/img18.webp) center center/cover no-repeat";
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
    powerOnBox.remove();
    document.querySelector(".boot").style.display = "flex";
    // display .boot box for 3 seconds and play the video of starting windows
    setTimeout(() => {
        document.querySelector(".boot").remove();
        // play the video
        document.querySelector(".boot-animation").style.display = "flex";
        document.getElementById("startupAudio").play();
        // remove the video div after the video has been played
        document.getElementById("startupAudio").addEventListener("ended", event => {
            document.querySelector(".boot-animation").remove()
        })

        // Ask user for password
        lockScreen.style.display = "flex";
        passwordPhase();
        // now display the desktop
        document.querySelector(".desktop").style.display = "block";
        document.querySelector(".taskbar").style.display = "grid";
        document.querySelector(".start").style.display = "block";
        document.body.style.background = "#fff url(src/wallpaper/img18.webp) center center/cover no-repeat";
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
var timer = setInterval(() => {
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

// if the user clicks or press any key on the keyboard the lock screen should disappear and passwordScreen should appear
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
                passwordDialog.remove();
                clearInterval(timer)
                lockScreen.remove();
                if (firstBoot) {
                    setTimeout(notify, 1e3, "src/icons/settings.svg", "Settings", "Welcome to Windows 11!", "Congratulations You have successfully Booted Windows 11")
                    setTimeout(_ => {
                        // notifies firefox uses to enable backdrop-filter flag
                        if (window.navigator.userAgent.indexOf("Firefox") > -1) {
                            if (CSS.supports("(backdrop-filter:blur(20px))") != true) {
                                notify("src/icons/settings.svg", "Settings", "Hello Firefox User", "To get full UI experience please go to \"<span style=user-select:all>about:config</span>\" and search for \"layout.css.backdrop-filter.enabled\" and set it to \"true\"")
                            }
                        }
                    }, 2e3)
                    setTimeout(notify, 10e3, "src/icons/edge.svg", "Microsoft Edge", "All new Browser is here", "Your Edge browser got updated for Windows 11 \n Please try it out.")
                    startTutorials();
                }
                if (getCookie("cookiesAccepted") == "") {
                    notify("src/icons/settings.svg", "Settings", "Windows 11 uses Cookies", "To improve user experience this Windows 11 uses cookies", "Accept", `document.cookie='cookiesAccepted=1;expires='+new Date(2147483647*1000).toUTCString();notificationClose("#n${nId}")`);
                }
                document.cookie = 'firstBoot=0; expires=' + new Date(2147483647 * 1000).toUTCString();
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
