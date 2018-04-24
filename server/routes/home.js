"use strict";



//  P A C K A G E S

import glob from "glob";
import root from "app-root-path";

const log = console.log; // eslint-disable-line
const yaml = require(`${root}/server/modules/yaml-front-matter`);



//  P R O G R A M

module.exports = (req, res) => {

  const matches = [];

  let coverStories;
  let toc = "";
  let coverHTML = "";

  glob("./_posts/**/*.md", (err, files) => {
    if (err) log(err);

    for (const file of files) {
      const entry = yaml.loadFront(file);

      entry.date = entry.date.toString();
      entry.url = "/thoughts/" + file.split(/.\/_posts\//g)[1].replace(/.md/g, "");

      if (entry.published === true) matches.push(entry);

      matches.sort((a, b) => {
        return new Date(b.date) - new Date(a.date); // Reverse sort
      });
    }

    coverStories = matches.slice(0, 3);

    for (const key in coverStories) {
      const post = matches[key];

      if (
        post.title !== undefined &&
        post.published !== false
      ) {
        coverHTML += `<a class="cover__story" href="${post.url}" itemprop="name headline" title="${post.title} on theWebb.blog">${post.title}</a>`;
      }
    }

    for (const key in matches) {
      const post = matches[key];

      if (
        post.title !== undefined &&
        post.published !== false
      ) {
        toc += `
<li class="foreward__toc__story">
  <a href="${post.url}" itemprop="name headline" title="Read '${post.title}'">
    ${post.title}
    <span>${post.tldr}</span>
  </a>
</li>
        `;
      }
    }

    // HAHA GOT IT WORKING
    // posts += `<script>$(function () { $("nav a:first-of-type").addClass("active"); });</script>`;

    res.render("index", Object.assign({
      layout: "layouts/homepage",
      coverStories: coverHTML,
      tableOfContents: toc
    }));
  });

};
