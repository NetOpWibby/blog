


/*** EXPORT ------------------------------------------- ***/

export default async(filePath: string) => {
  const fileExists = await Deno.stat(filePath);

  if (!fileExists)
    return "";

  const content = await Deno.readTextFile(filePath);
  return content;
}
