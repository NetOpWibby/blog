"use strict"; /* global document, horwheel */



let wrapper;

enableScrollChecker();

// $(window).on("resize", function () {
//   enableScrollChecker();
// });

function enableScrollChecker() {
  wrapper = document.querySelector("#wrapper");
  horwheel(wrapper);

  // if (window.innerWidth >= 1001)
  //   horwheel(wrapper);
  // else
  //   ("#wrapper").replaceWith(("#wrapper").clone());

  // else wrapper.removeEventListener("wheel", horwheel, false)
}
