"use strict";



//  U T I L S

import { renderPage } from "~util";
import landing from "~view/home";



//  E X P O R T

export default async(requestObject, requestResponse) => {
  const customHeadContent = [];

  return renderPage({
    requestObject,
    requestResponse,
    headContent: customHeadContent,
    bodyContent: landing
  });
};
