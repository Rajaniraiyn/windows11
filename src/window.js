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
        // crosser
        let cross = document.createElement("img");
        cross.src = "src/icons/cross.svg";
        cross.alt = "Close" + this.title;
        cross.classList.add("windowOptions", "windowCrosser");
        // maximizer 
        let maximizer = document.createElement("img");
        maximizer.src = "src/icons/maximize.svg";
        maximizer.alt = "maximize" + this.title;
        maximizer.classList.add("windowOptions", "windowMaximizer");
        // minimizer
        let minimizer = document.createElement("img");
        minimizer.src = "src/icons/minimize.svg";
        minimizer.alt = "minimize" + this.title;
        minimizer.classList.add("windowOptions", "windowMinimizer");
        window.appendChild(windowTitleBar);
        // creating a optionsWrapper 
        let optionsWrapper = document.createElement("div");
        optionsWrapper.classList.add("optionsWrapper");
        // appending options in options wrapper
        optionsWrapper.appendChild(minimizer);
        optionsWrapper.appendChild(maximizer);
        optionsWrapper.appendChild(cross);
        // appending options wrapper in window title bar
        windowTitleBar.appendChild(optionsWrapper)
        document.body.appendChild(window);
        // finally create the window
        // this.createWindow();
        this.makeDraggable(window);
    }
    makeDraggable(item) {
            console.log(item);
            this.dragElement(item);
        }
        // making window draggable
    dragElement(elmnt) {
        var pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            // if present, the header is where you move the DIV from:
            document.getElementById(elmnt.id + "header").onmousedown = this.dragMouseDown;
        } else {
            // otherwise, move the DIV from anywhere inside the DIV:
            elmnt.onmousedown = this.dragMouseDown;
        }
    }
    dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;
        document.onmouseup = this.closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = this.elementDrag;
    }
    elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
    closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
// let win1 = new Window("winver", "black", "white", "src/icons/runicon.png");
// win1.createWindow();