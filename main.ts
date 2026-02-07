


/*** IMPORT ------------------------------------------- ***/

import {
  join,
  green as shellGreen,
  magenta as shellMagenta,
  underline as shellUnderline
} from "dep/std.ts";

import { dedent } from "dep/x/dedent.ts";

/*** UTILITY ------------------------------------------ ***/

import {
  environment,
  errorMessage,
  feedDirectory,
  getVersion,
  memoDirectory,
  port,
  remarkDirectory
} from "src/utility/constant.ts";

import createLayout from "src/helper/create-layout.ts";
import getBinaryContents from "src/helper/get-binary-contents.ts";
import getDirectoryContents from "src/helper/get-directory-contents.ts";
import getDocuments from "src/helper/get-documents.ts";
import getFileContents from "src/helper/get-file-contents.ts";
import populateDocument from "src/helper/populate-document.ts";
import populateRecents from "src/helper/populate-recents.ts";

/*** PROGRAM ------------------------------------------ ***/

const version = await getVersion();

const server = Deno.serve({
  handler: async(req) => {
    const { origin, pathname } = new URL(req.url);

    if (pathname === "/2019-12-02-a-personal-api.txt")
      return Response.redirect(origin + "/WM-042", 302);

    if (pathname === "/") {
      const listings = await getDirectoryContents(memoDirectory);

      return new Response(
        createLayout("memo", await populateDocument(listings[0]), populateRecents(listings, listings[0].filename)), {
          headers: {
            "content-type": "text/html; charset=utf-8"
          }
        }
      );
    }

    if (pathname === "/remarks") {
      const listings = await getDirectoryContents(remarkDirectory);

      return new Response(
        createLayout("remark", await populateDocument(listings[0]), populateRecents(listings, listings[0].filename)), {
          headers: {
            "content-type": "text/html; charset=utf-8"
          }
        }
      );
    }

    if (pathname === "/feed/atom") {
      const filePath = join(feedDirectory, "index.xml");

      return new Response(
        await getFileContents(filePath), {
          headers: {
            "content-type": "application/atom+xml; charset=utf-8"
          }
        }
      );
    }

    if (pathname === "/feed/json") {
      const filePath = join(feedDirectory, "index.json");

      return new Response(
        await getFileContents(filePath), {
          headers: {
            "content-type": "application/feed+json; charset=utf-8"
          }
        }
      );
    }

    if (pathname === "/feed/rss") {
      const filePath = join(feedDirectory, "index.rss");

      return new Response(
        await getFileContents(filePath), {
          headers: {
            "content-type": "application/rss+xml; charset=utf-8"
          }
        }
      );
    }

    if (pathname === "/type/400.woff2") {
      const filePath = join("src", "asset", "type", "400.woff2");

      return new Response(
        await getBinaryContents(filePath), {
          headers: {
            "cache-control": "public, max-age=31536000, immutable",
            "content-type": "font/woff2"
          }
        }
      );
    }

    if (pathname === "/type/400i.woff2") {
      const filePath = join("src", "asset", "type", "400i.woff2");

      return new Response(
        await getBinaryContents(filePath), {
          headers: {
            "cache-control": "public, max-age=31536000, immutable",
            "content-type": "font/woff2"
          }
        }
      );
    }

    if (pathname === "/type/600.woff2") {
      const filePath = join("src", "asset", "type", "600.woff2");

      return new Response(
        await getBinaryContents(filePath), {
          headers: {
            "cache-control": "public, max-age=31536000, immutable",
            "content-type": "font/woff2"
          }
        }
      );
    }

    if (pathname === "/type/600i.woff2") {
      const filePath = join("src", "asset", "type", "600i.woff2");

      return new Response(
        await getBinaryContents(filePath), {
          headers: {
            "cache-control": "public, max-age=31536000, immutable",
            "content-type": "font/woff2"
          }
        }
      );
    }

    if (/^\/(WM-\d*)$/.test(pathname)) {
      const slug = pathname.slice(1) + ".txt";
      const posts = await getDocuments(memoDirectory);

      if (posts && posts.indexOf(slug) < 0) {
        return new Response(
          errorMessage, {
            headers: {
              "content-type": "text/plain; charset=utf-8"
            }
          }
        );
      }

      const listings = await getDirectoryContents(memoDirectory);

      return new Response(
        createLayout("memo", await populateDocument({ filename: slug }), populateRecents(listings, slug)), {
          headers: {
            "content-type": "text/html; charset=utf-8"
          }
        }
      );
    }

    if (/^\/(WM-\d*).txt$/.test(pathname)) {
      const slug = pathname.slice(1);
      const posts = await getDocuments(memoDirectory);

      if (posts && posts.indexOf(slug) < 0) {
        return new Response(
          errorMessage, {
            headers: {
              "content-type": "text/plain; charset=utf-8"
            }
          }
        );
      }

      const filePath = join(memoDirectory, slug);

      return new Response(
        await getFileContents(filePath), {
          headers: {
            "content-type": "text/plain; charset=utf-8"
          }
        }
      );
    }

    if (/^\/remarks\/(WR-\d*)$/.test(pathname)) {
      const slug = pathname.split("/").pop() + ".txt";
      const posts = await getDocuments(remarkDirectory);

      if (posts && posts.indexOf(slug) < 0) {
        return new Response(
          errorMessage, {
            headers: {
              "content-type": "text/plain; charset=utf-8"
            }
          }
        );
      }

      const listings = await getDirectoryContents(remarkDirectory);

      return new Response(
        createLayout("remark", await populateDocument({ filename: slug }), populateRecents(listings, slug)), {
          headers: {
            "content-type": "text/html; charset=utf-8"
          }
        }
      );
    }

    if (/^\/remarks\/(WR-\d*).txt$/.test(pathname)) {
      const slug = String(pathname.split("/").pop());
      const documentArray = await getDocuments(remarkDirectory);

      if (documentArray && documentArray.indexOf(slug) < 0) {
        return new Response(
          errorMessage, {
            headers: {
              "content-type": "text/plain; charset=utf-8"
            }
          }
        );
      }

      const filePath = join(remarkDirectory, slug);

      return new Response(
        await getFileContents(filePath), {
          headers: {
            "content-type": "text/plain; charset=utf-8"
          }
        }
      );
    }

    return new Response(
      errorMessage, {
        headers: {
          "content-type": "text/plain; charset=utf-8"
        }
      }
    ); /*** 404 by default ***/
  },
  hostname: "0.0.0.0",
  onListen() {
    console.log(
      dedent`\n
     ┌${repeatCharacter("─", 32)}┐
     │ ${fit("THE WEBB BLOG")} │
     │ ${fit(`→ ${environment}`)} │
     │ ${shellGreen(fit(version))} │
     └${repeatCharacter("─", 32)}┘
      LOCAL ${shellMagenta(`${shellUnderline(`${this.hostname}:${port}`)}`)}
      \n`
    );
  },
  port
}) as Deno.HttpServer;

Deno.addSignalListener("SIGINT", gracefulShutdown);
Deno.addSignalListener("SIGTERM", gracefulShutdown);

/*** HELPER ------------------------------------------- ***/

function fit(input: string) {
  const remainingSpace = 30 - input.length; /*** 34 - 4 (border + one space each side) ***/
  return input + " ".repeat(remainingSpace);
}

async function gracefulShutdown() {
  await server.shutdown();
}

function repeatCharacter(input: string, repeatAmount: number): string {
  if (!repeatAmount || repeatAmount <= 0)
    return input;

  return input.repeat(repeatAmount);
}
