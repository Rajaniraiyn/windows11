var load = function (url) {
    var t = url.split(".");
    switch (t[t.length - 1]) {
        case "js":
            var s = document.createElement("script");
            s.src = url;
            document.head.appendChild(s);
            break;
        case "css":
            var s = document.createElement("link");
            s.rel = "stylesheet";
            s.type = "text/css";
            s.href = url;
            document.head.appendChild(s);
            break;

        default:
            break;
    }
};

var tutorialResources = [
    "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/kineticjs/5.2.0/kinetic.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/enjoyhint/4.0.1/enjoyhint.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/enjoyhint/4.0.1/enjoyhint.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/jquery-scrollTo/2.1.3/jquery.scrollTo.min.js"
]

var i = 0, resourceReady = false
function startTutorials() {
    var interval = setInterval(() => {
        if (i < tutorialResources.length) {
            load(tutorialResources[i]);
            i++
        }
        else {
            notify("src/icons/settings.svg", "Settings", "Windows 11 Tutorial", "A simple Guide to help you to use Windows 11", "Start Tutorial", `initialTutorial();notificationClose("#n${nId}")`)
            resourceReady = true
            clearInterval(interval);
        }
    }, 2e3);
}

function initialTutorial() {
    if (resourceReady) {
        var initialTutorial = new EnjoyHint({});

        var initialSteps = [
            {
                "next #starticon": "This is start button to open Start Menu",
                "showSkip": false
            },
            {
                "next .action-center-button": "This is to open Action Center",
                "showSkip": false
            },
            {
                "next .desktop": "Right click on desktop for Context Menu",
                "showSkip": false
            },
            {
                "next #keyboardOpener": "Click this to access keyboard. Helpful to simulate holding \"Win\" key",
                "showNext": false,
                "skipButton": { text: "Finish" }
            }
        ];

        initialTutorial.set(initialSteps);
        initialTutorial.run()
    }
}

let acTNotCompleted = keyNotCompleted = true;

document.querySelector('.action-center-button').onclick = _ => {
    acCheck.click();
    if (resourceReady && acTNotCompleted) {
        var acTutorial = new EnjoyHint({});

        var acSteps = [
            {
                "next .action-center": "This is your ActionCenter",
                "timeout": 500
            },
            {
                "next .brightness": "you can adjust brightness here",
                "showNext": false,
                "skipButton": { text: "Finish" }
            }
        ];

        acTutorial.set(acSteps);
        acTutorial.run();

        acTNotCompleted = false;
    }
}

document.querySelector('#keyboardOpener').onclick = _ => {
    if (resourceReady && keyNotCompleted) {
        var keyTutorial = new EnjoyHint({});

        var keySteps = [
            {
                "click #winkey": "Click this to simulate holding \"Win\" key",
                "timeout": 600,
                "showSkip": false
            },
            {
                "click #keyboardHider": "click this to hide keyboard",
                "showSkip": false
            },
            {
                "key .desktop": "press \"R\" to open run",
                "keyCode": 82,
                "showSkip": false
            },
            {
                "next .runDialog.window": "This is your Run window. you can use this to open some apps like \"winver\"",
                "timeout": 500,
                "showNext": false,
                "skipButton": { text: "Finish" }
            }
        ];

        keyTutorial.set(keySteps);
        keyTutorial.run();

        keyNotCompleted = false;
    }
}