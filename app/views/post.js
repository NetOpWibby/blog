"use strict";



//  I M P O R T S

import marked from "marked";
import relativeDate from "tiny-relative-date";

//  U T I L S

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

    resolve(`
      <main>
        <section
          class="wrapper-scroll--post"
          id="wrapper"
        >
          <div class="test">
            <h2>${metadata.title}</h2>
            <time datetime="${metadata.date}">${relativeDate(metadata.date)}</time>
            ${marked(markdown)}
          </div>
        </section>
      </main>
    `);
  });
};
