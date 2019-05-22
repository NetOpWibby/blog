---
title:      Socii Dispatch 02
date:       2018-02-10
tags:       project
tldr:       Launching is hard
color:
published:  true
---

TL;DR: Socii's [alpha](https://hub.socii.network "Socii, the social network") is out in the wild and obviously _very_ rough around the edges. Let me tell you what I've learned since my last dispatch.



### GraphQL
Yours truly, [two weeks ago](/2018/socii-dispatch-01 "Socii Dispatch 01"):

> [GraphQL](http://graphql.org "Official website for GraphQL") is awesome. However, I've been building REST APIs for the past month and have two microservices to handle things thus far _and that means_ I'm not transitioning to GraphQL until maybe version 1 of Socii is solidified.

HAH. Mere _days_ after I published those words, I ran into an issue where I needed to display comments and for those comments to show pertinent info like:

- author's
  - name
  - username
  - avatar shape
  - avatar source

If I stuck with REST, here's what my query path would've looked like:

- query story service for original post (already have user info from earlier query)
- query story service for comments to the original post
  - for each comment, query user service for comment author's aforementioned info

This is way too much work to get four pieces of info for a comment. Keep in mind that I'd get the _entire_ user object with each query to the user service as well. Here's how I achieved this with GraphQL:

```javascript
const query = `{
  post(replyTo: "${postId}") {
    author
    content
    createdAt
    id
    favoritedBy
    notes {
      favorites
      replies
      reposts
    }
    repliedBy
    replyTo
    repostedBy
    slug
  }
}`;
```

Couple things to note here:

1. GraphQL pros will tell me to use variables instead of what I'm doing here with `postId` in a template literal but MEH.
2. The `author` parameter does a little extra stuff on my GraphQL service to reply back with name, username, and avatar info.
3. The post schema is quite large but I don't need all of it to display them. What you see in this query is what I get back. No wasted data, how neat is that?

This took me around three days to fully grok and to be quite honest, I am not really sure if I do. 😅 It works though!

There are _several_ articles and dissertations out there with a clickbait-y title bemoaning the demise of REST thanks to GraphQL and well...no. REST is battle-tested and still pretty damn good. In fact, I'm still using it for anything that isn't a `GET` request. When you're `POST`ing or `PUT`ing, I think REST reigns supreme and quite frankly, I don't feel like rewriting that code.

Let me have a year with ol' graphy before I do something crazy.



### WebP
[WebP](https://developers.google.com/speed/webp "Official website for WebP") is an image format invented by Google as an alternative to JPG and PNG for small (but visually comparable) images. I like the idea of paying almost nothing for image storage so my interest was piqued early in Socii's development.

The cost savings I've seen during testing have been massive. I had two folders named "raw" and "processed". After converting 10 or so large images (screenshots and the like), the "raw" folder was ~5MB while the "processed" folder was ~1MB. At scale, that's some impressive cost savings. The visual parity was indistinguishable to me as well.

Of course, Chrome is the only browser that natively [supports](https://caniuse.com/#search=webp "Support table for WebP") it. I found a polyfill that works for non-Chrome users (like myself, Firefox is best for me) and I thought it'd be usable in production. It is _not_.

I am now reversing my decision to use WebP exclusively and will optimize images uploaded to Socii. Decoding WebP in the browser is slow, even with the WebAssembly-converted polyfill and scrolling is horrendous. That's _terrible_ user experience. I found another image format called [FLIF](https://github.com/FLIF-hub/FLIF "Free Lossless Image Format on GitHub") but the current polyfills are also not production-ready.



### Things I've learned
1. Estimates are dumb because people are dumb. Even if you account for that, you'll still be off.
2. GraphQL is still awesome. I'm glad it took up my estimate time to learn it.
3. We need better image formats on the web and browser vendors need to get onboard.



That's all for now, see ya! 🕸
