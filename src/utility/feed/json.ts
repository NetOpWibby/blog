


/*** UTILITY ------------------------------------------ ***/

import { BaseFeed, type FeedOptions } from "./helper.ts";

interface JsonItem {
  content_html?: string;
  date_published?: Date;
  id: string;
  title: string;
  url: string;
}

/*** EXPORT ------------------------------------------- ***/

export class FeedJSON extends BaseFeed<JsonItem> {
  constructor(options: FeedOptions) {
    super(options);
  }

  build(): string {
    const json: Record<string, unknown> = {
      feed_url: this.options.feed,
      home_page_url: this.options.link,
      icon: this.options.icon,
      items: this.items.map(({ content_html, date_published, id, title, url }) => ({
        ...(content_html && { content_html }),
        date_published: date_published?.toISOString() || new Date().toUTCString,
        id,
        title,
        url
      })),
      title: this.options.title,
      version: "https://jsonfeed.org/version/1"
    };

    return JSON.stringify(json, null, 2);
  }
}
