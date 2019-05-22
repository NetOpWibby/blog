"use strict";



//  U T I L S

import handleRoute from "./handle-route";
import markdownParser from "./parse-markdown";
import readDocsDirectory from "./read-docs-dir";
import readMarkdownFile from "./read-markdown-file";
import renderPage from "./render-page";

import {
  analyticsId,
  appName,
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
  minifyOptions,
  mode,
  port,
  siteVersion
} from "./variables";



//  E X P O R T S

export {
  analyticsId,
  appName,
  appUrl,
  defaultMetadata,
  docsPath,
  filenameDateRegex,
  filenameYearRegex,
  frontmatterRegex,
  handleRoute,
  homepage,
  isDevelopment,
  markdownFilenameRegex,
  markdownParser,
  markedOptions,
  minifyOptions,
  mode,
  port,
  readDocsDirectory,
  readMarkdownFile,
  renderPage,
  siteVersion
};
