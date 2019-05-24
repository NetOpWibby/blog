"use strict";



//  U T I L

import { siteVersion } from "~util";



//  E X P O R T

export default () => {
  return [
    "<footer class='footer inner-wrap'>",
    `v${siteVersion}`,
    "</footer>",
    "<script src='/assets/scripts/app.js'></script>"
  ].join("");
};
