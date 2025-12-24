


/*** EXPORT ------------------------------------------- ***/

export interface DocumentMeta {
  abstract: string;
  category: string;
  date: string;
  document: string;
  title: string;
}

export default (input: string): DocumentMeta => {
  /*** NOTE
       This is extremely fragile, the source document must be formatted
       specifically. This is my blog so who cares? ***/

  const lines = input.split("\n");

  /*** extract document ID ***/
  const documentMatch = lines[1]?.match(/^Document:\s+(\S+)/);
  const document = documentMatch?.[1] ?? "";

  /*** extract category ***/
  const categoryMatch = lines[2]?.match(/^Category:\s+(\S+)/);
  const category = categoryMatch?.[1] ?? "";

  /*** extract date ***/
  const dateMatch = lines[2]?.match(/\d{4}.\d{2}.\d{2}/);
  const date = dateMatch?.[0] ?? "";

  /*** find title (first non-empty line after the header block) ***/
  let title = "";
  let titleIndex = -1;

  for (let i = 3; i < lines.length; i++) {
    const trimmed = lines[i].trim();

    if (trimmed && trimmed !== "Abstract") {
      title = trimmed;
      titleIndex = i;
      break;
    }
  }

  /*** extract abstract (content between "Abstract" and "Body") ***/
  let abstract = "";
  let inAbstract = false;

  for (let i = titleIndex + 1; i < lines.length; i++) {
    const trimmed = lines[i].trim();

    if (trimmed === "Abstract") {
      inAbstract = true;
      continue;
    }

    if (trimmed === "Body")
      break;

    if (inAbstract && trimmed)
      abstract += (abstract ? " " : "") + trimmed;
  }

  return {
    abstract,
    category,
    date,
    document,
    title
  };
}
