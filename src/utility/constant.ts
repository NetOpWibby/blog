


//// import

import { join } from "dep/std.ts";

//// util

const baseDirectory = await Deno.realPath(".");
const isDevelopment = Deno.args.includes("development");



//// export

export const author = "Paul Anthony Webb";
export const description = "Welcome to Paul Anthony Webb's corner of the 'Net where he'll regale you with whatever he finds interesting.";
export const email = "paul+blog@webb.page";
export const environment = isDevelopment ? "development" : "production";
export const feedDirectory = join(baseDirectory, "feed");
export const port = Deno.env.has("PORT") ? Deno.env.get("PORT") : 3465;
export const postDirectory = join(baseDirectory, "document");
export const title = "the webb blog";
export const url = "https://blog.webb.page";

export async function getVersion() {
  let version = "";

  try {
    version = await Deno.readTextFile("./version.txt");
  } catch(_) {
    /// ignore
  }

  return version.trim();
}
