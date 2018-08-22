"use strict";



//  P A C K A G E S

import fs from "fs-extra";
import glob from "glob";
import m from "markdown-it";
import root from "app-root-path";

const log = console.log; // eslint-disable-line
const markdown = m({ html: true });
const yaml = require(`${root}/server/modules/yaml-front-matter`);



//  P R O G R A M

module.exports = exports = (req, res) => {

  fs.readFile(`./_posts/${req.params.year}/${req.params.page}.md`, "utf8", (err, data) => {
    if (err) res.redirect("/");

    const imagesURL = `/images/${req.params.year}/${req.params.page}`;
    const postURL = `/thoughts/${req.params.year}/${req.params.page}`;

    let postDate = "";
    let postTags = "";
    let postTagsFormatted = "";
    let postTitle = "";
    let postTLDR = "";
    let postColor = "";



    //  T I T L E
    const rTitle = /title:.*([\s\S])/g;
    let title = data.match(rTitle);

    for (let i = 0; i < title.length; i++) postTitle = title[i].split(":")[1].trim();



    //  T L D R
    const rTLDR = /tldr:.*([\s\S])/g;
    let tldr = data.match(rTLDR);

    for (let i = 0; i < tldr.length; i++) postTLDR = tldr[i].split(":")[1].trim();



    //  C O L O R
    const rColor = /color:.*([\s\S])/g;
    let color = data.match(rColor);

    for (let i = 0; i < color.length; i++) postColor = color[i].split(":")[1].trim();



    //  D A T E
    const rDate = /date:.*([\s\S])/g;
    let date = data.match(rDate);

    for (let i = 0; i < date.length; i++) postDate = date[i].split(":")[1].trim().replace(/-/g, "·").replace(/\"/g, "");



    //  T A G S
    const rTags = /tags:.*([\s\S])/g;
    let tags = data.match(rTags);

    for (let i = 0; i < tags.length; i++) postTags = tags[i].split(":")[1].trim().split(/[\s,]+/);

    postTags.forEach(tag => {
      postTagsFormatted += `<a href="/tags/${tag}" title="Tag archive for '${tag}'" class="article__header__tag">${tag.replace(/-/g, " ")}</a>`;
    });



    //  C O D E
    const rCode = /(```.+)\n[\s\S]+?```/g;
    let areThereCodeSnippets = 0;
    if (data.match(rCode)) areThereCodeSnippets++;



    //  I M A G E S
    const rFront = /---.*([\s\S]+)---/g;
    const rSingleImagePath = /!\[.*/g;
    const rMultiImagePath = /(!\[.+)(\S[^\S\r\n]*\n)((!\[.+)(!\[.+)?(\n))+/gm;
    const rImage = /🖼/g;

    let dataFormatted = data.replace(rFront, "").replace(rImage, imagesURL + "/");
    let singleImage = dataFormatted.match(rSingleImagePath);
    let multipleImages = dataFormatted.match(rMultiImagePath);

    if (multipleImages) {
      for (let i = 0; i < multipleImages.length; i++) {
        const format = [];
        let individualImageHTML = "";
        let set = multipleImages[i].split(`\n`);

        for (const individualImage of set) {
          let imageCaption, imagePath, image, srcPath, dstPath;

          if (individualImage.split("![")[1] !== undefined && individualImage.split("](")[1] !== undefined) {
            imageCaption = individualImage.split("![")[1].split("](")[0];
            imagePath = individualImage.split("](")[1].replace(/\)/g, "");
            image = imagePath.substring(imagePath.lastIndexOf("/") + 1);
            srcPath = `./_assets/${req.params.year}/${req.params.page}/${image}`;
            dstPath = `./public/images/${req.params.year}/${req.params.page}/${image}`;

            // image link has now been created, including the directory it is to be placed in
            fs.ensureLink(srcPath, dstPath, err => {
              if (err) log(`Error:\n${err}`); // => null
            });

            individualImageHTML = `
<figure class="article__content__slide">
  <img src="${imagePath}" alt="${imageCaption}"/>
  <figcaption>${imageCaption}</figcaption>
</figure>
            `;

            format.push(individualImageHTML);
          }
        }

        dataFormatted = dataFormatted.replace(multipleImages[i], slider(format.join("")));
      }
    }



    if (singleImage) {
      for (let i = 0; i < singleImage.length; i++) {
        const imagePath = singleImage[i].split("](")[1].replace(/\)/g, "");
        const imageCaption = singleImage[i].split("![")[1].split("](")[0];
        const image = imagePath.substring(imagePath.lastIndexOf("/") + 1);
        const srcpath = `./_assets/${req.params.year}/${req.params.page}/${image}`;
        const dstpath = `./public/images/${req.params.year}/${req.params.page}/${image}`;

        // image link has now been created, including the directory it is to be placed in
        fs.ensureLink(srcpath, dstpath, err => {
          if (err) log(`Error:\n${err}`); // => null
        });

        const figure = `
<figure class="article__content__image">
  <img src="${imagePath}" alt="${imageCaption}"/>
  <figcaption>${imageCaption}</figcaption>
</figure>
        `;

        dataFormatted = dataFormatted.replace(singleImage[i], figure);
      }
    }



    //  A U D I O
    const rAudio = /\(🎵.*/g;
    let audio = dataFormatted.match(rAudio);

    if (audio) {
      audio.forEach(a => {
        const audioLink = a.split("(🎵")[1].replace(/\)/g, "");
        const iframe = `<div class="article__content__audio"><iframe src="${audioLink}"></iframe></div>`;

        dataFormatted = dataFormatted.replace(a, iframe);
      });
    }



    /*
    // H E R O
    const heroSrc = `./_assets/${req.params.year}/${req.params.page}/hero.png`;
    const heroDst = `./public/images/${req.params.year}/${req.params.page}/hero.png`;

    fs.ensureLink(heroSrc, heroDst, err => {
      if (err) log(`Error:\n${err}`); // => null
      // link has now been created, including the directory it is to be placed in
    });
    */



    //  V I D E O
    const rVideos = /\(📼.*/g;
    let video = dataFormatted.match(rVideos);

    if (video) {
      video.forEach(v => {
        const videoLink = v.split("(📼")[1].replace(/\)/g, "");
        const iframe = `
<div class="article__content__video">
  <iframe src="${videoLink}" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>
</div>
        `;

        dataFormatted = dataFormatted.replace(v, iframe);
      });
    }



    //  E X C E R P T
    const excerpt = dataFormatted.replace(/\*/g, "").replace(/#/g, "").replace(/!\[.*/g, "").replace(/\].+?\)/g, "").replace(/\[/g, "").replace(/_/g, "").substring(0, 185).trim();



    //  R E L A T E D
    let relatedPosts = "";

    glob("./_posts/**/*.md", (err, files) => {
      if (err) log(`Error getting related posts:\n${err}`);

      const matches = [];
      let relatedTags = tags.toString().split(":")[1].trim().split(/[\s,]+/);
      let relatedTag;
      let relatedCount = 0;

      for (let i = 0; i < relatedTags.length; i++) relatedTag = relatedTags[i];

      for (const file of files) {
        const entry = yaml.loadFront(file);
        entry.url = "/thoughts/" + file.split(/.\/_posts\//g)[1].replace(/.md/g, "");

        if (entry.published === true) matches.push(entry);

        matches.sort((a, b) => {
          return new Date(b.date) - new Date(a.date); // Reverse sort
        });
      }

      for (const key in matches) { // TODO: Fix this shit
        const post = matches[key];

        if (post.title !== undefined) {
          const tags = post.tags.split(/[\s,]+/);

          if (
            ~tags.indexOf(relatedTag) &&
            post.title !== postTitle &&
            post.published !== false
          ) {
            relatedCount++;

            relatedPosts += `
<li class="related__post ${post.color}">
  <a href="${post.url}" itemprop="name headline" title="Read '${post.title}'">${post.title}</a>
</li>
            `;
          }
        }
      }



      if (areThereCodeSnippets > 0) dataFormatted += `<script src="/scripts/plugins/highlight.js"></script> <script>hljs.initHighlightingOnLoad();</script>`;

      res.render("pages/post", Object.assign({
        layout: "layouts/article",
        Content: markdown.render(dataFormatted),
        Excerpt: excerpt,
        PostTitle: postTitle,
        PostTLDR: postTLDR,
        PostURL: postURL,
        PostColor: postColor,
        PostDate: postDate,
        PostTags: postTagsFormatted,
        RelatedCount: relatedCount,
        RelatedPosts: relatedPosts
      }));
    });
  });



  function slider(content) {
    const rand = Math.floor(Math.random() * 25);

    const html = `
<div id="slider_${rand}" class="article__content__slides">
  <div class="article__content__slides-wrap">${content}</div>

  <a href="#" id="prev_${rand}" class="article__content__nav __prev">
  <a href="#" id="next_${rand}" class="article__content__nav __next">
</div>

<script>
  "use strict";

  const element_${rand} = document.getElementById("slider_${rand}");

  window.mySwipe_${rand} = new Swipe(element_${rand}, {
    startSlide: 0,
    auto: 0,
    draggable: false,
    autoRestart: false,
    continuous: true,
    disableScroll: true,
    stopPropagation: true,
    callback: function (index, element) {},
    transitionEnd: function (index, element) {}
  });

  $(".article__content__nav").on("click", function (e) {
    e.preventDefault();
  });

  $("#prev_${rand}").on("click", function () { mySwipe_${rand}.prev(); });
  $("#next_${rand}").on("click", function () { mySwipe_${rand}.next(); });
</script>
    `;

    return html;
  }

};
