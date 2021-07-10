let taskBarCenterBox = document.querySelector(".center");
let allTaskBarIcons = taskBarCenterBox.children;

let Taskbar = {
    centerBox: document.querySelector(".center"),
    get allIcons() {
        return this.centerBox.children;
    },
    pinnedTaskBarIcons: null,
    opnedTaskBarIcons: []
}
console.log(Taskbar);