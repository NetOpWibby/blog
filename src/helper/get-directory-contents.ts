


/*** EXPORT ------------------------------------------- ***/

export default async(directory: string): Promise<{ filename: string; }[]> => {
  const documentArray: { filename: string; }[] = [];

  try {
    const documents: Deno.DirEntry[] = [];

    for await (const dirEntry of Deno.readDir(directory)) {
      if (dirEntry.isFile)
        documents.push(dirEntry);
    }

    documents.sort((a, b) => a.name.localeCompare(b.name)).reverse();

    for (const document of documents) {
      if (document.name.startsWith("."))
        return [];

      if (document.name.endsWith(".txt")) {
        const data = { filename: document.name };
        documentArray.push(data);
      }
    }
  } catch(error) {
    console.error(`Error reading directory contents: ${String(error)}`);
  } finally {
    // deno-lint-ignore no-unsafe-finally
    return documentArray;
  }
}
