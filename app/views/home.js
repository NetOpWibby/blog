"use strict";



//  I M P O R T S

import compare from "alphabetic-compare";
import glob from "glob";

//  U T I L S

import {
  docsPath,
  filenameDateRegex,
  filenameYearRegex
} from "~util";

import yaml from "~module/yaml-front-matter";



//  E X P O R T

export default async() => {
  return new Promise(resolve => getPosts().then(result => {
    resolve(`
      <main>
        <header class="inner-wrap">
          <h1>the Webb.blog</h1>
        </header>

        <section class="inner-wrap">
          ${result}
        </section>
      </main>
    `);
  }));
};



//  H E L P E R

function getPosts() {
  return new Promise(resolve => glob(`${docsPath}/*.md`, (err, files) => {
    if (err)
      resolve("");

    const matches = [];
    let html = "";

    // files.sort((a, b) => compare(a, b, "en")); // basic sort
    files.sort((a, b) => compare(b, a, "en")); // reverse sort

    files.forEach(file => {
      const entry = yaml.loadFront(file);
      const filenameFull = file.split("/").pop();
      const fileUrl = filenameFull.replace(filenameDateRegex, "").replace(/.md/g, "");
      const fileYear = filenameFull.match(filenameYearRegex);

      entry.date = entry.date.toString();
      entry.url = `/${fileYear}/${fileUrl}`;

      if (entry.published)
        matches.push(entry);
    });

    matches.map(match => html += `
      <li data-color="${match.color}">
        <a href="${match.url}">
          ${match.title}<br/>
          <small>${match.tldr}</small><br/>
          <time datetime="${match.date}">${match.date}</time>
        </a>
      </li>
    `);

    resolve(html);
  }));
}
