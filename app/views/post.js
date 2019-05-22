"use strict";



//  I M P O R T

import marked from "marked";

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
        <header class="inner-wrap">
          <h1>${metadata.title}</h1>
        </header>

        <section class="inner-wrap">
          ${marked(markdown)}
        </section>
      </main>
    `);
  });
};
