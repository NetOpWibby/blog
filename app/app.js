"use strict";



//  P A C K A G E S

import async from "choo-async";
import asyncHtml from "choo-async/html";
import choo from "choo";
import raw from "choo/html/raw";
import ssr from "choo-ssr";

//  V A R I A B L E S

import head from "./components/head";
import wrapper from "./components/wrapper";



//  P R O G R A M

function main() {
  const app = async(choo());

  const page = view => (
    shell(
      ssr.head(
        head,
        ssr.state()
      ),
      ssr.body(wrapper(view))
    )
  );

  app.use(ssr());

  app.route("/", page(require("./views/home")));

  app.route("/tags", page(require("./views/tags")));
  app.route("/tags/*", page(require("./views/tags")));

  app.route("/thoughts", page(require("./views/thoughts")));
  app.route("/thoughts/*", page(require("./views/thoughts")));

  app.route("/*", page(require("./views/redirect")));

  app.mount("html");

  return app;
}

if (typeof window !== "undefined") main();



//  E X P O R T

module.exports = exports = main;



//  H E L P E R

function shell(head, body) {
  return (state, emit) => {
    const bodyPromise = Promise.resolve(body(state, emit));
    const headPromise = bodyPromise.then(() => head(state, emit)); // resolve `head` once `body` is resolved
    let contentClass = "";

    // Dynamically add class based on viewed page
    if (!state.pageClass) contentClass = " class=\"homepage\"";
    else contentClass = ` class="${state.pageClass}"`;

    return asyncHtml`
      <!DOCTYPE html>
      <html${raw(contentClass)} lang="en">
        ${headPromise}
        ${bodyPromise}
      </html>
    `;
  };
}
