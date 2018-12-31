"use strict";



//  P A C K A G E S

import glob from "glob";
import html from "choo/html";
import raw from "choo/html/raw";
import { require as local } from "app-root-path";

//  U T I L

const yaml = local("/app/modules/yaml-front-matter");



//  E X P O R T

module.exports = exports = () => {
  return getPosts().then(response => html`
    <section class="cover">
      <nav class="cover__stories">
        <div class="inner-wrap">
          ${raw(response.coverStories)}
        </div>
      </nav>

      <figure class="cover__background">
        <img src="/assets/images/covers/05.jpg" alt="Cover for this issue of theWebb.blog"/>
      </figure>
    </section>

    <section class="foreward">
      <div class="inner-wrap">
        <aside class="foreward__note left">
          <h3>From the Editor</h3>

          <figure class="foreward__portrait">
            <img src="/assets/images/spaceman-fresh.jpg" alt="Me, riding a space Dragonair"/>
          </figure>

          <p>Welcome to the most fantabulous blog on the Internet! My name is Paul Anthony Webb, and I am a Boston-based front-end web <a href="https://dsgn.io" title="My portfolio">designer and developer</a> making awesome things (for awesome people).</p>

          <p>I am a proud lefty, Aries, and <a href="https://weom.space" title="My space-centric lifestyle brand, on hiatus">space bandit</a>. The only pencil I trust is a Ticonderoga. I was born on Easter Sunday, 1988 (not religious, but it’s an interesting anecdote). I used to be an "Army-brat". My parents despised video games while I was growing up, so I am making up for it now. <a href="https://thewibby.bandcamp.com" title="My music">I make music</a> under various aliases, the most used being "the Wibby" (followed by FRSH&times;BTS and Spaceman Fresh). MUJI is life and Uniqlo is dope af.</p>

          <p>I created this blog because there were many things I wanted to write about, but the content didn't make sense on <a href="https://2016.dsgn.io/thoughts" title="My old blog">my only blog at the time</a>. At the same time, the <code>.blog</code> TLD was announced and the timing was perfect to start something new.</p>

          <p>Every day brings about new opportunities, inspiration, and kick-ass "whoah" moments. Spread the love and do your part by inspiring others as you've been inspired!</p>

          <p><strong>(づ｡◕‿‿◕｡)づ</strong> That's what I try to do anyway.</p>

          <hr/>

          <p>My <del>girlfriend</del> <del>fiancé</del> wife has a blog that she updates semi-regularly. If you, or someone you know, likes to read about mom life and/or creating crafts with Cricuts/sewing/vinyl, <a href="http://sincerelyshantelle.com" title="Lakeisha Shantelle's blog">check her out</a>!</p>

          <hr/>

          <p>The quickest way to contact me is usually Socii <a href="https://hub.socii.network/NetOpWibby" title="&there4;&thinsp;NetOpWibby on Socii">@NetOpWibby</a> (or Twitter at the same name). This blog also has a Socii and it's <a href="https://hub.socii.network/wbbblg" title="&there4;&thinsp;wbbblg on Socii">@wbbblg</a>. I commssioned the awesome piece of art at the beginning of this foreward from <a href="https://www.instagram.com/p/BWIHVbCA5Hg" title="Holly Sullo on Instagram">Holly Sullo</a>.</p>

          <figure class="foreward__signature">
            <img src="/assets/images/signature.png" alt="Signature of the most fantabulous Paul Anthony Webb"/>
          </figure>
        </aside>

        <ul class="foreward__toc right">
          <li class="foreward__toc-item">Contents</li>
          ${raw(response.tableOfContents)}
        </ul>
      </div>
    </section>
  `);
};



//  H E L P E R

function getPosts() {
  const matches = [];

  let coverStories;
  let toc = "";
  let coverHTML = "";

  return new Promise(resolve => glob("./documents/posts/**/*.md", (err, files) => {
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

    coverStories = matches.slice(0, 3);

    for (const key in coverStories) {
      const post = matches[key];

      if (
        post.title !== undefined &&
        post.published !== false
      ) {
        coverHTML += `<a class="cover__story" href="${post.url}" itemprop="name headline" title="${post.title} on theWebb.blog">${post.title}</a>`;
      }
    }

    for (const key in matches) {
      const post = matches[key];

      if (
        post.title !== undefined &&
        post.published !== false
      ) {
        toc += `
<li class="foreward__toc-item">
  <a href="${post.url}" itemprop="name headline" title="Read '${post.title}'">
    ${post.title}
    <span>${post.tldr}</span>
  </a>
</li>
        `;
      }
    }

    resolve({
      coverStories: coverHTML,
      tableOfContents: toc
    });
  }));
}
