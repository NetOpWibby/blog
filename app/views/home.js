"use strict";



//  I M P O R T S

import compare from "alphabetic-compare";
import glob from "glob";
import relativeDate from "tiny-relative-date";

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
        <section
          class="wrapper-scroll"
          id="wrapper"
        >
          <posts class="content">
            ${result}
          </posts>
        </section>
      </main>
    `);
  }));
};



//  H E L P E R S

function getPosts() {
  return new Promise(resolve => glob(`${docsPath}/*.md`, (err, files) => {
    if (err)
      resolve("");

    const matches = [];
    const shapes = [
      "circle-center",
      "circle-left",
      "circle-right",
      "rectangle-bottom",
      "rectangle-top",
      "triangle-bottom-left",
      "triangle-bottom-right",
      "triangle-top-left",
      "triangle-top-right"
    ];

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

    matches.map(match => {
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

      html += `
        <post data-color="${match.color}" data-shape="${randomShape}" style="top: ${randomNumber(-20, 20)}%;">
          <a href="${match.url}">
            <post-title>${match.title}</post-title>
            <post-tldr>${match.tldr}</post-tldr>
            <time datetime="${match.date}">${relativeDate(match.date)}</time>
          </a>
        </post>
      `;
    });

    resolve(html);
  }));
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
