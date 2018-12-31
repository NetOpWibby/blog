"use strict";



//  P A C K A G E

import asyncHtml from "choo-async/html";

//  U T I L

import footer from "./footer";



//  E X P O R T

module.exports = exports = children => (state, emit) => asyncHtml`
  <noscript>theWebb.blog requires JavaScript, please enable it to ensure a joyful browsing experience</noscript>

  <header class="header light">
    <div class="inner-wrap">
      <h1 class="header__logo">
        <a href="/" title="Back to theWebb.blog homepage">theWebb.blog</a>
      </h1>

      <h2 class="header__edition">
        <span data-edition="🕸💪🏾😤🤙🏾">🕸💪🏾😤🤙🏾</span>
      </h2>
    </div>
  </header>

  <main>
    ${children(state, emit)}
  </main>

  ${footer(state, emit)}
`;
