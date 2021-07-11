let runDialog = document.querySelector(".runDialog");
let runInputField = document.getElementById("runInputField");
// making the run dialog appear on pressing window + r
document.body.addEventListener("keydown", event => {
    function shortCutWithKeyboard(key) {
        if (Keyboard.activeKey.includes("Win") && (event.key == "r" || event.key == "R")) {
            return true;
        } else {
            return false;
        }
    }
    let fallBack = shortCutWithKeyboard("r"); // this for handling run shortcut key for windows
    if (event.metaKey && (event.key == "r" || event.key == "R") || fallBack) {
        runDialog.style.display = "block";
        runInputField.focus();
        runInputField.value = null;
    }
})
runInputField.addEventListener("keyup", event => {
    if (searchPrograms(runInputField.value)) {
        document.getElementById("runOkBtn").classList.remove("disabledButton")
    } else {
        document.getElementById("runOkBtn").classList.add("disabledButton")
    }
    // execute the program if user press the enter button
    if (event.key == "Enter") {
        if (searchPrograms(runInputField.value)) {
            executeProgram(searchPrograms(runInputField.value));
            runDialog.style.display = "none";
        } else {
            alert("no program exist");
        }
    }
    // if escape is pressed remove the window
    if (event.key == "Escape") {
        runDialog.style.display = "none";
    }

});

let allPrograms = ["winver", "powershell", "terminal"];

function searchPrograms(givenProgram) {
    if (allPrograms.includes(givenProgram)) {
        return givenProgram;
    } else {
        return false;
    }
}

function executeProgram(programName) {
    let win1 = new Window(programName, "black", "white", "src/icons/runicon.png");
    win1.createWindow();

}
let windowCrossers = document.getElementsByClassName("windowCrosser");
Array.from(windowCrossers).forEach(item => {
    item.addEventListener("click", event => {
        let windows = event.target.parentNode.parentNode.parentNode;
        console.log(windows);
        if (windows.classList.contains("window")) {
            windows.style.display = "none";
        } else {
            console.log("use class 'windows' in your window and it will be closed");
        }
    })
})