"use strict";



//  N A T I V E

import { createReadStream } from "fs";

//  I M P O R T

import cwd from "cwd";



//  E X P O R T

export default async(requestObject, requestResponse) => {
  const { feed } = requestObject.params;
  const feedDirectory = `${cwd()}/app/dist/feed/`;

  switch(feed) {
    case "index.atom":
      requestResponse.type("application/atom+xml").send(createReadStream(`${feedDirectory}index.atom`));
      return;

    case "index.json":
    default:
      requestResponse.type("application/json").send(createReadStream(`${feedDirectory}index.json`));
      return;

    // case "index.xml":
    // default:
    //   requestResponse.type("application/xml").send(createReadStream(`${feedDirectory}index.xml`));
    //   return;
  }
};
