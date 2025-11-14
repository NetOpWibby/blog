


/*** IMPORT ------------------------------------------- ***/

import { join } from "dep/std.ts";

/*** UTILITY ------------------------------------------ ***/

import prettyBytes from "src/utility/pretty-bytes.ts";

/*** EXPORT ------------------------------------------- ***/

export default async(directory: string) => {
  const posts: { file: string; size: string; }[] = [];

  try {
    const files: Deno.DirEntry[] = [];

    for await (const dirEntry of Deno.readDir(directory)) {
      if (dirEntry.isFile)
        files.push(dirEntry);
    }

    files.sort((a, b) => a.name.localeCompare(b.name)).reverse();

    for (const file of files) {
      if (file.name.startsWith("."))
        return;

      if (file.name.endsWith(".txt")) {
        const filePath = join(directory, file.name);
        const { size } = await Deno.stat(filePath);
        const data = { file: file.name, size: prettyBytes(size) };

        posts.push(data);
      }
    }
  } catch(error) {
    console.error(`Error reading directory contents: ${String(error)}`);
  } finally {
    // deno-lint-ignore no-unsafe-finally
    return posts;
  }
}
