


/*** EXPORT ------------------------------------------- ***/

export default async(filePath: string) => {
  const fileExists = await Deno.readFile(filePath);

  if (!fileExists)
    return "";

  return fileExists;
}
