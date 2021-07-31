let nCenter = document.querySelector('.notifications');
let nId = 1;

var notificationSound = new Audio('src/sounds/Windows Notify System Generic.mp3');
notificationSound.autoplay = true

function notify(iconSrc, appName, heading, content, button1, btn1Function, button2, btn2Function) {
    nCenter.innerHTML += `
        <div class="notification" id="n${nId.toString()}">
            <div class="notification-top">
                <img src=${iconSrc} width="20" height="20">
                <span>${appName}</span>
                <img src="src/icons/cross.svg" width="15" height="15" onclick="notificationClose('#n${nId.toString()}')">
            </div>
            <div class="content">
                <span>${heading}</span>
                <p>${content}</p>
            </div>
        </div>`;
    if (button1 != undefined) {
        document.querySelector(`#n${nId.toString()}>.content`).innerHTML += `
            <div class="notification-buttons" ${button2 === undefined ? "style=justify-content:flex-start;" : ""}>
                <button onclick=${btn1Function}>${button1}</button>
            </div>`;
        if (button2 != undefined) {
            document.querySelector(`#n${nId.toString()}>.notification-buttons`).innerHTML += `<button onclick=${btn2Function}>${button2}</button>`;
        }
    }
    document.getElementById('n' + nId).style.setProperty("transform", "translateX(0)");
    notificationSound.play()
    nId++;
}

function notificationClose(id) {
    var nElem = document.querySelector(id);
    nElem.style.setProperty("transform", "translateX(100%)");
    setTimeout(() => {
        nElem.remove();
    }, 400);
}
