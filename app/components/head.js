"use strict";



//  P A C K A G E

import html from "choo/html";

//  V A R I A B L E

let title = "";



//  E X P O R T

module.exports = exports = (state, emit) => {
  // if (state.route !== "/" && state.params.wildcard) title = `${state.params.wildcard.capitalize()} ∙ theWebb.blog`;
  if (state.pageTitle) title = `${state.pageTitle} ∙ theWebb.blog`;
  else title = "theWebb.blog";

  if (state.title !== title) emit(state.events.DOMTITLECHANGE, title);
  state.page = state.page || { };

  // TODO:
  // - Support custom metadata (descriptions and whatnot)

  return html`
    <meta charset="utf-8"/>
    <title>${title}</title>

    <!--/ THE WEBB BLOG IS DOPE AF /-->

    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="author" content="Paul Anthony Webb"/>
    <meta name="description" content="theWebb.blog is Paul Anthony Webb's corner of the 'Net where he regales you with info about whatever he finds interesting."/> <!--/ TODO: If excerpt, replace /-->
    <meta name="title" content="${title}"/>
    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1"/>

    <!--/ Open Graph /-->
    <meta property="og:image" content="/assets/og.jpg"/>
    <meta property="og:image:height" content="1200"/>
    <meta property="og:image:width" content="675"/>
    <meta property="og:locale" content="en_US"/>
    <meta property="og:site_name" content="theWebb.blog"/>
    <meta property="og:title" content="${title}"/>
    <meta property="og:type" content="website"/>
    <meta property="og:url" content="https://thewebb.blog${state.href}"/>

    <!--/ Social/App Stuff /-->
    <meta name="apple-mobile-web-app-title" content="theWebb.blog"/>
    <meta name="application-name" content="theWebb.blog"/>
    <meta name="msapplication-TileColor" content="#2e353d"/>
    <meta name="msapplication-TileImage" content="/assets/images/apple-touch-icon.png"/>
    <meta name="theme-color" content="#2e353d"/>
    <meta name="socii:site" content="∴ wbbblg"/>

    <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png"/>
    <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"/>
    <link rel="mask-icon" href="/assets/favicon.svg" color="#2e353d"/>
    <link rel="shortcut icon" href="/assets/favicon.ico"/>

    <link href="/assets/type.css" rel="stylesheet"/>
    <link href="/assets/bundle.css" rel="stylesheet"/>

    <script src="/assets/scripts/vendor/zepto.js"></script>
    <script src="/assets/scripts/plugins/swipe.js"></script>
  `;
};



//  H E L P E R

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
