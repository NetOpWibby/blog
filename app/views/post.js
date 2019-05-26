"use strict";



//  I M P O R T S

import marked from "marked";
import relativeDate from "tiny-relative-date";

//  U T I L S

import getReadTime from "~module/estimated-read-time";
import { markedOptions } from "~util";

marked.setOptions({
  ...markedOptions,
  renderer: new marked.Renderer()
});



//  E X P O R T

export default suppliedData => {
  return new Promise(resolve => {
    const {
      markdown,
      metadata
    } = suppliedData;

    if (!markdown || !metadata)
      return resolve("");

    const estimatedReadingTime = getReadTime.text(markdown);

    // const tags = metadata.tags.split(/[\s,]+/);
    // shareLinks(metadata)

    resolve(`
      <main>
        <section
          class="wrapper-scroll--post"
          id="wrapper"
        >
          <post data-color="${metadata.color}">
            <h2>${metadata.title}</h2>
            <post-metadata>
              <time datetime="${metadata.date}">${relativeDate(metadata.date)}</time>
              ${Math.floor(estimatedReadingTime.seconds / 60)} minute read
            </post-metadata>
            ${marked(markdown)}
          </post>
        </section>
      </main>
    `);
  });
};
