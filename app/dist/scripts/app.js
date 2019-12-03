"use strict"; /* global document, DocumentTouch, horwheel, location, window */



//  U T I L S

const horizontalScrollEnabler = document.querySelector("body").dataset.scroll;
const isTouchDevice = ("ontouchstart" in document.documentElement || window.DocumentTouch && document instanceof DocumentTouch);
// const wrapper = document.getElementById("wrapper"); // We'd usually use a variable but we need a fresh instance
let isScrollingPermitted = JSON.parse(localStorage.getItem("webb-scrolling"));



//  P R O G R A M

document.querySelectorAll("a[href^=http]").forEach(anchor => {
  // Automatically open external links in new tabs
  if (anchor.href.indexOf(location.hostname) === -1) {
    anchor.rel = "noopener noreferrer";
    anchor.target = "_blank";
  }
});

window.onload = function() {
  // Horizontal scrolling, the scourge of Hacker News
  if (!isScrollingPermitted)
    disableHorizontalScrolling();
  else
    enableHorizontalScrolling();

  document.getElementById("toggle").onclick = function() {
    toggleHorizontalScrolling();
  }
}



//  H E L P E R S

function disableHorizontalScrolling() {
  localStorage.setItem("webb-scrolling", false);
  isScrollingPermitted = JSON.parse(localStorage.getItem("webb-scrolling"));

  document.querySelector("body").dataset.scroll = "no";
  document.getElementById("toggle").innerText = "Enable ↔ scrolling";

  // via https://stackoverflow.com/questions/4386300/javascript-dom-how-to-remove-all-events-of-a-dom-object#comment92511918_39026635
  document.getElementById("wrapper").outerHTML = document.getElementById("wrapper").outerHTML;
}

function enableHorizontalScrolling() {
  localStorage.setItem("webb-scrolling", true);
  isScrollingPermitted = JSON.parse(localStorage.getItem("webb-scrolling"));

  document.querySelector("body").dataset.scroll = "yes";
  document.getElementById("toggle").innerText = "Disable ↔ scrolling";

  if (document.querySelector("post > *:last-child"))
    document.querySelector("post > *:last-child").classList.add("last-element");

  horwheel(document.getElementById("wrapper"));
}

function toggleHorizontalScrolling() {
  if (isScrollingPermitted)
    disableHorizontalScrolling();
  else
    enableHorizontalScrolling();
}



// The next iteration of my blog will be built with Svelte/Sapper
// so some of this hackery will be smoothed out. Or, I'll come up
// with another interesting design that has regular scrolling. 🕸
