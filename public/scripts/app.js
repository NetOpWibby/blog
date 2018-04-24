/* jshint undef: true, unused: true, esversion: 6, -W097 */
/* global $, location, navigator, window, document, setTimeout */



"use strict";



//
//  U G H

let isSafari = navigator.vendor && navigator.vendor.indexOf("Apple") > -1 && navigator.userAgent && !navigator.userAgent.match("CriOS");

if (isSafari) {
  $(".no-safari").hide();
}



//
//  S C R O L L
//  F U N

$(window).on("scroll", function () {
  if (window.innerWidth < 1500) {
    if (window.pageYOffset >= 125) {
      $(".header").addClass("scrolled");
    } else {
      $(".header").removeClass("scrolled");
    }
  } else {
    if (window.pageYOffset >= 50) {
      $(".header").addClass("scrolled");
    } else {
      $(".header").removeClass("scrolled");
    }
  }

  if (window.pageYOffset >= 350) {
    $(".__top").addClass("active");
  } else {
    $(".__top").removeClass("active");
  }
});



//
//  S C R O L L
//  T O   T O P

function scrollTo(element, to, duration) {
  let
    start = element.scrollTop,
    change = to - start,
    currentTime = 0,
    increment = 20;

  const animateScroll = function () {
    currentTime += increment;
    const val = Math.easeInOutQuad(currentTime, start, change, duration);
    element.scrollTop = val;

    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };

  animateScroll();
}

Math.easeInOutQuad = function (currentTime, startValue, changeInValue, duration) {
  currentTime /= duration / 2;

  if (currentTime < 1) {
    return changeInValue / 2 * currentTime * currentTime + startValue;
  }

  currentTime--;

  return -changeInValue / 2 * (currentTime * (currentTime - 2) - 1) + startValue;
};



//
//  O N   L O A D
//  F U N C T I O N S

$(function () {

  // Automatically open external links in new tabs
  $("a[href^=http]").each(function () {
    if (this.href.indexOf(location.hostname) == -1) {
      $(this).attr("target", "_blank");
    }
  });

  // Scroll to top cta
  $(".__top").on("click", function (e) {
    e.preventDefault();

    if (isSafari) {
      scrollTo(document.body, 0, 1250);
    } else {
      scrollTo(document.documentElement, 0, 1250);
    }
  });

});
