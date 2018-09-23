"use strict";



//  P A C K A G E

import html from "choo/html";



//  E X P O R T

module.exports = exports = state => {
  state.pageClass = "error";

  return html`
    <section class="error-page">
      <div>
        <h2><span>👎🏾</span> NOPE</h2>
        <p>Looks like <strong>https://thewebb.blog${state.href}</strong> is not a valid route. Redirecting in 2...</p>
      </div>
    </section>

    <script>
      setTimeout(() => {
        window.location = window.location.origin;
      }, 2000);
    </script>
  `;
};
