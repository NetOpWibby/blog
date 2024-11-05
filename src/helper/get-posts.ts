


//// util

import { postDirectory } from "src/utility/constant.ts";



//// export

export default async() => {
  const posts: string[] = [];

  try {
    const files: Deno.DirEntry[] = [];

    for await (const dirEntry of Deno.readDir(postDirectory)) {
      if (dirEntry.isFile)
        files.push(dirEntry);
    }

    /// Deno is weird in that if you do NOT call `.reverse()`
    /// it will NOT load everything in the directory…WTF?!

    files.sort((a, b) => a.name.localeCompare(b.name)).reverse();

    for (const file of files) {
      if (file.name.startsWith("."))
        return;

      if (file.name.endsWith(".txt"))
        posts.push(file.name);
    }
  } catch(error) {
    console.error("Error reading directory for posts:", error);
  } finally {
    // deno-lint-ignore no-unsafe-finally
    return posts;
  }
}
