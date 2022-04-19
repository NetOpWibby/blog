/// <reference path="../@types/index.d.ts"/>



///  N A T I V E

import { join, resolve } from "path";
import { readFileSync, writeFileSync } from "fs";

///  I M P O R T

import { default as compare } from "alphabetic-compare";
import createDirectory from "make-dir";
import { Feed } from "feed";
import fs from "graceful-fs";
import glob from "glob";
import { marked } from "marked";
import yaml from "js-yaml";

///  U T I L

const baseDirectory = resolve(__dirname, "..");
const directory = join(baseDirectory, "document");
const regexFilenameDate = /^(\d{4}-\d{2}-\d{2}-)/g;
const regexFilenameYear = /^(\d{4})/g;
const regexTitle = /title:.*/g;
const regexYaml = /^(-{3}(?:\n|\r)([\w\W]+?)(?:\n|\r)-{3})/;

type LooseObject = {
  [key: string]: any;
};

yaml.parse = (text: string) => {
  const results = text.match(regexYaml);
  let conf;
  let yamlOrJson;

  yamlOrJson = results ? results[2] : "";

  const titleData = yamlOrJson.match(regexTitle)![0];
  const title = titleData.split(/title:/)[1];

  /// escape ":" in titles
  yamlOrJson = yamlOrJson.replace(titleData, `title: ${title.replace(":", "&#58;")}`);

  switch(true) {
    case !yamlOrJson:
      return;

    case yamlOrJson.charAt(0) === "{":
      conf = JSON.parse(yamlOrJson);
      break;

    default:
      conf = yaml.load(yamlOrJson);
      break;
  }

  return conf;
};

yaml.loadBack = (context: string) => {
  if (!context)
    return "";

  if (fs.existsSync(context)) {
    const fileContents = fs.readFileSync(context, "utf8");
    const frontmatter = fileContents.match(regexYaml)[0];

    return(fileContents.replace(frontmatter, "").trim());
  }
};

yaml.loadFront = (context: string) => {
  let contents;

  switch(true) {
    case fs.existsSync(context):
      contents = fs.readFileSync(context, "utf8");

      if (contents instanceof Error)
        return contents;

      return yaml.parse(contents);

    case Buffer.isBuffer(context):
      return yaml.parse(context.toString());

    default:
      return yaml.parse(context);
  }
};



///  P R O G R A M

glob(`${directory}/*.txt`, (err: any, files: []) => {
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
    favicon: "https://🔥.pixels.wtf/blog/asset/favicon.svg",
    feedLinks: {
      atom: "https://blog.webb.page/feed/index.atom",
      json: "https://blog.webb.page/feed/index.json"
    },
    generator: "The 'Net",
    id: "https://blog.webb.page/",
    image: "https://🔥.pixels.wtf/blog/asset/og.png",
    language: "en",
    link: "https://blog.webb.page",
    title: "the webb blog"
  });

  const posts: LooseObject[] = [];

  files.sort((a, b) => compare(b, a, "en")); /// reverse sort

  files.map(async(file: string) => {
    const entry = yaml.loadFront(file);
    const filenameFull = file.split("/").pop();

    entry.date = entry.date.toString();
    entry.url = `/${filenameFull}`;
    posts.push(entry);

    const post = yaml.loadBack(file);

    post && feed.addItem({
      author: [
        {
          email: "paul+blog@webb.page",
          link: "https://webb.page",
          name: "Paul Anthony Webb"
        }
      ],
      content: marked.parse(post),
      date: new Date(entry.date),
      description: entry.tldr,
      id: `https://blog.webb.page${entry.url}`,
      image: "https://blog.webb.page/assets/og.png",
      link: `https://blog.webb.page${entry.url}`,
      title: entry.title
    });
  });

  (feed as any).updated = new Date(posts[0].date);

  /// create feeds
  createDirectory("feed");
  writeFileSync(join(baseDirectory, "feed", "index.xml"), feed.atom1(), "utf8");
  writeFileSync(join(baseDirectory, "feed", "index.json"), feed.json1(), "utf8");

  console.log("Feeds written");
});



///  H E L P E R

function getFileContents(suppliedFile: string) {
  if (!suppliedFile)
    return "";

  return new Promise((resolve, reject) => {
    fs.readFile(suppliedFile, "utf8", (err: any, contents: any) => {
      try {
        resolve(contents);
      } catch(err) {
        reject(err);
      }
    });
  });
}
