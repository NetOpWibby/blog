---
title:      Decentralization, Privacy, and Everything Between
date:       2018-05-17
tags:       decentralization, life, privacy
tldr:       Rah rah, fight the powah!
color:      purple
published:  true
---

This post is a combination of at least _three_ different posts I intended to write and publish over the past year. They inevitably came to the similar conclusions and it makes sense. In my mind, decentralization and privacy are mutually beneficial. In the wake of exposure to privacy violations by Google, Facebook, &c to the general public, it seemed like now would be a great time to share my thoughts.



### Privacy
> If you are not paying for it, you're not the customer; you're the product being sold. — [Andrew Lewis (blue_beetle)](https://www.metafilter.com/95152/Userdriven-discontent#3256046 "Andrew Lewis' classic quote on MetaFilter")

This oft-referenced quote was posted on MetaFilter on August 26th, 2010. It's been nearly a decade since then and clearly, that quote is timeless. The increasingly parasitic advertising industry is fed by a never-ending supply of user-data gathered and sold by almost every ~~online~~ ~~offline~~ service. Oh yeah, that's right; you can be tracked _offline_. The data gatherers are your usual suspects: Facebook, Google, Twitter, as well as unknown data brokers of which new ones are launching seemingly weekly. Have you looked at the blacklist of your favorite ad blocker? It's a _mess_.

The aforementioned data gatherers are in the business of keeping your attention. The visual redesigns, additional features, and so on are not created to make a better product for your perusal. Oh no, these changes are A/B tested and analyzed to ensure that you spend as much time using those products as possible. Why? So that app can send usage data and patterns back to the mothership to collect your info to update their algorithms and sell to advertisers for a pretty penny and the cycle continues.

Before this year, casual Internet users would roll their eyes at everything I've said thus far, `¯\_(ツ)_/¯`, and say something inane like, "It is what is is." or, "I have nothing to hide."

> Arguing that you don't care about the right to privacy because you have nothing to hide is no different than saying you don't care about free speech because you have nothing to say. — Edward Snowden

Frustrating as those eye rolls may be, you cannot force someone to care about something **you** think is important. I've been harping on about privacy to my friends for years and some of them are starting to come around. The tech (and mainstream) media's continued coverage about the evils of (mostly) Facebook and Google has become a roar too loud to ignore.

FINALLY.

People have realized (or are starting to realize) that they can no longer depend on the kindness of corporations offering free things on the Internet...when you think of it that way, it's kind of surprising that we would think there wouldn't be strings attached. Huh. Anyhoo, getting away from Facebook is _relatively_ easy. Ironically, if you have a lot of relatives on the platform, leaving is quite difficult.



### Cancel Facebook
Your entrenchment level with Facebook varies with the next person and most likely with me too. I'll share what I did leading up to and after my leave from Facebook in 2016.

1. I requested a backup of my data.
2. After downloading my data, I went to my profile page and spent a couple days deleting posts. This was tedious as hell and I never actually finished. I think I got through my first three years and then my recent two years before calling it quits with that task.
3. I also deleted integrations with other services and took the time to delete accounts with services I barely remembered using prior the integration deletion.
4. I told close friends, family, and my girlfriend (now wife) my plans and why I was doing so. I have several family members on Facebook but I also own a phone. I had zero interest with staying in contact with people I knew from high school, those were all passive "friendships" at that point.

### Cancel Google
Hoo boy, this one's a _doozy_. Entire livelihoods, businesses, and lifestyles rely on Google in some shape or form..._especially_ if your daily mobile driver is an Android device. I grew weary of Google long before my divorce from Facebook and I found an email replacement in [Mail-in-a-Box](https://mailinabox.email "Super awesome self-hosted email solution"), a self-hosted email solution that also has calendar and address book capabilities. For search, I use [DuckDuckGo](https://duckduckgo.com "A damn good search engine that doesn't track you"). I'm on iOS/macOS so Apple Maps is a suitable Google Maps replacement for me (btw, Apple Maps is **fantastic** in Japan).

At this point in time, YouTube is nigh-_impossible_ to replace. Nintendo doesn't upload their videos to Vimeo. MKBHD or any other super profitable YouTube creator isn't leaving the platform anytime soon either so it's a total crapshoot. I'm no longer logged-in to YouTube but I still get email notifications when a channel I'm interested in uploads a video. For videos I _really_ want to see again, I download them with [youtube-dl](https://rg3.github.io/youtube-dl "Download online videos from pretty much anywhere"), an awesome command line program that is capable of downloading videos from pretty much any video sharing site (not just YouTube). Here's my configuration file (located at `~/.config/youtube-dl/config`):

```bash
-f bestvideo+bestaudio
-o ~/Movies/%(title)s.%(ext)s
```

It automatically downloads the best audio and best video sources for whatever video URL you supply and combines them to create a single file. That file then gets saved to my `~/Movies` folder. I alias the `youtube-dl` command in my `.zshrc` config so I can type `yt` followed by a URL for a super-quick workflow.

Unfortunately, Google Apps for Work exists and that means I have not fully escaped their ecosystem. When it comes to most businesses, familiarity and cost-savings often take precedence over ideals. Make no mistake, finding (worthy) alternatives to every single one of Google's offerings is expensive in either time spent searching or cost for a single app. Sometimes both! However, I think the upfront cost is worth the longtime gain. You will have to be careful though. There is no shortage of startups with compelling products that are merely skins on top of Google's existing services (last year I interviewed for such a company that I thought was creating a compelling email client only to learn that it was really Gmail underneath AND there would be no IMAP support...the conversation made our misalignment apparent).

### Decentralization
As my concerns about online privacy grew, so did my interest in decentralization. The core premise of decentralization is basically self-hosting any online service you may need, yourself. The open-source community is _fantastic_ for that. You may find some projects with plenty of issues in their git repos and design/code quality of varying degrees of excellence but they are **all** great bases to get started from.

One of my favorite aspects of decentralization is discovering a codebase someone shared eons prior and finding out that a particular function (or even the entire codebase) fits in perfectly with whatever I'm working on. It sometimes feels like spelunking. You'll never know what you find but treasures await! My other favorite aspect of it is knowing that **I** am in control of my data. There's no ambiguity there. I don't have to trust a third-party, I can trust myself. After all, I wrote the code (or adapted it after I read through it).

**A key aspect of decentralization that scares non-tech-savvy people is self-hosting.** Of course I can say that it's no big deal but that's because I've been doing this for years. Some tech-savvy people just don't want to deal with server updates and the like. I totally get that because maintenance _can_ be a drag. You've really got to decide what you want for yourself. Personally, I think self-hosting is important and I advise everyone to try it at least once. Even if it's just to get over that fear of purchasing (well, _leasing_) a $5/month server from [DigitalOcean](https://www.digitalocean.com "VPS provider") or [Exoscale](https://www.exoscale.com "Another VPS provider, but in Europe") to hack on and test things with.

Here's a list of things I self-host:
- CMS: [Noto](https://git.inc.sh/IdeasNeverCease/Noto "Just some code I wrote") (super simple Markdown-based "CMS" I created that runs the blog you're reading right now)
- Email: [Mail-in-a-Box](https://mailinabox.email "Super awesome self-hosted email solution") (this is _super_ simple to setup)
- Git: [Gitea](https://gitea.io "A community-mangaged fork of Gogs") (MUCH lighter than GitLab and more customizable too)

If self-hosting is not your thing, you can sign up and/or join servers other people have created. For example, [Mastodon](https://mastodon.social) is a decentralized Twitter-like social network. You can fire up your own Mastodon instance or you can sign up for one and start chatting with people. I'm taking the opposite approach with the social network I'm developing but I intend to add decentralized features to it, like PubSub support.

Speaking of which, I am working on a social network and an analytics service because 1) I was not able to find exactly what I was looking for, and 2) if you want something done right you gotta do it yourself. I've already detailed my [reasons for starting a social network](/2017/who-creates-social-networks "Who the hell creates a social network?") before but I never published anything about the analytics service.

Plain and simple, I abhor trackers. However, I enjoy viewing stats that tell me how many people visit my site, the most popular link visited today, and so on. I was using [Gauges](https://gaug.es "Analytics provider that keeps getting sold") prior to creating [Chew](https://chew.sh "Just some analytics service I created") and one of my tech-savvy friends expressed to me that while he knows who I am and can trust me, he wasn't going to go through the trouble of whitelisting my blog. I don't blame him, the advertising industry is to blame. With more people utilizing ad blockers, how would anyone get accurate analytics? I realized that I could utilize the middleware function in [Express](https://expressjs.com "The one and only, E X P R E S S") to get my analytics. I may go deeper into my thought-process and inspiration for Chew at a later date but for now, you [check it out](https://chew.sh "Just some analytics service I created") and use it in your own apps!

### What now?
Getting your family, friends, and community onboard with what you've just learned is an uphill battle. You can lead by example though, so **do not feel discouraged** if/when they don't care about the privacy implications of staying with ~~well~~deceptively-designed services. We did not arrive at this clusterfuck of invasiveness and moral ambiguity overnight...it took some time and it will likely take some time to free ourselves from it.

Good luck. 🕸
