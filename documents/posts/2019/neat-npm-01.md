---
title:      Neat npm modules - Vol 1
date:       2019-01-02
tags:       neato, review
tldr:       The modules you wish you used
color:      red
published:  true
---

This is the first post in what will become a series of posts about interesting and useful npm modules I come across and/or use in my projects.

Over the past year, small modules that got to the point and had close to zero dependencies (dependency-free is even better!) became more appealing to me for a few reasons.

1. Big modules are slow to update. When a vulnerability is found in one of their dependencies the module maintainers are notified and then...nothing. Sometimes the maintainers never respond so someone forks the project, updates the dependencies, and pushes that project under a new name. When security issues are discovered, I want them resolved ASAP. Smaller modules have less attack area, obviously. Fewer moving parts, &c.
2. The [left-pad incident](https://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm) and similarly befuddling things happening in the npm ecosphere give me pause about relying on a module with a bajillion moving parts. TL;DR: A popular module used by _thousands_ of other modules was unpublished (removed) from npm and that caused _quite_ the fuss when routine `npm install`s went off the rails across the Internet.

Please note that `package.json` examples below only have the necessary parameters regarding the section its in. This is for brevity. New developers come into being every day I'd like to help them out by removing possible confusion.



### colorette

> Colorette is a Node.js library for colorizing text in terminals.

Most people just use [chalk](https://www.npmjs.com/package/chalk) to style terminal text and I did too. When I saw I could get the same functionality in a smaller dependency-free package, I jumped at the chance to use it. chalk does and supports a lot more but for **my** needs, colorette is _juuuuust_ fine.

Find it on [npm](https://www.npmjs.com/package/colorette) | [GitHub](https://github.com/jorgebucaran/colorette)



### husky

> Husky can prevent bad git commit, git push and more 🐶 woof!

I'm honestly **embarrassed** that I haven't used something like husky earlier in life. **husky saves you from _yourself_** and what a beautiful job it does. Here's how I use it in my `package.json`:

```json
"husky": {
  "hooks": {
    "pre-commit": "npm run format && npm run test:sass && git add -A :/"
  }
},
"scripts": {
  "format": "eslint '**/*.js' --fix --ignore-pattern '/app/dist/'",
  "test:sass": "sass-lint --config ./node_modules/@inc/sasslint-config/config.json --verbose --no-exit"
}
```

What my pre-commit hook does is:

1. Use eslint to automatically format issues in JavaScript files found in the codebase, except for JavaScript files in the folder `/app/dist/`.
2. Use sass-lint and a custom configuration file to find issues in Sass files found in the codebase.
3. Stage (prepare) the changed files, if any, to be committed to my git server (I self-host with Gitea but this works with any git server).

Find it on [npm](https://www.npmjs.com/package/husky) | [GitHub](https://github.com/typicode/husky)



### npm-run-all

> A CLI tool to run multiple npm-scripts in parallel or sequential.

Here's how I use it in my `package.json`:

```json
"scripts": {
  "test": "run-s test:*",
  "test:dependencies": "updates --update ./ --exclude fastify",
  "test:lint": "standardx --verbose | snazzy",
  "test:sass": "sass-lint --config ./node_modules/@inc/sasslint-config/config.json --verbose --no-exit",
  "watch": "run-p watch:*",
  "watch:sass": "sass --watch app/sass:app/dist --style compressed",
  "watch:server": "NODE_ENV=development nodemon server"
}
```

`run-s` runs scripts sequentially, whereas `run-p` runs scripts in parallel. You've probably guessed by now but `run-s test:*` tells npm-run-all to run any script with "test:", one after the other. `run-p watch:*` tells it run any script with "watch:", side by side. I like it a lot.

Find it on [npm](https://www.npmjs.com/package/npm-run-all) | [GitHub](https://github.com/mysticatea/npm-run-all)



### updates

> Fast npm dependency updating tool

I found updates after being frustrated with [npm-check-updates](https://www.npmjs.com/package/npm-check-updates). One of the maintainers of the latter was [uninterested](https://github.com/tjunnone/npm-check-updates/issues/432) in updating the dependencies. Forking and working on npm-check-updates myself proved to be annoying so I went looking for solutions elsewhere.

Here's how I use it in my `package.json` (fastify is working on their next version and it's messing with this script so I ignore updating it for now):

```json
"scripts": {
  "test:dependencies": "updates --update ./ --exclude fastify"
}
```

Find it on [npm](https://www.npmjs.com/package/updates) | [GitHub](https://github.com/silverwind/updates)



### ver

> Increment semantic versions across your project. Intended for projects with a package.json, but works with other files too. Will create a git commit and tag by default. By default, only the nearest package.json file is modified.

Before ver, I never cared about "semantic versioning", let alone versioning _itself_. ver makes it super low effort to do. I just run `ver patch|minor|major` and chain it with other commands. It will automatically update the "version" field in your `package.json` file. Pretty sweet.

My typical usage is something like:

```bash
ver patch && git push && npm publish
```

Find it on [npm](https://www.npmjs.com/package/ver) | [GitHub](https://github.com/silverwind/ver)



### —

And there you have it! Five neat modules I find incredibly useful. I hope you do too! 🕸
