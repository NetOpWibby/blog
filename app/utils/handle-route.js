"use strict";



//  E X P O R T

export default async({ framework, frameworkMethod, path, routeRules }) => {
  framework[frameworkMethod](path, (requestObject, responseObject) => {
    responseObject.type("text/html; charset=utf-8");

    if (routeRules)
      routeRules(requestObject, responseObject);
  });
};
