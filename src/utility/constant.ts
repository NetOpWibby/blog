


/*** IMPORT ------------------------------------------- ***/

import { join } from "dep/std.ts";

/*** UTILITY ------------------------------------------ ***/

const baseDirectory = await Deno.realPath(".");
const isDevelopment = Deno.args.includes("development");

/*** EXPORT ------------------------------------------- ***/

export const author = "Paul Anthony Webb";
export const description = "Welcome to Paul Anthony Webb’s corner of the ’Net where he’ll regale you with whatever he finds interesting.";
export const descriptionRemarks = "Nifty notes and snippets I come across that aren’t suitable for long-form posts.";
export const email = "paul+blog@webb.page";
export const environment = isDevelopment ? "development" : "production";
export const feedDirectory = join(baseDirectory, "feed");
export const memoDirectory = join(baseDirectory, "memos");
export const port = Number(Deno.env.has("PORT") ? Deno.env.get("PORT") : 3465);
export const remarkDirectory = join(baseDirectory, "remarks");
export const remarkRegex = /^(WR-\d*).txt$/;
export const title = "the webb blog";
export const titleRemarks = "the webb blog &bull; remarks";
export const url = "https://blog.webb.page";
export const urlRemarks = "https://blog.webb.page/remarks";

export async function getVersion() {
  let version = "";

  try {
    version = await Deno.readTextFile("./version.txt");
  } catch {
    /*** ignore ***/
  }

  return version.trim();
}

export const errorMessage = `







Document: HTTP 404                                                 ERROR
                                                                    20XX

                               Not Found

Body

   Not sure what you were looking for but, it’s not here. Welp. Maybe
   try the main page[1]?

References

   [1] <https://blog.webb.page>

`;
