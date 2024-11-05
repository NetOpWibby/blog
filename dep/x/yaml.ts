


//// import

import { default as jsYaml } from "npm:js-yaml@4.1.0";

//// util

const regexTitle = /title:.*/g;
const regexYaml = /^(-{3}(?:\n|\r)([\w\W]+?)(?:\n|\r)-{3})/;



//// export

export const yaml = jsYaml;



//// helper

yaml.parse = (text: string) => {
  const results = text.match(regexYaml);
  let conf;
  let yamlOrJson;

  yamlOrJson = results ? results[2] : "";

  const titleData = yamlOrJson.match(regexTitle)![0];
  const title = titleData.split(/title:/)[1];

  /// escape ":" in titles
  yamlOrJson = yamlOrJson.replace(titleData, `title: ${title.replace(":", "&#58;")}`);

  switch(true) {
    case !yamlOrJson:
      return;

    case yamlOrJson.charAt(0) === "{":
      conf = JSON.parse(yamlOrJson);
      break;

    default:
      conf = yaml.load(yamlOrJson);
      break;
  }

  return conf;
};

yaml.loadBack = async(filePath: string) => {
  if (!filePath)
    return "";

  const fileExists = await Deno.stat(filePath);

  if (fileExists) {
    const contents = await Deno.readTextFile(filePath);
    const frontmatter = contents.match(regexYaml)[0];

    if (contents)
      return(contents.replace(frontmatter, "").trim());
  }
};

yaml.loadFront = async(filePath: string) => {
  if (!filePath)
    return "";

  const fileExists = await Deno.stat(filePath);

  if (fileExists && fileExists.isFile) {
    const contents = await Deno.readTextFile(filePath);
    return yaml.parse(contents);
  }

  return "";
};
