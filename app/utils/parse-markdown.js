"use strict";



//  U T I L S

import yaml from "~module/yaml-front-matter";
import { frontmatterRegex } from "./variables";



//  E X P O R T

export default suppliedData => {
  return {
    markdown: suppliedData.replace(frontmatterRegex, "").trim(),
    metadata: yaml.loadFront(suppliedData)
  };
};
