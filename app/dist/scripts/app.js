"use strict"; /* global document, DocumentTouch, horwheel, location, window */



enableScrollChecker();

// Automatically open external links in new tabs
document.querySelectorAll("a[href^=http]").forEach(anchor => {
  if (anchor.href.indexOf(location.hostname) === -1) {
    anchor.rel = "noopener noreferrer";
    anchor.target = "_blank";
  }
});

// Initialize horizontal scrolling
function enableScrollChecker() {
  const horizontalScrollEnabler = document.querySelector("body").dataset.scroll;
  const wrapper = document.querySelector("#wrapper");

  const isTouchDevice = (
    "ontouchstart" in document.documentElement ||
    window.DocumentTouch && document instanceof DocumentTouch
  );

  switch(true) {
    case horizontalScrollEnabler === "no":
    case isTouchDevice:
      document.querySelector("body").dataset.scroll = "no";
      return;

    default:
      document.querySelector("body").dataset.scroll = "yes";
      document.querySelector("post > *:last-child").classList.add("last-element");
      horwheel(wrapper);
      return;
  }
}
