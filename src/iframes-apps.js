$(function () {
  $(".resizable").draggable();
  $(".resizable").resizable({
    handles: "n,s,w,e",
  });
});

function OCBROWSER() {
  var BROWSER = document.getElementById("browser");

  if (BROWSER.style.display === "none") {
    BROWSER.style.display = "block";
  } else {
    BROWSER.style.display = "none";
  }
}
