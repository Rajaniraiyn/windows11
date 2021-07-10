// window class
class Window {
    constructor(title, titleColor = "#000", titleBgColor = "#fff", icon, btns = ['min', 'max', 'cross']) {
        this.title = title;
        this.titleColor;
        this.titleBgColor = titleBgColor;
        this.icon = icon;
        this.btns = btns;
    }
    createWindow() {
            // creating main window
            let window = document.createElement("div");
            // window.innerText = "hi there!";
            window.classList.add("window");
            // Creating window title bar
            let windowTitleBar = document.createElement("div");
            windowTitleBar.classList.add("windowTitleBar");
            // Creating window icon
            let windowIcon = document.createElement("img");
            windowIcon.src = this.icon;
            windowIcon.alt = this.title + "window";
            windowIcon.classList.add("smallTitleIcon");
            // appending window icon on window title bar
            windowTitleBar.appendChild(windowIcon);
            // creating window title name
            let windowName = document.createElement("span");
            windowName.innerText = this.title;
            windowName.classList.add("windowTitle");
            // appending window name in window title bar
            windowTitleBar.appendChild(windowName);
            // creating window optiosn i.e min,max,cross
            // creating a optionsWrapper 
            let optionsWrapper = document.createElement("div");
            optionsWrapper.classList.add("optionsWrapper");
            // minimizer
            if (this.btns.includes("min")) {
                let minimizer = document.createElement("img");
                minimizer.src = "src/icons/minimize.svg";
                minimizer.alt = "minimize" + this.title;
                minimizer.classList.add("windowOptions", "windowMinimizer");
                optionsWrapper.appendChild(minimizer);
                this.makeMinimizerAlive(minimizer);

            }
            // maximizer 
            if (this.btns.includes("max")) {
                let maximizer = document.createElement("img");
                maximizer.src = "src/icons/maximize.svg";
                maximizer.alt = "maximize" + this.title;
                maximizer.classList.add("windowOptions", "windowMaximizer");
                optionsWrapper.appendChild(maximizer);
                this.makeMaximizerAlive(maximizer);

            }

            // crosser
            if (this.btns.includes("cross")) {
                let cross = document.createElement("img");
                cross.src = "src/icons/cross.svg";
                cross.alt = "Close" + this.title;
                cross.classList.add("windowOptions", "windowCrosser");
                optionsWrapper.appendChild(cross);
                this.makeCrosserAlive(cross);

            }

            window.appendChild(windowTitleBar);


            // appending options wrapper in window title bar
            windowTitleBar.appendChild(optionsWrapper)
            document.body.appendChild(window);
            // finally create the window
            // this.createWindow();
            this.makeDraggable(window);
            this.appendWindowToTaskBar();
        }
        // making window draggable
    makeDraggable(item) {
        let el = item;
        console.log(el);
        el.addEventListener("mousedown", mousedown)

        function mousedown(e) {
            // console.log("mouse down")
            window.addEventListener("mousemove", mousemove);
            window.addEventListener("mouseup", mouseup)
            let prevX = e.clientX;
            let prevY = e.clientY;

            function mousemove(e) {
                // console.log("move")
                let newX = prevX - e.clientX;
                let newY = prevY - e.clientY;
                const rect = el.getBoundingClientRect();
                el.style.left = rect.left - newX + "px";
                el.style.top = rect.top - newY + "px";
                prevX = e.clientX;
                prevY = e.clientY;
            }

            function mouseup(e) {
                window.removeEventListener("mousemove", mousemove);
                window.removeEventListener("mouseup", mouseup)
            }
        }
    }
    makeCrosserAlive(windowCrooser) {
        windowCrooser.addEventListener("click", event => {
            let windows = event.target.parentNode.parentNode.parentNode;
            console.log(windows);
            if (windows.classList.contains("window")) {
                // windows.style.display = "none";
                document.body.removeChild(windows);
                this.removeWindowFromTaskBar(windows);
            } else {
                console.log("use class 'windows' in your window and it will be closed");
            }
        })
    }
    makeMaximizerAlive(maximizer) {
        maximizer.addEventListener("click", event => {
            let windows = event.target.parentNode.parentNode.parentNode;
            // let initialDimensions =
            if (windows.classList.contains("window")) {
                let dimensions = document.querySelector(".desktop").getBoundingClientRect();
                console.log(dimensions)
                windows.style.top = dimensions.y;
                windows.style.left = dimensions.x;
                windows.style.width = dimensions.width + "px";
                windows.style.height = dimensions.height + "px";

            } else {
                console.log("use class 'windows' in your window and it will be closed");
            }
        })
    }
    makeMinimizerAlive(minimizer) {
        minimizer.addEventListener("click", event => {
            let windows = event.target.parentNode.parentNode.parentNode;
            setTimeout(() => {
                windows.style.display = "none";
            }, 200)
        })

    }
    appendWindowToTaskBar() {
        let img = document.createElement("img");
        img.src = this.icon;
        img.alt = "Windows 11" + this.title + "icon";
        // check if the window window already exists and assign a new id if the window already exists
        img.id = this.title;

        Taskbar.centerBox.appendChild(img);
    }
    removeWindowFromTaskBar(windows) {
        let windowToRemove = windows.children[0].children[1].innerText;
        Array.from(Taskbar.allIcons).some(item => { // not using foreach because we can't exit out of foreach loop
            if (item.id == windowToRemove) {
                Taskbar.centerBox.removeChild(item);
                return true;
            }
        })

    }
}
// let win1 = new Window("winver", "black", "white", "src/icons/runicon.png");
// win1.createWindow();