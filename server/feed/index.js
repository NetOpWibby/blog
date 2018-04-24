"use strict";



//  P A C K A G E S

import Feed from "feed";
import glob from "glob";
import m from "markdown-it";
import root from "app-root-path";

const log = console.log; // eslint-disable-line
const markdown = m();
const yaml = require(`${root}/server/modules/yaml-front-matter`);



module.exports = (req, res) => {

  //  I N I T
  //  F E E D

  const feed = new Feed({
    title: req.app.locals.Title,
    description: req.app.locals.Description,
    id: req.app.locals.URL,
    link: req.app.locals.URL,
    image: `${req.app.locals.URL}/images/apple-touch-icon.png`,
    copyright: `All Rights Reserved 2016-${new Date().getFullYear()}, ${req.app.locals.Author}`,
    generator: "Noto <https://noto.book>",

    author: {
      name: req.app.locals.Author,
      link: req.app.locals.URL
    }
  });



  //  G E N E R A T E
  //  ~       F E E D

  const matches = [];

  glob("./_posts/**/*.md", (err, files) => {
    if (err) return res.redirect("/");

    for (const file of files) {
      const entry = yaml.loadFront(file);

      entry.date = entry.date.toString();
      entry.url = "/thoughts/" + file.split(/.\/_posts\//g)[1].replace(/.md/g, "");

      if (entry.published === true) matches.push(entry);

      matches.sort((a, b) => {
        return new Date(b.date) - new Date(a.date); // Reverse sort
      });
    }

    for (const key in matches) {
      const post = matches[key];
      const audioPath = /\(🎵.*/g;
      const imagePath = /!\[.*/g;
      const videoPath = /\(📼.*/g;

      if (post.title !== undefined && post.published !== false) {
        const dataFormatted = post.__content
          .replace(audioPath, "— visit https://thewebb.blog to hear audio —\n")
          .replace(imagePath, "— visit https://thewebb.blog to view image —\n")
          .replace(videoPath, "— visit https://thewebb.blog to view video —\n")
          .replace(/<br\/>/g, "");

        feed.addItem({
          title: post.title,
          id: post.url,
          link: post.url,
          date: new Date(post.date),
          description: markdown.render(dataFormatted)
        });
      }
    }

    res.set("Content-Type", "text/xml");
    res.send(feed.atom1("atom-1.0"));
  });

};
