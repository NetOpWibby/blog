


//// import

import { ATOM, JSON, RSS } from "dep/x/feed.ts";
import { join } from "dep/std.ts";
import { marked } from "dep/x/marked.ts";
import { yaml } from "dep/x/yaml.ts";

//// util

import {
  author,
  description,
  email,
  feedDirectory,
  postDirectory,
  title,
  url
} from "src/utility/constant.ts";

import getPosts from "src/helper/get-posts.ts";

const atomFeed = new ATOM({
  authors: [
    {
      email,
      name: author
    },
  ],
  description,
  id: `${url}/feed/atom`,
  link: `${url}/feed/atom`,
  title
});

const jsonFeed = new JSON({
  authors: [
    {
      email,
      name: author
    },
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
    },
  ],
  description,
  id: `${url}/feed/rss`,
  link: `${url}/feed/rss`,
  title
});



//// program

createFeeds();

async function createFeeds() {
  await Deno.mkdir(feedDirectory, { recursive: true });

  const feedPosts = [];
  const files = await getPosts();

  for await (const file of files) {
    const filePath = join(postDirectory, file);
    const postInfo = await yaml.loadFront(filePath);

    postInfo.url = `/${file}`;
    feedPosts.push(postInfo);

    const post = await yaml.loadBack(filePath);

    if (post) {
      const fullUrl = `${url}${postInfo.url}`;
      const postDate = new Date(postInfo.date);
      const renderedPost = marked.parse(post);

      atomFeed.addItem({
        content: {
          body: renderedPost,
          type: "html"
        },
        id: fullUrl,
        link: fullUrl,
        summary: postInfo.tldr,
        title: postInfo.title,
        updated: postDate
      });

      jsonFeed.addItem({
        content_html: renderedPost,
        date_published: postDate,
        id: fullUrl,
        title: postInfo.title,
        url: fullUrl
      });

      rssFeed.addItem({
        content: {
          body: renderedPost,
          type: "html"
        },
        description: postInfo.tldr,
        id: fullUrl,
        link: fullUrl,
        title: postInfo.title,
        updated: postDate
      });
    }
  }

  const latestPostDate = feedPosts[0].date;

  atomFeed.updated = new Date(latestPostDate);
  jsonFeed.updated = new Date(latestPostDate);
  rssFeed.updated = new Date(latestPostDate);

  Deno.writeTextFileSync(join(feedDirectory, "index.xml"), atomFeed.build());
  Deno.writeTextFileSync(join(feedDirectory, "index.json"), jsonFeed.build());
  Deno.writeTextFileSync(join(feedDirectory, "index.rss"), rssFeed.build());

  console.log("Feeds written");
}
