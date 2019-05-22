"use strict";



//  I M P O R T

import glob from "glob";

//  U T I L S

import {
  defaultMetadata,
  docsPath,
  homepage,
  readMarkdownFile,
  renderPage
} from "~util";

import postPage from "~view/post";



//  E X P O R T

export default async(requestObject, requestResponse) => {
  const { slug, year } = requestObject.params;

  if (!slug || !year)
    return requestResponse.redirect("/");

  return getPost(year, slug).then(async(result) => {
    if (!result)
      return;

    const customHeadContent = [];
    const [renderedPage] = await Promise.all([postPage(result)]);

    customHeadContent.push({
      description: result.metadata.tldr,
      title: defaultMetadata.title + defaultMetadata.separator + result.metadata.title,
      url: homepage + result.metadata.url
    });

    return renderPage({
      requestObject,
      requestResponse,
      headContent: customHeadContent,
      bodyContent: renderedPage
    });
  });
};



//  H E L P E R

function getPost(yearOfPublication, publicationUrl) {
  const filenameRegex = new RegExp(`^.*(${yearOfPublication}-\\d{2}-\\d{2}-)(${publicationUrl}\\.md)$`, "g");

  return new Promise(resolve => glob(`${docsPath}/*.md`, (err, files) => {
    if (err)
      resolve("");

    let match = "";

    files.forEach(file => {
      if (file.trim().match(filenameRegex))
        match = file;
    });

    if (!match.length > 0)
      resolve("");

    resolve(readMarkdownFile(match));
  }));
}
