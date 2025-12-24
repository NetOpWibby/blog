


/*** IMPORT ------------------------------------------- ***/

import { ATOM, JSON, RSS } from "src/utility/feed/index.ts";
import { join } from "dep/std.ts";

/*** UTILITY ------------------------------------------ ***/

import {
  author,
  description,
  email,
  feedDirectory,
  memoDirectory,
  title,
  url
} from "src/utility/constant.ts";

import { default as headerParser, type DocumentMeta } from "src/helper/parse-header.ts";

import getDocuments from "src/helper/get-documents.ts";
import populateDocument from "src/helper/populate-document.ts";

const atomFeed = new ATOM({
  authors: [
    {
      email,
      name: author
    }
  ],
  description,
  id: `${url}/feed/atom`,
  link: `${url}/feed/atom`,
  title,
  updated: undefined
});

const jsonFeed = new JSON({
  authors: [
    {
      email,
      name: author
    }
  ],
  description,
  feed: `${url}/feed/json`,
  link: url,
  title
});

const rssFeed = new RSS({
  authors: [
    {
      email,
      name: author
    }
  ],
  description,
  id: `${url}/feed/rss`,
  link: `${url}/feed/rss`,
  title
});

/*** PROGRAM ------------------------------------------ ***/

createFeeds();

async function createFeeds() {
  await Deno.mkdir(feedDirectory, { recursive: true });

  const feedPosts: DocumentMeta[] = [];
  const filenames = await getDocuments(memoDirectory);

  if (!filenames)
    return;

  for await (const filename of filenames) {
    const document = await populateDocument({ filename });
    const postInfo = headerParser(document);

    feedPosts.push(postInfo);

    if (document) {
      const fullUrl = `${url}/${filename.split(".txt")[0]}`;
      const postDate = new Date(new Date(postInfo.date).setHours(24, 0, 0, 0));

      atomFeed.addItem({
        content: { body: postInfo.abstract },
        id: fullUrl,
        link: fullUrl,
        summary: postInfo.abstract,
        title: postInfo.title,
        updated: postDate
      });

      jsonFeed.addItem({
        content_html: postInfo.abstract,
        date_published: postDate,
        id: fullUrl,
        title: postInfo.title,
        url: fullUrl
      });

      rssFeed.addItem({
        content: { body: postInfo.abstract },
        description: postInfo.abstract,
        id: fullUrl,
        link: fullUrl,
        title: postInfo.title,
        updated: postDate
      });
    }
  }

  // const latestPostDate = feedPosts[0].date;
  // atomFeed.updated = new Date(latestPostDate);
  // rssFeed.updated = new Date(latestPostDate);

  Deno.writeTextFileSync(join(feedDirectory, "index.xml"), atomFeed.build());
  Deno.writeTextFileSync(join(feedDirectory, "index.json"), jsonFeed.build());
  Deno.writeTextFileSync(join(feedDirectory, "index.rss"), rssFeed.build());

  console.log("Feeds written");
}
