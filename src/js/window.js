// window class
class Window {
    constructor(title, titleColor = "#000", titleBgColor = "#fff", icon, body, btns = ['min', 'max', 'cross']) {
        this.title = title;
        this.titleColor;
        this.titleBgColor = titleBgColor;
        this.icon = icon;
        this.btns = btns;
        this.body = body;
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
            // creating window options i.e min,max,cross
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
                //  creating window body
            let windowBody = document.createElement("div");
            windowBody.classList.add("windowBody");
            let iframe = document.createElement("iframe");
            iframe.src = this.body;
            let frame = iframe;

            // Adjusting the iframe height onload event
            frame.onload = function()
                // function execute while load the iframe
                {
                    // set the height of the iframe as 
                    // the height of the iframe content
                    // console.clear();
                    console.log(frame.contentWindow.document.querySelector(".container"));

                    frame.style.height =
                        // frame.contentWindow.document.body.scrollHeight + 'px';
                        frame.contentWindow.document.querySelector(".container").getBoundingClientRect().height + "px";


                    // set the width of the iframe as the 
                    // width of the iframe content
                    console.log(frame.contentWindow.document.querySelector(".container").getBoundingClientRect());
                    frame.style.width =
                        // frame.contentWindow.document.body.scrollWidth + 'px';
                        frame.contentWindow.document.querySelector(".container").getBoundingClientRect().width + "px";
                    // Hiding the window on clicking on ok button inside the iframe
                    if (frame.contentWindow.document.title == "winver") {
                        frame.contentWindow.document.querySelector(".ok").addEventListener("click", event => {
                            document.body.removeChild(window);
                            Taskbar.removeItem(window);
                        })
                    }

                }
            windowBody.appendChild(iframe);
            window.appendChild(windowBody);
            document.body.appendChild(window);
            // Placing the newly opened window in the center
            window.style.left = "20%"; //precise for other apps too
            window.style.top = "10%";

            // finally create the window
            // this.createWindow();
            this.makeDraggable(window);
            // this.appendWindowToTaskBar(window);
            Taskbar.addItem(this.title, this.icon, window);

        }
        // making window draggable
    makeDraggable(item) {
        let el = item;
        console.log(el);
        el.querySelector(".windowTitleBar").addEventListener("mousedown", mousedown)

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

                const normalization = (x, y, elem, container) => {
                    if (x <= 0) x = 0;
                    if (x >= container.offsetWidth-elem.offsetWidth/2) x = container.offsetWidth-elem.offsetWidth/2;
                    if (y <= 0) y = 0;
                    if (y >= container.offsetHeight-elem.offsetHeight/2) y = container.offsetHeight-elem.offsetHeight/2;
                    return {x,y};
                };
                
                var normalized = normalization(rect.left-newX, rect.top-newY, el, desktop)
                el.style.left = `${normalized.x}px`;
                el.style.top = `${normalized.y}px`;
                prevX = e.clientX;
                prevY = e.clientY;
            }

            function mouseup(e) {
                window.removeEventListener("mousemove", mousemove);
                window.removeEventListener("mouseup", mouseup)
            }
        }
    }
    makeCrosserAlive(windowCrosser) {
        windowCrosser.addEventListener("click", event => {
            let windows = event.target.parentNode.parentNode.parentNode;
            if (windows.classList.contains("window")) {
                // windows.style.display = "none";
                document.body.removeChild(windows);
                // this.removeWindowFromTaskBar(windows);
                Taskbar.removeItem(windows);
                return;
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
                windows.classList.add("minimized");
            }, 200)
        })

    }
}
// let win1 = new Window("winver", "black", "white", "src/icons/runicon.png");
// win1.createWindow();