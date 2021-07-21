let taskBarCenterBox = document.querySelector(".center");
let allTaskBarIcons = taskBarCenterBox.children;

let Taskbar = {
    centerBox: document.querySelector(".center"),
    get allIcons() {
        return this.centerBox.children;
    },
    addItem(clAss, icon, window) {
        console.log(clAss);
        // find how many elements are there in dom with class clAss
        let iconCount = document.getElementsByClassName(clAss).length + 1;
        let idName = clAss + iconCount;
        let item = document.createElement("img");
        item.id = idName;
        window.dataset.id = idName; // doing this to get the corresponding minimized window from taskbar..
        item.src = icon.includes("edge") ? "" : icon;
        // item.classList.add(clAss); //  commenting this to handle the bug of not being able to create window with space in it's title
        this.centerBox.appendChild(item);
        this.openedIcons.push(item);
        this.maximize(item);
        this.openedWindows.push(window);
    },
    removeItem(windowToRemove) {
        console.log(windowToRemove);
        let taskBarIconId = windowToRemove.dataset.id;
        let taskBarIconToRemove = document.getElementById(taskBarIconId);
        console.log(taskBarIconToRemove);
        this.centerBox.removeChild(taskBarIconToRemove);
    },
    // method to display the hidden window

    maximize(item) {
        item.addEventListener("click", event => {
            let targetId = event.target.id;
            // now get the window with corresponding dataset value
            let windows = document.getElementsByClassName("window");
            Array.from(windows).some(item => {
                if (item.dataset.id == targetId) {
                    item.classList.remove("minimized");
                    return true;
                } else {
                    return false;
                }
            })
        })
    },
    pinnedTaskBarIcons: null,
    openedIcons: [],
    openedWindows: []
}

// Adding event listeners to taskbar icons
// Don't add event listeners instead use executeProgram() to do so