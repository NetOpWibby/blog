"use strict";



//  U T I L

import { homepage } from "./variables";



//  E X P O R T

export default postDetails => {
  return `
    <nav class="article__share">
      <a
        class="article__share-item email"
        href="mailto:?subject=${postDetails.title}&amp;body=Check out this article: ${homepage + postDetails.url}"
        title="Share “${postDetails.title}” via email"
      >Email</a>

      <a
        class="article__share-item buffer"
        href="http://bufferapp.com/add?text=${postDetails.title}&amp;url=${homepage + postDetails.url}"
        title="Share “${postDetails.title}” via Buffer"
      >Buffer</a>

      <a
        class="article__share-item hackernews"
        href="http://news.ycombinator.com/submitlink?u=${homepage + postDetails.url}&amp;t=${postDetails.title}"
        title="Share “${postDetails.title}” via Hacker News"
      >Hacker News</a>

      <a
        class="article__share-item linkedin"
        href="https://www.linkedin.com/shareArticle?mini=true&url=${homepage + postDetails.url}&title=${postDetails.title}&summary=${encodeURIComponent(postDetails.excerpt)}source=${homepage}"
        title="Share “${postDetails.title}” via LinkedIn"
      >LinkedIn</a>

      <a
        class="article__share-item pocket"
        href="https://getpocket.com/save?url=${homepage + postDetails.url}&amp;title${postDetails.title}"
        title="Share “${postDetails.title}” via Pocket"
      >Pocket</a>

      <a
        class="article__share-item reddit"
        href="http://www.reddit.com/submit?url=${homepage + postDetails.url}&amp;title=${postDetails.title}"
        title="Share “${postDetails.title}” via Reddit"
      >Reddit</a>

      <a
        class="article__share-item tumblr"
        href="https://www.tumblr.com/widgets/share/tool?canonicalUrl=${homepage + postDetails.url}&amp;title=${postDetails.title}&amp;caption=${encodeURIComponent(postDetails.excerpt)}"
        title="Share “${postDetails.title}” via tumblr"
      >tumblr</a>

      <a
        class="article__share-item twitter"
        href="https://twitter.com/intent/tweet?text=${postDetails.title}%20🕸&amp;url=${homepage + postDetails.url}"
        title="Share “${postDetails.title}” via Twitter"
      >Twitter</a>
    </nav>
  `;
};
