


//// util

import {
  BaseFeed,
  escapeXML,
  type FeedOptions
} from "./helper.ts";

interface RssItem {
  content: {
    body: string;
    type: string;
  };
  description: string;
  id: string;
  image?: string;
  link: string;
  title: string;
  updated?: Date;
}



//// export

export class FeedRSS extends BaseFeed<RssItem> {
  constructor(options: FeedOptions) {
    super(options);
  }

  build(): string {
    const xmlParts: string[] = [
      `<?xml version="1.0" encoding="UTF-8"?>\n`,
      `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:slash="http://purl.org/rss/1.0/modules/slash/" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/" xmlns:wfw="http://wellformedweb.org/CommentAPI/">\n`,
      `  <channel>\n`,
      `    <title><![CDATA[${escapeXML(this.options.title)}]]></title>\n`,
      `    <description><![CDATA[${escapeXML(this.options.description)}]]></description>\n`,
      `    <link>${escapeXML(this.options.link)}</link>\n`,
      `    <lastBuildDate>${this.options.updated?.toUTCString()}</lastBuildDate>\n`,
      `    <language>${this.options.language || "en-US"}</language>\n`,
      `    <generator>${escapeXML(this.options.generator || "the webb blog")}</generator>\n`,
      `    <atom:link href="${escapeXML(this.options.link)}" rel="self" type="application/rss+xml"/>\n`
    ];

    if (this.options.authors.length > 0) {
      const authorXml = this.options.authors.map((author) => {
        const escapedEmail = author.email ? escapeXML(author.email) : "";
        const escapedName = author.name ? escapeXML(author.name) : "";
        const emailPart = escapedEmail ? `${escapedEmail} ` : "";

        return (
          `    <webMaster>${emailPart}(${escapedName})</webMaster>\n` +
          `    <managingEditor>${emailPart}(${escapedName})</managingEditor>\n`
        );
      }).join("");

      xmlParts.push(authorXml);
    }

    if (this.items.length > 0) {
      const itemsXml = this.items.map((item) => {
        const contentXml = item.content ?
          `      <content:encoded><![CDATA[${escapeXML(item.content.body)}]]></content:encoded>\n` :
          "";

        const imageXml = item.image ?
          `      <media:thumbnail url="${escapeXML(item.image)}" />\n` :
          "";

        return (
          `    <item>\n` +
          `      <title>${escapeXML(item.title)}</title>\n` +
          `      <link>${escapeXML(item.link)}</link>\n` +
          `      <guid>${escapeXML(item.id)}</guid>\n` +
          `      <pubDate>${item.updated?.toUTCString() || new Date().toUTCString()}</pubDate>\n` +
          `      <description>${escapeXML(item.description)}</description>\n` +
          contentXml +
          imageXml +
          `    </item>\n`
        );
      }).join("");

      xmlParts.push(itemsXml);
    }

    xmlParts.push(`  </channel>\n`, `</rss>`);
    return xmlParts.join("");
  }
}
