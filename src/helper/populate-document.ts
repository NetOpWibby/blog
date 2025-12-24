


/*** UTILITY ------------------------------------------ ***/

import { memoDirectory, remarkDirectory, remarkRegex } from "src/utility/constant.ts";

import getFileContents from "src/helper/get-file-contents.ts";
import processMarkdown from "src/utility/markdown.ts";

/*** EXPORT ------------------------------------------- ***/

export default async(document: { filename: string; }): Promise<string> => {
  let isMemo = true;

  if (remarkRegex.test(document.filename))
    isMemo = false;

  const contents = await getFileContents(`${isMemo ? memoDirectory : remarkDirectory}/${document.filename}`);
  return processMarkdown(contents);
}
