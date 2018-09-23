"use strict";



//  P A C K A G E S

import glob from "glob";
import html from "choo/html";
import raw from "choo/html/raw";
import { require as local } from "app-root-path";

//  V A R I A B L E

const yaml = local("/app/modules/yaml-front-matter");



//  E X P O R T

module.exports = exports = (state, emit) =>
  pageGenerator(state, emit).then(response => response); // eslint-disable-line



//  H E L P E R S

function getTag(state) {
  const matches = [];
  const wildcard = state.params.wildcard;

  state.pageClass = "archive";

  return new Promise(resolve => glob("./documents/posts/**/*.md", (err, files) => {
    // if (err) log(err); // TODO

    for (const file of files) {
      const entry = yaml.loadFront(file);

      entry.date = entry.date.toString();
      entry.url = "/thoughts/" + file.split(/.\/posts\//g)[1].replace(/.md/g, "");

      if (entry.published === true) matches.push(entry);

      matches.sort((a, b) => {
        return new Date(b.date) - new Date(a.date); // Reverse sort
      });
    }

    let posts = "<ul class=\"archive__list\">";
    for (const key in matches) {
      if (
        matches[key].title !== undefined &&
        matches[key].published !== false
      ) {
        const tags = matches[key].tags.split(/[\s,]+/);

        if (~tags.indexOf(wildcard)) {
          posts += html`
            <li class="archive__list__item" itemprop="name headline">
              <a href="${matches[key].url}" itemprop="url">${matches[key].title}</a>
            </li>
          `;
        }
      }
    }
    posts += "</ul>";

    resolve(pageTemplateArchive(`Tags/${wildcard}`, posts));
  }));
}

function getTags(state) {
  const foundTags = [];
  const matches = [];

  state.pageClass = "archive";

  return new Promise(resolve => glob("./documents/posts/**/*.md", (err, files) => {
    // if (err) log(err); // TODO

    for (const file of files) {
      const entry = yaml.loadFront(file);
      if (entry.published === true) matches.push(entry);
    }

    for (const key in matches) {
      if (matches[key].title !== undefined) {
        const tags = matches[key].tags.split(/[\s,]+/);
        for (let t = 0; t < tags.length; t++) foundTags.push(tags[t]);
      }
    }

    // Sort alphabetically
    foundTags.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;

      return 0;
    });

    const finalTagArray = uniq(foundTags);

    let posts = "<ul class=\"archive__list\">";
    for (const finalTag in finalTagArray) {
      posts += html`
        <li class="archive__list__item" itemprop="name headline">
          <a href="/tags/${finalTagArray[finalTag]}" itemprop="url">${finalTagArray[finalTag]}</a>
        </li>
      `;
    }
    posts += "</ul>";

    resolve(pageTemplateArchive("Tags", posts));
  }));
}

function pageGenerator(state) {
  const wildcard = state.params.wildcard;

  switch(true) {
    case (wildcard && wildcard.length > 0):
      return getTag(state);

    default:
      return getTags(state);
  }
}

function pageTemplateArchive(title, content) {
  return html`
    <section class="inner-wrap">
      <h2 class="archive__heading">Index</h2>
      <h3 class="archive__subheading">${title}</h3>

      ${raw(content)}
    </section>
  `;
}

function uniq(a) { // remove duplicates from array
  return Array.from(new Set(a));
}
