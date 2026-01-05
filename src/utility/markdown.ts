


/*** EXPORT ------------------------------------------- ***/

export default (input: string): string => {
  const codeBlocks: { content: string; index: number; language: string; }[] = [];
  const codeBlockPattern = /```(\w*)[ \t]*\r?\n([\s\S]*?)\r?\n[ \t]*```/g;
  const inlineCode: string[] = [];
  const inlineCodePattern = /`([^`]+)`/g;
  const refPattern = /\s*\[(\w+)\]\s+<([^>]+)>$/gm;
  const refs = new Map<string, string>();

  /*** extract and replace code blocks with placeholders ***/
  let processed = input.replace(codeBlockPattern, (_match, language, content) => {
    const index = codeBlocks.length;

    codeBlocks.push({
      content: content.trimEnd(),
      index,
      language: language || ""
    });

    return `<!--CODE:BLOCK:${index}-->`;
  });

  /*** extract inline code ***/
  processed = processed.replace(inlineCodePattern, (_match, content) => {
    const index = inlineCode.length;
    inlineCode.push(content);
    return `<!--INLINE:CODE:${index}-->`;
  });

  /*** extract reference definitions (images/links) ***/
  for (const match of processed.matchAll(refPattern)) {
    const [, ref, url] = match;
    refs.set(ref, url);
  }

  /*** remove reference definitions before blockquote processing ***/
  processed = processed.replace(refPattern, "");

  /*** process blockquotes ***/
  processed = processBlockquotes(processed);

  processed = processed
    .replace(/(\n){6}/g, "")    /*** remove 6 lines from the top of the memo ***/
    .replace("References", "")  /*** remove reference to reference definitions from output ***/
    .replace(/(\*\*|__)(.*?)\1/g, `<strong style="white-space: nowrap;">$2</strong>`) /*** bold ***/
    .replace(/(\*|_)(.*?)\1/g, "<em>$2</em>")   /*** italic ***/
    .replace(/(\~\~)(.*?)\1/g, `<del>$2</del>`) /*** strikethrough ***/
    .replace(/'/g, "’")         /*** fancy apostrophe ***/
    .replace(/(:nbhyp:)/g, "‑") /*** non‑breaking hyphen ***/
    // deno-lint-ignore no-irregular-whitespace
    .replace(/(:nbsp:)/g, " ")  /*** non‑breaking space ***/
    .replace(/(\.\.\.)/g, "…")  /*** ellipsis ***/
    .replace(/---/g, "<hr/>")
    .replace(/📸\[([^\]]+)\]\[(\w+)\]/g, (match, alt, ref) => {
      const url = refs.get(ref);
      return url ? `<img src="${url}" alt="${alt}" loading="lazy">` : match;
    })
    .replace(/📼\[([^\]]+)\]\[(\w+)\]/g, (match, alt, ref) => {
      const url = refs.get(ref);
      return url ? `<iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen frameborder="0" referrerpolicy="strict-origin-when-cross-origin" src="${url}" title="${alt}"></iframe>` : match;
    })
    .replace(/\[(\w+)\](?!\s+<|\()/g, (match, ref) => {
      const url = refs.get(ref);
      const isExternal = url && url.startsWith("http://") || url && url.startsWith("https://");

      return url ?
        isExternal ?
          `<a href="${url}?ref=blog.webb.page" target="_blank">[${ref}]</a>` :
          `<a href="${url}">[${ref}]</a>` :
        match;
    })
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, text, url) => {
      const isExternal = url.startsWith("http://") || url.startsWith("https://");

      return isExternal ?
        `<a href="${url}?ref=blog.webb.page" target="_blank">${text}</a>` :
        `<a href="${url}">${text}</a>`;
    });

  /*** restore inline code ***/
  for (const block in inlineCode) {
    processed = processed.replace(`<!--INLINE:CODE:${block}-->`, `<code>${escapeHtml(inlineCode[block])}</code>`);
  }

  /*** restore code blocks ***/
  for (const block of codeBlocks) {
    const langAttr = block.language ? ` data-language="${block.language}"` : "";
    const html = `<pre><code${langAttr}>\n${escapeHtml(block.content)}\n\n</code></pre>`;

    processed = processed.replace(`<!--CODE:BLOCK:${block.index}-->`, html);
  }

  // console.log(processed); /*** for troubleshooting ***/

  return processed.trimEnd();
}

/*** HELPER ------------------------------------------- ***/

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function processBlockquotes(input: string): string {
  const lines = input.split("\n");
  const result: string[] = [];
  let quoteBuffer: string[] = [];

  const flushQuote = () => {
    if (quoteBuffer.length > 0) {
      /*** special indentation to fit memo/remark formatting ***/
      result.push(`<blockquote>\n   ${quoteBuffer.join("\n   ")}\n\n</blockquote>`);
      quoteBuffer = [];
      // TODO
      // : handle links within blockquotes (WM-032)
    }
  };

  for (const line of lines) {
    /*** preserve code block placeholders ***/
    if (line.includes("<!--CODE:BLOCK") || line.includes("<!--INLINE:CODE")) {
      flushQuote();
      result.push(line);
      continue;
    }

    const quoteMatch = line.match(/\s*>\s?(.*)$/);

    if (quoteMatch) {
      quoteBuffer.push(quoteMatch[1]);
    } else {
      flushQuote();
      result.push(line);
    }
  }

  flushQuote();
  return result.join("\n");
}
