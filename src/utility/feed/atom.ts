


//// util

import {
  BaseFeed,
  escapeXML,
  type FeedOptions
} from "./helper.ts";

interface AtomEntry {
  content?: {
    body: string;
    type?: string;
  };
  id: string;
  image?: string;
  link: string;
  summary: string;
  title: string;
  updated?: Date;
}



//// export

export class FeedAtom extends BaseFeed<AtomEntry> {
  constructor(options: FeedOptions) {
    super(options);
  }

  build(): string {
    const xmlParts: string[] = [
      `<?xml version="1.0" encoding="UTF-8"?>\n`,
      `<feed xmlns="http://www.w3.org/2005/Atom">\n`,
      `  <title>${escapeXML(this.options.title)}</title>\n`,
      `  <subtitle>${escapeXML(this.options.description)}</subtitle>\n`,
      `  <link rel="alternate" href="${escapeXML(this.options.link)}"/>\n`,
      `  <link rel="self" href="${escapeXML(this.options.link)}"/>\n`,
      `  <updated>${this.options.updated?.toISOString()}</updated>\n`,
      `  <generator>${this.options.generator || "the webb blog"}</generator>\n`,
      `  <id>${escapeXML(this.options.link)}</id>\n`
    ];

    for (const author of this.options.authors) {
      xmlParts.push(`  <author>\n`);

      if (author.name)
        xmlParts.push(`    <name>${escapeXML(author.name)}</name>\n`);

      if (author.email)
        xmlParts.push(`    <email>${escapeXML(author.email)}</email>\n`);

      if (author.link)
        xmlParts.push(`    <uri>${escapeXML(author.link)}</uri>\n`);

      xmlParts.push(`  </author>\n`);
    }

    if (this.options.icon) {
      xmlParts.push(`  <icon>${escapeXML(this.options.icon)}</icon>\n`);
      xmlParts.push(`  <logo>${escapeXML(this.options.icon)}</logo>\n`);
    }

    if (this.options.feed)
      xmlParts.push(`  <link rel="self" href="${escapeXML(this.options.feed)}"/>\n`);

    for (const entry of this.items) {
      xmlParts.push(
        `  <entry>\n`,
        `    <title type="html">${escapeXML(entry.title)}</title>\n`,
        `    <link href="${escapeXML(entry.link)}"/>\n`,
        `    <id>${escapeXML(entry.id)}</id>\n`,
        `    <updated>${entry.updated?.toISOString() || new Date().toISOString()}</updated>\n`,
        `    <summary type="html">${escapeXML(entry.summary)}</summary>\n`,
        `    <content type="${entry.content?.type || "html"}">${escapeXML(entry.content?.body || entry.summary)}</content>\n`,
        entry.image ?
          `    <media:thumbnail url="${escapeXML(entry.image)}" />\n` :
          "",
        `  </entry>\n`
      );
    }

    for (const category of this.categories) {
      xmlParts.push(`  <category term="${escapeXML(category)}"/>\n`);
    }

    xmlParts.push("</feed>");
    return xmlParts.join("");
  }
}
