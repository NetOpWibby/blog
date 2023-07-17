/// <reference path="../@types/index.d.ts"/>



/// native

import { readdir, readFile, stat } from "fs";
import { join, resolve } from "path";
import { promisify } from "util";

/// import

import dedent from "dedent";
import polka from "polka";
import { print } from "@webb/console";

/// util

import { name } from "../package.json";
import { prettyBytes } from "./utility/pretty-bytes";

const baseDirectory = resolve(__dirname, "..");
const directory = join(baseDirectory, "document");
const feed = join(baseDirectory, "feed");
const environment = process.env.NODE_ENV || "development";
const info = promisify(stat);
const port = process.env.PORT || 3465;

const errorMessage = dedent`
  ---
  title: Not found
  date:  20XX-XX-XX
  tags:  fail, goof, womp
  tldr:  What you are looking for does not exist
  ---

  Yeah, nah. Head back to the homepage and you may find something else
  interesting though.
`;

const siteAuthor = "Paul Anthony Webb";
const siteDescription = "Welcome to Paul Anthony Webb's corner of the 'Net where he'll regale you with whatever he finds interesting.";
const siteTitle = "the webb blog";
const siteUrl = "https://blog.webb.page";



/// program

polka()
  .get("/", async(req: any, res: any) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    const listings = await getPostListings();
    res.end(createContent(createTable(listings)));
  })
  .get("/feed/atom", async(req: any, res: any) => {
    res.setHeader("Content-Type", "application/atom+xml; charset=utf-8");
    res.end(await getFeedContents("index.xml"));
  })
  .get("/feed/json", async(req: any, res: any) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(await getFeedContents("index.json"));
  })
  .get("/:slug", async(req: any, res: any) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    const posts = await getPosts();
    const { slug } = req.params;

    // @ts-ignore TS2345
    if (posts.indexOf(slug) < 0)
      res.end(errorMessage);

    res.end(await getFileContents(slug));
  })
  .get("/:slug/:part", async(req: any, res: any) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    const { part, slug } = req.params;
    res.end(movedMessage(slug, part));
  })
  .listen(port, (err: any) => {
    if (err)
      throw err;

    process.stdout.write(logPrompt());
  });



/// helper

function createContent(suppliedContent: string) {
  return dedent`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <title>${siteTitle}</title>

        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
        <meta content="${siteAuthor}" name="author"/>
        <meta content="${siteDescription}" name="description"/>
        <meta content="${siteTitle}" name="title"/>
        <meta content="width=device-width, height=device-height, initial-scale=1, maximum-scale=5, viewport-fit=cover" name="viewport"/>

        <!--/ Open Graph /-->
        <meta content="${siteDescription}" property="og:description"/>
        <meta content="https://🔥.pixels.wtf/blog/asset/og.png" property="og:image"/>
        <meta content="800" property="og:image:height"/>
        <meta content="1280" property="og:image:width"/>
        <meta content="en_US" property="og:locale"/>
        <meta content="${siteTitle}" property="og:site_name"/>
        <meta content="${siteTitle}" property="og:title"/>
        <meta content="website" property="og:type"/>
        <meta content="${siteUrl}" property="og:url"/>

        <!--/ Social/App Stuff /-->
        <meta content="${siteTitle}" name="apple-mobile-web-app-title"/>
        <meta content="${siteTitle}" name="application-name"/>
        <meta content="∴NetOpWibby" name="socii:site"/>

        <!--/ The Rest /-->
        <link href="https://🔥.pixels.wtf/blog/asset/apple-touch-icon.png" rel="apple-touch-icon"/>
        <link href="${siteUrl}" rel="canonical"/>
        <link color="#111" href="https://🔥.pixels.wtf/blog/asset/favicon.svg" rel="mask-icon"/>
        <link href="https://🔥.pixels.wtf/blog/asset/favicon.svg" rel="shortcut icon"/>

        <style>
          *,
          *::before,
          *::after {
            margin: 0; padding: 0;
            box-sizing: inherit;
          }

          :root {
            --color-black: #010000;
            --color-blue: #4dabf7;
            --color-gray: #ddd;
            --color-purple: #9775fa;
            --color-white: #fcfcfc;
          }

          html {
            width: 100vw; height: 100vh;
            box-sizing: border-box;
            font-size: 12px;
          }

          body {
            width: 100%; height: 100%;

            background-color: var(--color-white);
            color: var(--color-black);
            display: flex;
            flex-direction: column;
            font-family: monospace;
            font-size: 1.15rem;
            line-height: 1.33;
            padding: 3rem 2rem;
          }

          main {
            flex: 1;
          }

          header {
            margin-bottom: 4rem;
          }

          footer {
            margin-top: 4rem;
            margin-bottom: 2rem;
          }

          p {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
          }

          a {
            color: var(--color-blue);
          }

          a:visited {
            color: var(--color-purple);
          }

          /*————— grid */

          .grid {
            width: 100%;
          }

          @media (min-width: 901px) {
            .grid {
              display: table;
              table-layout: fixed;
            }
          }

          @media (max-width: 900px) {
            .grid:first-of-type {
              display: none;
            }

            .grid {
              display: flex;
              flex-direction: column-reverse;
              padding: 0.75rem 1rem 0.75rem 0;
            }

            .grid:nth-child(2) {
              padding-bottom: 1.25rem;
            }

            .grid:not(:first-of-type):not(:nth-child(2)) {
              padding-top: 1rem;
            }
          }

          @media (min-width: 451px) and (max-width: 850px) {
            .grid:not(:first-of-type):not(:nth-child(2)) {
              padding-bottom: 1.25rem;
            }
          }

          @media (max-width: 450px) {
            .grid:not(:first-of-type):not(:nth-child(2)) {
              padding-bottom: 1rem;
            }
          }

          .grid:first-of-type {
            font-weight: 600;
            letter-spacing: 0.05rem;
            position: relative;
          }

          .grid:not(:first-of-type) {
            border-bottom: 1px solid var(--color-gray);
          }

          /*————— column */

          .col {
            cursor: default;
            overflow: hidden;
          }

          @media (min-width: 901px) {
            .col {
              display: table-cell;
              padding: 0.75rem 1rem 0.75rem 0;
              vertical-align: middle;
            }

            .col:first-child {
              padding-right: 3rem;
              text-align: right;
              width: 10rem;
            }
          }

          .col a {
            white-space: pre-line;
          }
        </style>
      </head>

      <body>
        <main>
          <header>
            <h1>index of /</h1>
            <p>Welcome to Paul Anthony Webb's corner of the 'Net where he'll regale you with whatever he finds interesting.</p>
          </header>
          ${suppliedContent}

          <footer>
            <em><a href="/2019-12-02-a-personal-api.txt" title="blog post introducing the personalOS concept">personalOS</a><sup>α</sup> server running @ blog.webb.page &middot; <a href="https://github.com/NetOpWibby/blog" title="source code for this blog">source</a><br/>feeds: <a href="/feed/atom" title="Atom feed for the webb blog">atom</a> &middot; <a href="/feed/json" title="JSON feed for the webb blog">json</a></em>
          </footer>
        </main>
      </body>
    </html>
  `;
}

function createTable(suppliedArray: any): string {
  /// The funky indentation in the backticks is just so the rendered HTML
  /// looks good when viewing source. There really ought to be a module that
  /// does this for you but the web industry only cares about build pipelines
  /// and littering your front-end with endless amounts of <div>s. YUK.

  const tableItems = suppliedArray.map((arrayItem: { file: string, size: number }) => {
    if (!arrayItem)
      return "";

    const { file, size } = arrayItem;

    return `
            <div class="grid">
              <div class="col">${size}</div>
              <div class="col"><a href="/${file}">${file}</a></div>
            </div>
          `;
  });

  return `
          <section>
            <div class="grid">
              <div class="col">size</div>
              <div class="col">filename</div>
            </div>
            ${tableItems.join("")}</section>`;
}

function getFeedContents(suppliedFile: string) {
  const fileData = join(feed, suppliedFile);

  return new Promise((resolve, reject) => {
    readFile(fileData, "utf8", (err, contents) => {
      try {
        resolve(contents);
      } catch(err) {
        resolve("");
      }
    });
  });
}

function getFileContents(suppliedFile: string) {
  const fileData = join(directory, suppliedFile);

  return new Promise((resolve, reject) => {
    readFile(fileData, "utf8", (err, contents) => {
      try {
        resolve(contents);
      } catch(err) {
        resolve("");
      }
    });
  });
}

function getPostListings() {
  return new Promise((resolve, reject) => {
    readdir(directory, async(err, files) => {
      if (err)
        resolve([]);

      const processedFiles = files.reverse().map(async(file: string) => {
        if (file.startsWith("."))
          return;

        const { size } = await info(join(directory, file));
        const data = { file, size: prettyBytes(size) };

        return data;
      });

      // TODO
      // : there is probably a simpler way of doing this
      const postListings = await Promise.all(processedFiles.filter(file => file !== undefined));

      try {
        resolve(postListings);
      } catch(err) {
        resolve([]);
      }
    });
  });
}

function getPosts() {
  return new Promise((resolve, reject) => {
    readdir(directory, async(err, files) => {
      if (err)
        resolve([]);

      const processedFiles = files.map(file => {
        if (file.startsWith("."))
          return;

        return file;
      });

      // TODO
      // : there is probably a simpler way of doing this
      const posts = processedFiles.filter(file => file !== undefined);

      try {
        resolve(posts);
      } catch(err) {
        resolve([]);
      }
    });
  });
}

function logPrompt() {
  return [
    "\n",
    `${print.gray(":::")} `,
    `${print.green("⚡")} `,
    `${print.bold(print.white(port))} `,
    `${print.gray("|")} `,
    `${print.bold(print.white(name))} `,
    `${print.gray("|")} `,
    `${print.bold(print.white(environment))}`,
    "\n\n"
  ].join("");
}

function movedMessage(first: string, second: string) {
  let cleanedUrlFragment1 = "";
  let cleanedUrlFragment2 = "";
  let message = "something on the homepage";

  if (String(first).length === 4 && Number(first))
    cleanedUrlFragment1 = String(first);

  if (String(second).indexOf("-") > -1)
    cleanedUrlFragment2 = String(second);

  if (cleanedUrlFragment1 && cleanedUrlFragment2)
    message = `https://blog.webb.page/${cleanedUrlFragment1}-XX-XX-${cleanedUrlFragment2}.txt`;

  return dedent`
    ---
    title: Page (most likely) moved
    date:  20XX-XX-XX
    tags:  error
    tldr:  What you are looking for probably moved
    ---

    I have not setup redirects for old blog posts to map to the new
    layout. My apologies. For now, you are probably looking for
    ${message}.
  `;
}
