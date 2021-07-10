let keyboard = document.getElementById("keyboard");
let keyboardHider = document.getElementById("keyboardHider");
let keyboardOpener = document.getElementById("keyboardOpener");
let keys = document.getElementsByClassName("keys");
// Keyboard object
let Keyboard = {
    activeKey: []
}
keyboardOpener.addEventListener("click", event => {
    keyboard.style.transform = "translateX(0px)";
})
keyboardHider.addEventListener("click", event => {
    keyboard.style.transform = "translateX(62px)";
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