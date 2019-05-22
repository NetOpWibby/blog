"use strict";



//  N A T I V E

import { readFile } from "fs";

//  U T I L S

import {
  filenameDateRegex,
  filenameYearRegex,
  markdownFilenameRegex
} from "./variables";

import markdownParser from "./parse-markdown";



//  E X P O R T

export default async(suppliedPath) => {
  const filename = suppliedPath.split("/").pop();

  if (!filename.match(markdownFilenameRegex))
    return;

  const fileUrl = filename.replace(filenameDateRegex, "").replace(/.md/g, "");
  const fileYear = filename.match(filenameYearRegex);

  return new Promise(resolve => readFile(suppliedPath, "utf8", (err, data) => {
    if (err)
      resolve("");

    data = markdownParser(data);
    data.metadata.url = `/${fileYear}/${fileUrl}`;

    resolve(data);
  }));
};
