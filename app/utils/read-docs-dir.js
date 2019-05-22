"use strict";



//  I M P O R T

import compare from "alphabetic-compare";
import recursive from "recursive-readdir";

//  U T I L S

import { docsPath } from "./variables";
import readMarkdownFile from "./read-markdown-file";



//  E X P O R T

export default () => {
  return recursive(docsPath, [".DS_Store", "Thumbs.db"]).then( // TODO: Only allow `*.md` files
    files => {
      const formattedResults = [];

      // files.sort((a, b) => compare(a, b, "en")); // basic sort
      files.sort((a, b) => compare(b, a, "en")); // reverse sort
      files.map(file => formattedResults.push(readMarkdownFile(file)));

      return formattedResults;
    },
    error => {
      console.error(error); // eslint-disable-line no-console
      return [];
    }
  );
};
