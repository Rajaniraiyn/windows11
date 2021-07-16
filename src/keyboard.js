let keyboard = document.getElementById("keyboard");
let keyboardHider = document.getElementById("keyboardHider");
let keyboardOpener = document.getElementById("keyboardOpener");
let keys = document.getElementsByClassName("keys");
// Keyboard object
let Keyboard = {
    activeKey: []
}
let keyboardToggle = 0; // toggling keyboard when clicking the keyboard icon on taskbar twice
keyboardOpener.addEventListener("click", event => {
    if (keyboardToggle % 2 == 0) {
        keyboard.style.transform = "translateY(0px)";
    } else {
        keyboard.style.transform = "translateY(120px)";
    }
    keyboardToggle++;
})
keyboardHider.addEventListener("click", event => {
    keyboard.style.transform = "translateY(120px)";
})

Array.from(keys).forEach(item => {
    item.addEventListener("click", event => {
        if (item.classList.contains("activeKey")) {
            let index = Keyboard.activeKey.indexOf(item.dataset.value);
            if (index != -1) {
                Keyboard.activeKey.splice(index, 1);
            }
            item.classList.remove("activeKey");
        } else {
            Keyboard.activeKey.push(item.dataset.value);
            item.classList.add("activeKey");
        }
    })
})