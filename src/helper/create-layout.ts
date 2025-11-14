


/*** IMPORT ------------------------------------------- ***/

import { dedent } from "dep/x/dedent.ts";

/*** UTILITY ------------------------------------------ ***/

import {
  author,
  description,
  title,
  url
} from "src/utility/constant.ts";

/*** EXPORT ------------------------------------------- ***/

export default (suppliedContent: string) => {
  return dedent`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <title>${title}</title>

        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
        <meta content="${author}" name="author"/>
        <meta content="${description}" name="description"/>
        <meta content="${title}" name="title"/>
        <meta content="width=device-width, height=device-height, initial-scale=1, maximum-scale=5, viewport-fit=cover" name="viewport"/>

        <!--/ Open Graph /-->
        <meta content="${description}" property="og:description"/>
        <meta content="https://🔥.pixels.wtf/blog/asset/og.png" property="og:image"/>
        <meta content="800" property="og:image:height"/>
        <meta content="1280" property="og:image:width"/>
        <meta content="en_US" property="og:locale"/>
        <meta content="${title}" property="og:site_name"/>
        <meta content="${title}" property="og:title"/>
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
            font-family: monospace;
            font-size: 1.15rem;
            line-height: 1.33;
            padding: 3rem 2rem;
          }

          main {
            flex: 1;
          }

          header {
            margin-bottom: 4rem;
          }

          footer {
            margin-top: 4rem;
            margin-bottom: 2rem;

            a {
              color: inherit;
              font-weight: 600;

              &:hover {
                color: var(--uchu-blue-3);
              }
            }
          }

          p {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
          }

          /*————— grid */

          .grid {
            width: 100%;
          }

          @media (min-width: 901px) {
            .grid {
              display: table;
              table-layout: fixed;
            }
          }

          @media (max-width: 900px) {
            .grid:first-of-type {
              display: none;
            }

            .grid {
              display: flex;
              flex-direction: column-reverse;
              padding: 0.75rem 1rem 0.75rem 0;
            }

            .grid:nth-child(2) {
              padding-bottom: 1.25rem;
            }

            .grid:not(:first-of-type):not(:nth-child(2)) {
              padding-top: 1rem;
            }
          }

          @media (min-width: 451px) and (max-width: 850px) {
            .grid:not(:first-of-type):not(:nth-child(2)) {
              padding-bottom: 1.25rem;
            }
          }

          @media (max-width: 450px) {
            .grid:not(:first-of-type):not(:nth-child(2)) {
              padding-bottom: 1rem;
            }
          }

          .grid:first-of-type {
            font-weight: 600;
            letter-spacing: 0.05rem;
            position: relative;
          }

          .grid:not(:first-of-type) {
            border-bottom: 1px solid var(--uchu-gray-3);
          }

          /*————— column */

          .col {
            cursor: default;
            overflow: hidden;

            a {
              white-space: pre-line;
            }

            &:not(:hover) {
              a:not(:visited) {
                color: var(--uchu-blue-3);
              }

              a:visited {
                color: var(--uchu-purple-1);
              }
            }

            &:hover {
              a:not(:visited) {
                color: var(--uchu-blue-6);
              }

              a:visited {
                color: var(--uchu-purple-4);
              }
            }
          }

          @media (min-width: 901px) {
            .col {
              display: table-cell;
              padding: 0.75rem 1rem 0.75rem 0;
              vertical-align: middle;
            }

            .col:first-child {
              padding-right: 3rem;
              text-align: right;
              width: 10rem;
            }
          }
        </style>
      </head>

      <body>
        <main>
          <header>
            <h1>index of /</h1>
            <p>${description}</p>
          </header>

          <section>
            <div class="grid">
              <div class="col">&nbsp;</div>
              <div class="col">directory</div>
            </div>

            <div class="grid">
              <div class="col">&nbsp;</div>
              <div class="col"><a href="/notes">notes</a></div>
            </div>
          </section><br/><br/>
          ${suppliedContent}

          <footer>
            <em>
              <a href="/2019-12-02-a-personal-api.txt" title="blog post introducing the personalOS concept">personalOS</a><sup>α</sup> server running @ blog.webb.page &middot; <a href="https://github.com/NetOpWibby/blog" title="source code for this blog">source</a><br/>
              feeds: <a href="/feed/atom" title="Atom feed for the webb blog">atom</a> &middot; <a href="/feed/json" title="JSON feed for the webb blog">json</a> &middot; <a href="/feed/rss" title="RSS feed for the webb blog">rss</a><br/>
              socials: <a href="https://social.coop/@netopwibby">mastodon</a> &middot; <a href="https://bsky.app/profile/webb.page">bluesky</a> &middot;<a href="https://www.linkedin.com/in/paulanthonywebb/">linkedin</a>
            </em>
          </footer>
        </main>
      </body>
    </html>
  `;
}
