


//// import

import {
  join,
  green as shellGreen,
  magenta as shellMagenta,
  underline as shellUnderline
} from "dep/std.ts";

import { dedent } from "dep/x/dedent.ts";

//// util

import {
  environment,
  feedDirectory,
  getVersion,
  port,
  postDirectory
} from "src/utility/constant.ts";

import createLayout from "src/helper/create-layout.ts";
import getDirectoryContents from "src/helper/get-directory-contents.ts";
import getFileContents from "src/helper/get-file-contents.ts";
import getPosts from "src/helper/get-posts.ts";
import populateLayout from "src/helper/populate-layout.ts";

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



//// program

const version = await getVersion();

const server = Deno.serve({
  handler: async(req) => {
    const { pathname } = new URL(req.url);

    if (pathname === "/") {
      const listings = await getDirectoryContents();

      return new Response(
        createLayout(populateLayout(listings)), {
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
            "content-type": "text/atom+xml; charset=utf-8"
          }
        }
      );
    }

    if (pathname === "/feed/json") {
      const filePath = join(feedDirectory, "index.json");

      return new Response(
        await getFileContents(filePath), {
          headers: {
            "content-type": "text/feed+json; charset=utf-8"
          }
        }
      );
    }

    if (pathname === "/feed/rss") {
      const filePath = join(feedDirectory, "index.rss");

      return new Response(
        await getFileContents(filePath), {
          headers: {
            "content-type": "text/rss+xml; charset=utf-8"
          }
        }
      );
    }

    if (pathname.startsWith("/") && pathname.endsWith(".txt")) {
      const slug = pathname.slice(1);
      const posts = await getPosts();

      if (posts && posts.indexOf(slug) < 0) {
        return new Response(
          errorMessage, {
            headers: {
              "content-type": "text/plain; charset=utf-8"
            }
          }
        );
      }

      const filePath = join(postDirectory, slug);

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
    ); /// 404 by default
  },
  hostname: "0.0.0.0",
  onListen() {
    console.log(
      dedent`\n
     ┌${repeatCharacter("─", 32)}┐
     │ ${fit("BLOG API")} │
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



//// helper

async function gracefulShutdown() {
  await server.shutdown();
}

function fit(input: string) {
  const remainingSpace = 30 - input.length; /// 34 - 4 (border + one space each side)
  return input + " ".repeat(remainingSpace);
}

function repeatCharacter(input: string, repeatAmount: number): string {
  if (!repeatAmount || repeatAmount <= 0)
    return input;

  return input.repeat(repeatAmount);
}
