"use strict";



//  U T I L S

import { handleRoute } from "~util";
import feed from "./feed";
import root from "./root";
import page from "./page";

const defaultParams = {
  frameworkMethod: "get"
};



//  E X P O R T

export default server => {
  defaultParams.framework = server;

  handleRoute({
    ...defaultParams,
    path: "/",
    routeRules: root
  });

  handleRoute({
    ...defaultParams,
    path: "/feed/:feed",
    routeRules: feed
  });

  handleRoute({
    ...defaultParams,
    path: "/:year/:slug",
    routeRules: page
  });

  // 404 handler
  server.get("*", (requestObject, responseObject, next) => {
    responseObject.redirect(301, "/", next);
  });
};
