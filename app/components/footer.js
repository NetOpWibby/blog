"use strict";



//  P A C K A G E

import html from "choo/html";



//  E X P O R T

module.exports = exports = (state, emit) => { // eslint-disable-line
  return html`
    <footer class="footer">
      <div class="inner-wrap">
        Copyright &copy;

        <script>
          (function () {
            const x = document.getElementsByTagName("script");
            const y = x[x.length - 1];
            const z = document.createTextNode(" " + (new Date()).getFullYear() + " ");

            y.parentNode.insertBefore(z, y);
          })()
        </script>

        <a href="/" title="This here site! 😄">theWebb.blog</a>. All Rights Reserved.
      </div>
    </footer>

    <a href="#" title="Going up!" class="__top"></a>

    <script>
      const isSafari =
        navigator.vendor &&
        navigator.vendor.indexOf("Apple") > -1 &&
        navigator.userAgent &&
        !navigator.userAgent.match("CriOS");

      if (isSafari) {
        if (document.querySelector(".no-safari"))
          document.getElementsByClassName("no-safari").style.display = "none";
      }

      //

      const links = document.querySelectorAll("a[href]");

      for (const link of links) {
        if (link.href.indexOf(location.hostname) === -1)
          link.target = "_blank";
      }

      //

      document.addEventListener("scroll", scroll => {
        if (window.innerWidth < 1500) {
          switch(true) {
            case (scroll.pageY >= 125 || window.scrollY >= 125):
              document.getElementsByClassName("header")[0].classList.add("scrolled");
              break;

            default:
              document.getElementsByClassName("header")[0].classList.remove("scrolled");
              break;
          }
        }

        switch(true) {
          case (scroll.pageY >= 50 || window.scrollY >= 50):
            document.getElementsByClassName("header")[0].classList.add("scrolled");
            break;

          default:
            document.getElementsByClassName("header")[0].classList.remove("scrolled");
            break;
        }

        switch(true) {
          case (scroll.pageY >= 350 || window.scrollY >= 350):
            document.getElementsByClassName("__top")[0].classList.add("active");
            break;

          default:
            document.getElementsByClassName("__top")[0].classList.remove("active");
            break;
        }
      });

      //

      document.getElementsByClassName("__top")[0].addEventListener("click", event => {
        event.preventDefault();

        window.scrollTo({
          behavior: "smooth",
          top: 0
        });
      }, false);
    </script>
  `;
};
