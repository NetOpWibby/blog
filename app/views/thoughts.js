"use strict";



//  P A C K A G E S

import dedent from "dedent";
import fs from "fs-extra";
import glob from "glob";
import html from "choo/html";
import marked from "marked";
import raw from "choo/html/raw";
import { require as local } from "app-root-path";

//  U T I L S

const date = local("/app/modules/relative-date");
const digitSlugRegex = /^(\d)*$/g;
const lexer = new marked.Lexer();
const yaml = local("/app/modules/yaml-front-matter");
let newLexer = lexer.rules;

// this removes the automatic creation of code snippets via spacing
// and it is highly unlikely 40 spaces would occur in a post
newLexer.code = /^( {40}[^\n]+\n*)+/;
lexer.rules = newLexer;

marked.setOptions({
  breaks: true,
  gfm: true,
  // highlight: code => require("highlight.js").highlightAuto(code).value,
  pedantic: false,
  renderer: new marked.Renderer(),
  sanitize: false,
  smartLists: true,
  smartypants: false,
  tables: true,
  xhtml: true
});



//  E X P O R T

module.exports = exports = (state, emit) =>
  pageGenerator(state, emit).then(response => response); // eslint-disable-line



//  H E L P E R S

function createShareLinks(postDetails) {
  return `
    <nav class="article__share">
      <a
        class="article__share-item email"
        href="mailto:?subject=${postDetails.title}&amp;body=Check out this article: https://thewebb.blog${postDetails.url}"
        title="Share “${postDetails.title}” via email"
      >Email</a>

      <a
        class="article__share-item buffer"
        href="http://bufferapp.com/add?text=${postDetails.title}&amp;url=https://thewebb.blog${postDetails.url}"
        title="Share “${postDetails.title}” via Buffer"
      >Buffer</a>

      <a
        class="article__share-item hackernews"
        href="http://news.ycombinator.com/submitlink?u=https://thewebb.blog${postDetails.url}&amp;t=${postDetails.title}"
        title="Share “${postDetails.title}” via Hacker News"
      >Hacker News</a>

      <a
        class="article__share-item linkedin"
        href="https://www.linkedin.com/shareArticle?mini=true&url=https://thewebb.blog${postDetails.url}&title=${postDetails.title}&summary=${encodeURIComponent(postDetails.excerpt)}source=https://thewebb.blog"
        title="Share “${postDetails.title}” via LinkedIn"
      >LinkedIn</a>

      <a
        class="article__share-item pocket"
        href="https://getpocket.com/save?url=https://thewebb.blog${postDetails.url}&amp;title${postDetails.title}"
        title="Share “${postDetails.title}” via Pocket"
      >Pocket</a>

      <a
        class="article__share-item reddit"
        href="http://www.reddit.com/submit?url=https://thewebb.blog${postDetails.url}&amp;title=${postDetails.title}"
        title="Share “${postDetails.title}” via Reddit"
      >Reddit</a>

      <a
        class="article__share-item tumblr"
        href="https://www.tumblr.com/widgets/share/tool?canonicalUrl=https://thewebb.blog${postDetails.url}&amp;title=${postDetails.title}&amp;caption=${encodeURIComponent(postDetails.excerpt)}"
        title="Share “${postDetails.title}” via tumblr"
      >tumblr</a>

      <a
        class="article__share-item twitter"
        href="https://twitter.com/intent/tweet?text=${postDetails.title}%20🕸&amp;url=https://thewebb.blog${postDetails.url}"
        title="Share “${postDetails.title}” via Twitter"
      >Twitter</a>
    </nav>
  `;
}

function getArchive(state) {
  const matches = [];
  let posts = "";
  let wildcard = "**";

  state.pageClass = "archive";
  if (state.params.wildcard) wildcard = state.params.wildcard;

  return new Promise(resolve => glob(`./documents/posts/${wildcard}/*.md`, (err, files) => {
    // if (err) log(err); // TODO

    for (const file of files) {
      const entry = yaml.loadFront(file);

      entry.date = entry.date.toString();
      entry.url = "/thoughts/" + file.split(/.\/posts\//g)[1].replace(/.md/g, "");

      if (entry.published === true) matches.push(entry);

      matches.sort((a, b) => {
        return new Date(b.date) - new Date(a.date); // Reverse sort
      });
    }

    posts += "<ul class=\"archive__list\">";
    for (const key in matches) {
      if (matches[key].title !== undefined) {
        posts += html`
          <li class="archive__list-item" itemprop="name headline">
            <a href="${matches[key].url}" itemprop="url">${matches[key].title}</a>
          </li>
        `;
      }
    }
    posts += "</ul>";

    resolve(pageTemplateArchive(`Archive/${wildcard.length === 2 ? "Posts" : wildcard}`, posts));
  }));
}

function getPost(state, emit) {
  const wildcard = state.params.wildcard;

  const rCode = /(```.+)\n[\s\S]+?```/g;

  const rFront = /---.*([\s\S]+)---/g;
  const rSingleImagePath = /!\[.*/g;
  const rMultiImagePath = /(!\[.+)(\S[^\S\r\n]*\n)((!\[.+)(!\[.+)?(\n))+/gm;
  const rImage = /🖼/g;

  const rAudio = /\(🎵.*/g;
  const rVideos = /\(📼.*/g;

  let areThereCodeSnippets = 0;
  let postTagsFormatted = "";

  return new Promise(resolve => fs.readFile(`./documents/posts/${wildcard}.md`, "utf8", (err, data) => {
    if (err) {
      state.pageClass = "error";
      return resolve(local("app/views/nope")(state, emit));
    }

    state.pageClass = "article";

    const imagesURL = `/images/${wildcard}`;
    const metadata = yaml.loadFront(data);
    const postURL = `/thoughts/${wildcard}`;

    state.pageTitle = metadata.title;



    //  T A G S
    if (metadata.tags) {
      for (const tag of metadata.tags.split(/[\s,]+/)) {
        postTagsFormatted += html`
          <a
            class="article__tag"
            href="/tags/${tag}"
            title="Tag archive for '${tag}'"
          >
            ${tag.replace(/-/g, " ")}
          </a>
        `;
      }
    }



    //  C O D E
    if (data.match(rCode)) areThereCodeSnippets++;



    //  I M A G E S
    let dataFormatted = data.replace(rFront, "").replace(rImage, imagesURL + "/");
    let singleImage = dataFormatted.match(rSingleImagePath);
    let multipleImages = dataFormatted.match(rMultiImagePath);

    if (multipleImages) {
      for (let i = 0; i < multipleImages.length; i++) {
        const format = [];
        let individualImageHTML = "";
        let set = multipleImages[i].split("\n");

        for (const individualImage of set) {
          let dstPath, image, imageCaption, imagePath, srcPath;

          if (
            individualImage.split("![")[1] !== undefined &&
            individualImage.split("](")[1] !== undefined
          ) {
            imageCaption = individualImage.split("![")[1].split("](")[0];
            imagePath = individualImage.split("](")[1].replace(/\)/g, "");
            image = imagePath.substring(imagePath.lastIndexOf("/") + 1);

            dstPath = `./app/dist/images/${wildcard}/${image}`;
            srcPath = `./documents/assets/${wildcard}/${image}`;

            // image link has now been created, including the directory it is to be placed in
            fs.ensureLink(srcPath, dstPath, linkCreationError => {
              if (linkCreationError) return;
            });

            individualImageHTML = dedent`
              <figure class="article__slide">
                <img alt="${imageCaption}" src="/assets${imagePath}"/>
                <figcaption>${imageCaption}</figcaption>
              </figure>
            `;

            format.push(individualImageHTML);
          }
        }

        dataFormatted =
          dataFormatted.replace(
            multipleImages[i],
            slider(format.join(""))
          );
      }
    }



    if (singleImage) {
      for (let i = 0; i < singleImage.length; i++) {
        const imagePath = singleImage[i].split("](")[1].replace(/\)/g, "");
        const imageCaption = singleImage[i].split("![")[1].split("](")[0];
        const image = imagePath.substring(imagePath.lastIndexOf("/") + 1);

        const dstpath = `./app/dist/images/${wildcard}/${image}`;
        const srcpath = `./documents/assets/${wildcard}/${image}`;

        // image link has now been created, including the directory it is to be placed in
        fs.ensureLink(srcpath, dstpath, linkCreationError => {
          if (linkCreationError) return;
        });

        const figure = dedent`
          <figure class="article__image">
            <img alt="${imageCaption}" src="/assets${imagePath}"/>
            <figcaption>${imageCaption}</figcaption>
          </figure>
        `;

        dataFormatted = dataFormatted.replace(singleImage[i], figure);
      }
    }



    //  A U D I O
    let audio = dataFormatted.match(rAudio);

    if (audio) {
      audio.forEach(a => {
        const audioLink = a.split("(🎵")[1].replace(/\)/g, "");

        const iframe = html`
          <div class="article__audio">
            <iframe src="${audioLink}"></iframe>
          </div>
        `;

        dataFormatted = dataFormatted.replace(a, iframe);
      });
    }



    /*
    // H E R O
    const heroSrc = `./_assets/${params}/${params}/hero.png`;
    const heroDst = `./public/images/${params}/${params}/hero.png`;

    fs.ensureLink(heroSrc, heroDst, err => {
      if (err) log(`Error:\n${err}`); // => null
      // link has now been created, including the directory it is to be placed in
    });
    */



    //  V I D E O
    let video = dataFormatted.match(rVideos);

    if (video) {
      video.forEach(v => {
        const videoLink = v.split("(📼")[1].replace(/\)/g, "");

        const iframe = html`
          <div class="article__video">
            <iframe allowfullscreen mozallowfullscreen src="/assets${videoLink}" webkitallowfullscreen></iframe>
          </div>
        `;

        dataFormatted = dataFormatted.replace(v, iframe);
      });
    }



    //  E X C E R P T
    const excerpt =
      dataFormatted
        .replace(/\*/g, "")
        .replace(/#/g, "")
        .replace(/!\[.*/g, "")
        .replace(/\].+?\)/g, "")
        .replace(/\[/g, "")
        .replace(/_/g, "")
        .substring(0, 185)
        .trim() + "...";



    //  R E L A T E D
    let relatedPosts = "";

    return glob("./documents/posts/**/*.md", (err, files) => {
      // if (err) log(`Error getting related posts:\n${err}`);

      const matches = [];
      let relatedTags;
      let relatedTag;
      let relatedCount = 0;

      if (metadata.tags) {
        relatedTags = metadata.tags.split(/[\s,]+/);

        for (const tag of relatedTags)
          relatedTag = tag;
      }

      for (const file of files) {
        const entry = yaml.loadFront(file);

        entry.url = "/thoughts/" + file.split(/.\/posts\//g)[1].replace(/.md/g, "");

        if (entry.published === true) matches.push(entry);

        matches.sort((a, b) => {
          return new Date(b.date) - new Date(a.date); // Reverse sort
        });
      }

      for (const key in matches) { // TODO: Fix this shit
        const post = matches[key];

        if (post.title !== undefined && post.tags) {
          const tags = post.tags.split(/[\s,]+/);

          if (
            ~tags.indexOf(relatedTag) > -1 &&
            post.title !== metadata.title &&
            post.published !== false
          ) {
            relatedCount++;

            relatedPosts += html`
              <li class="related__post ${post.color}">
                <a href="${post.url}" itemprop="name headline" title="Read '${post.title}'">${post.title}</a>
              </li>
            `;
          }
        }
      }



      if (areThereCodeSnippets > 0) dataFormatted +=
        "<script src=\"/assets/scripts/plugins/highlight.js\"></script> <script>hljs.initHighlightingOnLoad();</script>";

      resolve(pageTemplatePost({
        color: metadata.color, // dynamic colors! hmm, Sass function...palx
        // content: raw(markdown.render(dataFormatted)),
        content: marked(dataFormatted),
        date: date(metadata.date),
        excerpt: excerpt,
        related: relatedPosts,
        relatedCount: relatedCount,
        relatedPosts: relatedPosts,
        tags: postTagsFormatted,
        title: metadata.title,
        tldr: metadata.tldr,
        url: postURL
      }));
    });
  }));
}

function pageGenerator(state) {
  const wildcard = state.params.wildcard;

  switch(true) {
    case (wildcard && wildcard.length === 4 && wildcard.match(digitSlugRegex).length > 0):
      return getArchive(state);

    case (wildcard && wildcard.length > 4):
      return getPost(state);

    default:
      return getArchive(state);
  }
}

function pageTemplateArchive(title, content) {
  return html`
    <section class="inner-wrap">
      <h2 class="archive__heading">Index</h2>
      <h3 class="archive__subheading">${title}</h3>

      ${raw(content)}
    </section>
  `;
}

function pageTemplatePost(postDetails) {
  let showRelatedPosts = "";

  if (postDetails.relatedPosts.length) {
    showRelatedPosts += html`
      <div class="related-wrap">
        <h6>Related Posts</h6>

        <ul class="related">
          ${raw(postDetails.relatedPosts)}
        </ul>
      </div>
    `;
  } else {
    showRelatedPosts += html`
      <div style="height: 0; margin-bottom: 50px;" class="no-safari">&nbsp;</div>
    `;
  }

  return html`
    <article class="article ${postDetails.color ? ("theme-" + postDetails.color) : ""}" itemscope itemtype="http://schema.org/BlogPosting">
      <header class="article__header">
        <div class="article__header-wrap">
          <div class="inner-wrap">
            <small class="article__tags">${raw(postDetails.tags)}</small>

            <h2 class="article__title" itemprop="name headline">
              <a href="${postDetails.url}" itemprop="url">${postDetails.title}</a>
            </h2>

            <time class="article__date" datetime="${postDetails.date}" class="post-block_date" itemprop="datePublished">${postDetails.date}</time>
          </div>
        </div>

        <figure class="article__hero">
          <!--/ <img src="${postDetails.hero}" alt="Lead image for '${postDetails.title}'"/> /-->
        </figure>
      </header>

      <section class="article__content" itemprop="articleBody">
        <p class="article__tldr inner-wrap">${raw(postDetails.tldr)}</p>

        <div class="inner-wrap">
          ${raw(postDetails.content)}
        </div>
      </section>

      <footer class="article__footer">
        ${raw(createShareLinks(postDetails))}
      </footer>
    </article>

    ${raw(showRelatedPosts)}
  `;
}

function slider(content) {
  const rand = Math.floor(Math.random() * 25);

  return dedent`
    <div id="slider_${rand}" class="article__slides">
      <div class="article__slides-wrap">${content}</div>
      <a class="article__nav prev" href="#" id="prev_${rand}">Prev</a>
      <a class="article__nav next" href="#" id="next_${rand}">Next</a>
    </div>

    <script>
      "use strict";

      const element_${rand} = document.getElementById("slider_${rand}");

      window.mySwipe_${rand} = new Swipe(element_${rand}, {
        auto: 0,
        autoRestart: false,
        callback: (index, element) => {},
        continuous: true,
        disableScroll: true,
        draggable: false,
        startSlide: 0,
        stopPropagation: true,
        transitionEnd: (index, element) => {}
      });

      $(".article__nav").on("click", e => e.preventDefault());

      $("#prev_${rand}").on("click", () => mySwipe_${rand}.prev());
      $("#next_${rand}").on("click", () => mySwipe_${rand}.next());
    </script>
  `;
}
