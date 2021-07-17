let normalizePosition = (mouseX, mouseY, parent, children) => {
    // ? compute what is the mouse position relative to the container element (scope)
    var {
        left: scopeOffsetX,
        top: scopeOffsetY,
    } = parent.getBoundingClientRect();

    scopeOffsetX = scopeOffsetX < 0 ? 0 : scopeOffsetX;
    scopeOffsetY = scopeOffsetY < 0 ? 0 : scopeOffsetY;

    var scopeX = mouseX - scopeOffsetX;
    var scopeY = mouseY - scopeOffsetY;

    // ? check if the element will go out of bounds
    var outOfBoundsOnX =
        scopeX + children.clientWidth > parent.clientWidth;

    var outOfBoundsOnY =
        scopeY + children.clientHeight > parent.clientHeight;

    var normalizedX = mouseX;
    var normalizedY = mouseY;

    // ? normalize on X
    if (outOfBoundsOnX) {
        normalizedX =
            scopeOffsetX + parent.clientWidth - children.clientWidth;
    }

    // ? normalize on Y
    if (outOfBoundsOnY) {
        normalizedY =
            scopeOffsetY + parent.clientHeight - children.clientHeight;
    }

    return { normalizedX, normalizedY };
};
var desktop = document.querySelector(".desktop");
var menu = document.getElementById("context-menu");
desktop.addEventListener("contextmenu", (event) => {
    document.body.click();

    var { clientX: mouseX, clientY: mouseY } = event;

    var { normalizedX, normalizedY } = normalizePosition(mouseX, mouseY, desktop, menu);

    menu.classList.remove("visible");

    menu.style.top = `${normalizedY}px`;
    menu.style.left = `${normalizedX}px`;

    setTimeout(() => {
        menu.classList.add("visible");
    });
});

document.body.addEventListener("click", (e) => {
    // ? close the menu if the user clicks outside of it
    //if (e.target.offsetParent != contextMenu) {
    menu.classList.remove("visible");
    //s}
});
window.oncontextmenu = (e) => {
    e.preventDefault();
}