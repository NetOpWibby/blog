"use strict";



//  N A T I V E

import {
  readFileSync,
  writeFileSync
} from "fs";

//  I M P O R T S

import compare from "alphabetic-compare";
import { Feed } from "feed";
import glob from "glob";
import marked from "marked";

//  U T I L S

import {
  docsPath,
  filenameDateRegex,
  filenameYearRegex,
  markdownParser,
  markedOptions
} from "~util";

import yaml from "~module/yaml-front-matter";

marked.setOptions({
  ...markedOptions,
  renderer: new marked.Renderer()
});



//  P R O G R A M

glob(`${docsPath}/*.md`, (err, files) => {
  if (err)
    return;

  const feed = new Feed({
    author: {
      email: "paul+blog@webb.page",
      link: "https://webb.page",
      name: "Paul Anthony Webb"
    },
    copyright: "All Rights Reserved, Paul Anthony Webb",
    description: "Welcome to Paul Anthony Webb's corner of the 'Net where he'll regale you with whatever he finds interesting.",
    favicon: "https://blog.webb.page/assets/favicon.svg",
    feedLinks: {
      atom: "https://blog.webb.page/feed/index.atom",
      json: "https://blog.webb.page/feed/index.json"
      // rss: "https://blog.webb.page/feed/index.xml"
    },
    generator: "The 'Net",
    id: "https://blog.webb.page/",
    image: "https://blog.webb.page/assets/og.png",
    language: "en",
    link: "https://blog.webb.page",
    title: "the Webb blog"
  });

  const posts = [];

  files.sort((a, b) => compare(b, a, "en")); // Reverse sort

  files.forEach(file => {
    const entry = yaml.loadFront(file);
    const filenameFull = file.split("/").pop();
    const fileUrl = filenameFull.replace(filenameDateRegex, "").replace(/.md/g, "");
    const fileYear = filenameFull.match(filenameYearRegex);

    entry.date = entry.date.toString();
    entry.url = `/${fileYear}/${fileUrl}`;

    if (entry.published) {
      posts.push(entry);

      const { markdown } = markdownParser(readFileSync(file, "utf8"));
      const content = marked(markdown);

      feed.addItem({
        author: [
          {
            email: "paul+blog@webb.page",
            link: "https://webb.page",
            name: "Paul Anthony Webb"
          }
        ],
        content,
        date: new Date(entry.date),
        description: entry.tldr,
        id: `https://blog.webb.page${entry.url}`,
        image: "https://blog.webb.page/assets/og.png",
        link: `https://blog.webb.page${entry.url}`,
        title: entry.title
      });
    }
  });

  feed.updated = new Date(posts[0].date);

  // Create feeds
  writeFileSync("./app/dist/feed/index.atom", feed.atom1(), "utf8");
  writeFileSync("./app/dist/feed/index.json", feed.json1(), "utf8");
  // writeFileSync("./app/dist/feed/index.xml", feed.rss2(), "utf8");
});
