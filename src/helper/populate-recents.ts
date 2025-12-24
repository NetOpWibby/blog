


/*** UTILITY ------------------------------------------ ***/

import { remarkRegex } from "src/utility/constant.ts";

/*** EXPORT ------------------------------------------- ***/

export default (documentList: Array<{ filename: string; }>, currentDocument: string): string => {
  const currentIndex = documentList.findIndex(item => item.filename === currentDocument);
  let isMemo = true;
  let maximumIndex = documentList.length;
  let minimumIndex = 0;

  if (remarkRegex.test(currentDocument))
    isMemo = false;

  if (currentIndex < 7)
    minimumIndex = 0;
  else
    minimumIndex = currentIndex - 7;

  if (currentIndex < (maximumIndex - 8))
    maximumIndex = currentIndex + 8;

  const documents = documentList.slice(minimumIndex, maximumIndex).map((arrayItem: { filename: string; }) => {
    if (!arrayItem)
      return "";

    const { filename } = arrayItem;

    if (filename === currentDocument) {
      if (isMemo)
        return `<a class="current" href="/${filename.replace(".txt", "")}">${filename.replace(".txt", "")}</a>`;
      else
        return `<a class="current" href="/remarks/${filename.replace(".txt", "")}">${filename.replace(".txt", "")}</a>`;
    } else {
      if (isMemo)
        return `<a href="/${filename.replace(".txt", "")}">${filename.replace(".txt", "")}</a>`;
      else
        return `<a href="/remarks/${filename.replace(".txt", "")}">${filename.replace(".txt", "")}</a>`;
    }
  });

  return documents.join("");
}
