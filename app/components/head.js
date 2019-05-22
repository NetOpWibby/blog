"use strict";



//  N A T I V E

import { readFileSync } from "fs"; // TODO: Use async version

//  I M P O R T

import cwd from "cwd";

//  U T I L S

import {
  defaultMetadata,
  isDevelopment
} from "~util";

const criticalStyles = readFileSync(cwd() + "/app/dist/css/critical.css", "utf8")
  .replace("/*# sourceMappingURL=critical.css.map */", "");



//  E X P O R T

export default metadata => {
  if (metadata && metadata.length)
    metadata = metadata[0];

  const description = metadata && metadata.description ?
    metadata.description :
    defaultMetadata.description;

  const title = metadata && metadata.title ?
    metadata.title :
    defaultMetadata.title + defaultMetadata.separator + defaultMetadata.tagline;

  const url = metadata && metadata.url ?
    metadata.url :
    defaultMetadata.url;

  return [
    "<meta charset='utf-8'/>",
    isDevelopment ?
      "" :
      "<meta http-equiv='Content-Security-Policy' content='upgrade-insecure-requests'/>",
    `<title>${title}</title>`,
    "<meta content='yes' name='apple-mobile-web-app-capable'/>",
    `<meta content="${defaultMetadata.author}" name="author"/>`,
    `<meta content="${description}" name="description"/>`,
    `<meta content="${title}" name="title"/>`,
    "<meta content='width=device-width, height=device-height, initial-scale=1, maximum-scale=5, viewport-fit=cover' name='viewport'/>",
    // Open Graph
    `<meta content="${description}" property="og:description"/>`,
    "<meta content='/assets/og.png' property='og:image'/>",
    "<meta content='800' property='og:image:height'/>",
    "<meta content='1280' property='og:image:width'/>",
    "<meta content='en_US' property='og:locale'/>",
    `<meta content="${title}" property="og:site_name"/>`,
    `<meta content="${title}" property="og:title"/>`,
    "<meta content='website' property='og:type'/>",
    `<meta content="${url}" property="og:url"/>`,
    // Social/App Stuff
    `<meta content="${title}" name="apple-mobile-web-app-title"/>`,
    `<meta content="${title}" name="application-name"/>`,
    "<meta content='&there4;&thinsp;NetOpWibby' name='socii:site'/>",
    `<meta content="${defaultMetadata.color}" name="theme-color"/>`,
    // Critical CSS
    "<link href='https://cdn.jsdelivr.net/gh/tonsky/FiraCode@master/distr/fira_code.css' rel='stylesheet'/>",
    `<style>${criticalStyles}</style>`,
    // The Rest
    "<link href='/assets/apple-touch-icon.png' rel='apple-touch-icon'/>",
    `<link href="${url}" rel="canonical"/>`,
    "<link color='#111' href='/assets/favicon.svg' rel='mask-icon'/>",
    "<link href='/assets/favicon.svg' rel='shortcut icon'/>",
    "<link href='/assets/css/bundle.css' rel='stylesheet'/>"
  ];
};
