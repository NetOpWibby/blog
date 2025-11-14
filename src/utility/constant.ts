


/*** IMPORT ------------------------------------------- ***/

import { join } from "dep/std.ts";

/*** UTILITY ------------------------------------------ ***/

const baseDirectory = await Deno.realPath(".");
const isDevelopment = Deno.args.includes("development");

/*** EXPORT ------------------------------------------- ***/

export const author = "Paul Anthony Webb";
export const description = "Welcome to Paul Anthony Webb's corner of the 'Net where he'll regale you with whatever he finds interesting.";
export const descriptionNotes = "Nifty notes and snippets I come across that aren't suitable for long-form posts.";
export const email = "paul+blog@webb.page";
export const environment = isDevelopment ? "development" : "production";
export const feedDirectory = join(baseDirectory, "feed");
export const notesDirectory = join(baseDirectory, "notes");
export const port = Deno.env.has("PORT") ? Deno.env.get("PORT") : 3465;
export const postDirectory = join(baseDirectory, "document");
export const title = "the webb blog";
export const titleNotes = "the webb blog &middot; notes";
export const url = "https://blog.webb.page";
export const urlNotes = "https://blog.webb.page/notes";

export async function getVersion() {
  let version = "";

  try {
    version = await Deno.readTextFile("./version.txt");
  } catch {
    /*** ignore ***/
  }

  return version.trim();
}
