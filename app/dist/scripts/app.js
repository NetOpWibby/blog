"use strict"; /* global document, DocumentTouch, horwheel, location, window */



const isTouchDevice = (("ontouchstart" in window) || window.DocumentTouch && document instanceof DocumentTouch);
let horizontalScrollEnabler = document.querySelector("body").dataset.scroll;

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
  let wrapper;

  switch(true) {
    case horizontalScrollEnabler === "no":
    case isTouchDevice:
      horizontalScrollEnabler = "no";
      return;

    default:
      wrapper = document.querySelector("#wrapper");
      horwheel(wrapper); // eslint-disable-line padding-line-between-statements
      return;
  }

  // add event listener `resize` > enableScrollChecker();
  // console.log("sdgf");
  // if (window.innerWidth >= 1001)
  //   horwheel(wrapper);
  // else
  //   ("#wrapper").replaceWith(("#wrapper").clone());

  // else wrapper.removeEventListener("wheel", horwheel, false)
}
