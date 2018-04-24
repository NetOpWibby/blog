"use strict";



//  P A C K A G E S

import fs from "fs";
import jsYaml from "js-yaml";



//  P R O G R A M

jsYaml.parse = function (text, name) {
  name = name || "__content";

  const re = /^(-{3}(?:\n|\r)([\w\W]+?)(?:\n|\r)-{3})?([\w\W]*)*/;
  const results = re.exec(text);

  let conf, yamlOrJson;

  if ((yamlOrJson = results[2])) { // TODO: Fix this (?)
    if (yamlOrJson.charAt(0) === "{") conf = JSON.parse(yamlOrJson);
    else conf = jsYaml.load(yamlOrJson);
  }

  conf[name] = results[3] ? results[3] : "";
  return conf;
};

jsYaml.loadFront = function (context, name) {
  let contents;

  if (fs.existsSync(context)) {
    contents = fs.readFileSync(context, "utf8");
    if (contents instanceof Error) return contents;

    return jsYaml.parse(contents, name);
  } else if (Buffer.isBuffer(context)) {
    return jsYaml.parse(context.toString(), name);
  } else {
    return jsYaml.parse(context, name);
  }
};



//  E X P O R T

module.exports = jsYaml;
