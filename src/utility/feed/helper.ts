


//// export

export interface FeedOptions {
  authors: Array<{
    name: string;
    email?: string;
    link?: string;
  }>;
  copyright?: string;
  description: string;
  feed?: string;
  feedLinks?: {
    atom?: string;
  };
  generator?: string;
  icon?: string;
  id?: string;
  language?: string;
  link: string;
  title: string;
  updated?: Date;
}

export function escapeXML(unsafe: string): string {
  const escapeMap: { [key: string]: string } = {
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    '"': "&quot;"
  };

  return unsafe.replace(/[<>&'"]/g, (c) => escapeMap[c] || c);
}

export abstract class BaseFeed<T> {
  protected categories: Set<string>;
  protected items: Array<T>;
  protected options: FeedOptions;

  constructor(options: FeedOptions) {
    this.categories = new Set();
    this.items = [];

    this.options = {
      ...options,
      updated: options.updated || new Date()
    };
  }

  abstract build(): string;

  addCategory(category: string) {
    this.categories.add(category);
  }

  addContributor(contributor: { name: string; email: string; link?: string }) {
    this.options.authors.push(contributor);
  }

  addItem(item: T) {
    this.items.push(item);
  }
}
