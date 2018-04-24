"use strict";



//  P A C K A G E S

import glob from "glob";
import root from "app-root-path";

const log = console.log; // eslint-disable-line
const yaml = require(`${root}/server/modules/yaml-front-matter`);



//  P R O G R A M

module.exports = (req, res) => {

  const matches = [];
  let posts = "";

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

    posts += `<ul class="archive__list">`;
    for (const key in matches) {
      if (
        matches[key].title !== undefined &&
        matches[key].published !== false
      ) {
        const tags = matches[key].tags.split(/[\s,]+/);

        if (~tags.indexOf(req.params.tag)) {
          posts += `
<li class="archive__list__item" itemprop="name headline">
  <a href="${matches[key].url}" itemprop="url">${matches[key].title}</a>
</li>
          `;
        }
      }
    }
    posts += "</ul>";

    res.render("pages/archive", Object.assign({
      layout: "layouts/default",
      PageTitle: `Tags/${req.params.tag}`,
      Content: posts
    }));
  });

};
