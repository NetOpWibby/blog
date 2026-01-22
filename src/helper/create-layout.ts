


/*** UTILITY ------------------------------------------ ***/

import {
  author,
  description,
  title,
  url
} from "src/utility/constant.ts";

import headerParser from "src/helper/parse-header.ts";

/*** EXPORT ------------------------------------------- ***/

export default (type: "memo" | "remark", memo: string, recents: string) => {
  const { abstract, /*category,*/ document, title: documentTitle } = headerParser(memo);

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <title>${title} &bull; ${String(documentTitle).toLowerCase()}</title>

        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
        <meta content="${author}" name="author"/>
        <meta content="${abstract || description}" name="description"/>
        <meta content="${title}" name="title"/>
        <meta content="width=device-width, height=device-height, initial-scale=1, maximum-scale=5, viewport-fit=cover" name="viewport"/>

        <!--/ Open Graph /-->
        <meta content="${abstract || description}" property="og:description"/>
        <meta content="https://🔥.pixels.wtf/blog/asset/og.png" property="og:image"/>
        <meta content="800" property="og:image:height"/>
        <meta content="1280" property="og:image:width"/>
        <meta content="en_US" property="og:locale"/>
        <meta content="${title}" property="og:site_name"/>
        <meta content="${documentTitle}" property="og:title"/>
        <meta content="website" property="og:type"/>
        <meta content="${url}" property="og:url"/>
        <meta content="@netopwibby@social.coop" name="fediverse:creator"/>

        <!--/ Social/App Stuff /-->
        <meta content="${title}" name="apple-mobile-web-app-title"/>
        <meta content="${title}" name="application-name"/>

        <!--/ Feeds /-->
        <link rel="alternate" href="/feed/atom" type="application/atom+xml"/>
        <link rel="alternate" href="/feed/json" type="application/json+xml"/>
        <link rel="alternate" href="/feed/rss" type="application/rss+xml"/>

        <!--/ The Rest /-->
        <link href="https://🔥.pixels.wtf/blog/asset/apple-touch-icon.png" rel="apple-touch-icon"/>
        <link href="${url}" rel="canonical"/>
        <link color="#111" href="https://🔥.pixels.wtf/blog/asset/favicon.svg" rel="mask-icon"/>
        <link href="https://social.coop/@netopwibby" rel="me"/>
        <link href="https://🔥.pixels.wtf/blog/asset/favicon.svg" rel="shortcut icon"/>
        <link href="https://uchu.style/color_expanded.css" rel="stylesheet"/>

        <style>
          @font-face {
            font-display: swap;
            font-family: "WEBB MONO";
            font-style: normal;
            font-weight: 400;
            src: url("/type/400.woff2") format("woff2");
          }

          @font-face {
            font-display: swap;
            font-family: "WEBB MONO";
            font-style: italic;
            font-weight: 400;
            src: url("/type/400i.woff2") format("woff2");
          }
        </style>

        <style>
          *,
          *::before,
          *::after {
            margin: 0; padding: 0;
            box-sizing: inherit;
          }

          html {
            width: 100vw; height: 100vh;
            box-sizing: border-box;
            font-size: 12px;
          }

          body {
            width: 100%; height: 100%;

            background-color: var(--uchu-yang);
            color: var(--uchu-yin-9);
            display: flex;
            flex-direction: column;
            font-family: "WEBB MONO", monospace;
            font-size: 1.15rem;
            line-height: 1.33;
          }

          main {
            display: flex;
            flex: 1;
            flex-direction: row;

            > section {
              max-width: 650px;
              padding: 2rem;

              > pre {
                font-family: inherit;

                > code {
                  background-color: var(--uchu-yellow-1);
                }

                > pre {
                  background-image: linear-gradient(90deg, var(--uchu-pink-1), transparent);
                }
              }

              blockquote {
                background-image: linear-gradient(90deg, var(--uchu-orange-1), transparent);
                margin-bottom: -1.5rem;

                a {
                  color: var(--uchu-orange-7);

                  &:visited {
                    color: var(--uchu-blue-3);
                  }
                }
              }

              iframe,
              img {
                padding-right: 4.75rem;
                width: 100%;
              }

              iframe {
                aspect-ratio: 16 / 9;
              }

              hr {
                background-image: linear-gradient(90deg, transparent, var(--uchu-yin-1), transparent);
                border: 0;
                height: 1px;
              }

              > a {
                color: var(--uchu-blue-3);

                &:visited {
                  color: var(--uchu-purple-3);
                }
              }
            }

            aside {
              display: flex;
              flex-direction: column;
              flex: 1;
              margin-left: 2rem;
              padding-top: 17rem;
              z-index: 1;

              a {
                background-color: var(--uchu-gray-1);
                color: inherit;
                padding: 0.5rem;

                &.current {
                  background-color: var(--uchu-yang);
                  font-weight: 600;
                  pointer-events: none;
                }

                &:not(:last-of-type) {
                  margin-bottom: 0.75rem;
                }
              }
            }
          }

          header,
          footer {
            background-color: var(--uchu-gray-1);
            color: var(--uchu-yin-3);
            padding: 0.5rem calc(2rem - 2px);
            text-transform: uppercase;

            a {
              color: var(--uchu-yin-9);
              font-weight: 600;

              &:hover {
                color: var(--uchu-blue-3);
              }
            }
          }

          @media (max-width: 800px) {
            header {
              position: relative;

              &::after {
                bottom: -5rem; left: 0;

                background-color: var(--uchu-yellow-1);
                color: var(--uchu-yellow-9);
                content: "My blog is optimized for desktop only…yes, I know that’s annoying.";
                padding: 1rem;
                position: absolute;
              }
            }
          }

          p {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
          }
        </style>
      </head>

      <body>
        <header>
          [<a href="https://webb.page">homepage</a>|<a href="https://cv.webb.page">cv</a>]
          ${document} [<a href="${type === "memo" ? `/${document}` : `/remarks/${document}`}.txt">text</a>|<!--/<a href="">pdf</a>|/--><a href="${type === "memo" ? `/${document}` : `/remarks/${document}`}">html</a>]
          ${type === "memo" ? `[<a href="/remarks">remarks</a>]` : `[<a href="/">memos</a>]`}
        </header>

        <main>
          <section>
            <pre>
              ${memo}
            </pre>
          </section>

          <aside>
            ${recents}
          </aside>
        </main>

        <footer>
          [<a href="https://github.com/NetOpWibby/blog" target="_blank" title="source code for this blog">source</a>]

          [<a href="/feed/atom" title="Atom feed for the webb blog">atom</a>|<a href="/feed/json" title="JSON feed for the webb blog">json</a>|<a href="/feed/rss" title="RSS feed for the webb blog">rss</a>]

          [<a href="https://social.coop/@netopwibby" target="_blank">mastodon</a>|<a href="https://cyberspace.online/netopwibby" target="_blank">cyberspace</a>|<a href="https://bsky.app/profile/webb.page" target="_blank">bluesky</a>|<a href="https://www.linkedin.com/in/paulanthonywebb/" target="_blank">linkedin</a>]
        </footer>
     </body>
   </html>
  `;
}
