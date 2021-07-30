let nCenter = document.querySelector('.notifications');

function notify(iconSrc, appName, heading, content) {
    nCenter.innerHTML += `<div class="notification">
                            <div class="notification-top">
                                <img src=${iconSrc} width="20" height="20">
                                <span>${appName}</span>
                                <img src="src/icons/cross.svg" width="15" height="15">
                            </div>
                            <div class="content">
                                <span>${heading}</span>
                                <p>${content}</p>
                            </div>
                        </div>`
}