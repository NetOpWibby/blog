"use strict";



//  N A T I V E

import fs from "fs";

//  I M P O R T

import cwd from "cwd";

//  U T I L S

const _pkg = JSON.parse(fs.readFileSync("./package.json"));
const _port = 3465;

const {
  author,
  homepage,
  name,
  version
} = _pkg;

const analyticsId = "5ae8a593b13869077c37f620";

const defaultMetadata = {
  author: author.name,
  color: "#07d0eb",
  description: "Welcome to Paul Anthony Webb's corner of the 'Net where he'll regale you with whatever he finds interesting.",
  separator: " ∙ ",
  tagline: "Stick around",
  title: "the Webb blog",
  url: homepage
};

const docsPath = cwd() + "/documents";
const filenameDateRegex = /^(\d{4}-\d{2}-\d{2}-)/g;
const filenameYearRegex = /^(\d{4})/g;
const frontmatterRegex = /^(---[\s\S]+?---)/g;
const isDevelopment = process.env.NODE_ENV === "development";

const appUrl = isDevelopment ?
  `http://localhost:${_port}` :
  homepage;

const markdownFilenameRegex = /.*(\.md)/g;

const mode = isDevelopment ?
  "development" :
  "production";

const markedOptions = {
  breaks: true,
  gfm: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  tables: true,
  xhtml: true
};

const minifyOptions = {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  keepClosingSlash: true,
  minifyCSS: true,
  minifyJS: true,
  removeComments: true,
  sortAttributes: true,
  sortClassName: true
};

const siteVersion = version;



//  E X P O R T S

export {
  analyticsId,
  name as appName,
  appUrl,
  defaultMetadata,
  docsPath,
  filenameDateRegex,
  filenameYearRegex,
  frontmatterRegex,
  homepage,
  isDevelopment,
  markdownFilenameRegex,
  markedOptions,
  mode,
  minifyOptions,
  _port as port,
  siteVersion
};
