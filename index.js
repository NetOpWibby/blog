


///  N A T I V E

const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

///  I M P O R T

const dedent = require("dedent");
const prettyBytes = require("pretty-bytes");
const polka = require("polka");
const print = require("@webb/console").default;

///  U T I L

const directory = path.join(__dirname, "document");
const environment = process.env.NODE_ENV || "development";
const pkg = require("./package.json");
const port = process.env.PORT || 3465;
const stat = promisify(fs.stat);

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



///  P R O G R A M

polka()
  .get("/", async(req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    const listings = await getPostListings();
    res.end(createContent(createTable(listings)));
  })
  .get("/:slug", async(req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    const posts = await getPosts();
    const { slug } = req.params;

    if (posts.indexOf(slug) < 0)
      res.end(errorMessage);

    res.end(await getFileContents(slug));
  })
  .listen(port, err => {
    if (err)
      throw err;

    process.stdout.write(logPrompt());
  });



///  H E L P E R

function createContent(suppliedContent) {
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
            <em><a href="/2019-12-02-a-personal-api.txt" title="blog post introducing the personalOS concept">personalOS</a><sup>α</sup> server running @ blog.webb.page &middot; <a href="https://github.com/NetOperatorWibby/blog" title="source code for this blog">source</a></em>
          </footer>
        </main>
      </body>
    </html>
  `;
}

function createTable(suppliedArray) {
  /// The funky indentation in the backticks is just so the rendered HTML
  /// looks good when viewing source. There really ought to be a module that
  /// does this for you but the web industry only cares about build pipelines
  /// and littering your front-end with endless amounts of <div>s. YUK.

  const tableItems = suppliedArray.map(arrayItem => {
    if (!arrayItem)
      return;

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

function getFileContents(suppliedFile) {
  const fileData = path.join(directory, suppliedFile);

  return new Promise((resolve, reject) => {
    fs.readFile(fileData, "utf8", (err, contents) => {
      try {
        resolve(contents);
      } catch (err) {
        reject(err);
      }
    });
  });
}

function getFileStats(suppliedFilePath) {
  return new Promise((resolve, reject) => {
    try {
      const fileStats = stat(suppliedFilePath);
      resolve(fileStats);
    } catch(err) {
      reject(err);
    }
  });
}

function getPostListings() {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, async(err, files) => {
      if (err)
        resolve([]);

      files = files.reverse().map(async(file) => {
        if (file.startsWith("."))
          return;

        const { size } = await getFileStats(path.join(directory, file));

        const data = {
          file,
          size: prettyBytes(size)
        };

        return data;
      });

      // TODO
      // : there is probably a simpler way of doing this
      const postListings = await Promise.all(files.filter(file => file !== undefined));

      try {
        resolve(postListings);
      } catch(err) {
        reject(err);
      }
    });
  });
}

function getPosts() {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, async(err, files) => {
      if (err)
        resolve([]);

      files = files.map(file => {
        if (file.startsWith("."))
          return;

        return file;
      });

      // TODO
      // : there is probably a simpler way of doing this
      const posts = files.filter(file => file !== undefined);

      try {
        resolve(posts);
      } catch(err) {
        reject(err);
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
    `${print.bold(print.white(pkg.name))} `,
    `${print.gray("|")} `,
    `${print.bold(print.white(environment))}`,
    "\n\n"
  ].join("");
}
