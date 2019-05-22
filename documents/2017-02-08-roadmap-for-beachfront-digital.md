---
title:      Roadmap for BeachfrontDigital
date:       2017-02-08
tags:       development, project
tldr:       Far-reaching goals for BeachfrontDigital.
color:      pink
published:  true
---

[BeachfrontDigital](https://beachfront.digital "Manage your domain names with Beachfront.Digital!") is a domain portfolio management tool I built and launched late last year. To quote the "About" page:

> BeachfrontDigital is me scratching my own itch and taking cues from The 7 Day Startup. I buy domains on a regular basis and often from more than one registrar. As a result, I tend to forget I have some domains! **True story**, I ran a WHOIS search *on a domain I own*, a couple months ago. Terrible. 😩

The name is a result of a conversation I had with co-workers about how domain names are like the premium waterfront properties of the 80s. Of course, the domain `beachfront.digital` was available so I snagged it ASAP.

Since launching BD in October, I've made updates here and there and it seemed like I was going to get valuable feedback from early beta testers who assured me they would sign up at $6/year *instead of* the regular $11/year price...turns out, **nobody** wanted to beta test and my messages were ignored. Was it because of the upfront cost? Was it because I didn't have a bunch of features fleshed out? I'll never know. However, of the friends I reached out to for feedback [Wojtek Witkowski](https://twitter.com/dubstrike "Wojtek on Twitter") was the only one who got back to me. Through him and a prospective customer/commenter on Hacker News, I learned a few things:

- I wasn't offering anything that a spreadsheet couldn't handle.
- $6/year was still too much to charge for someone who has <10 domains.
- To make charging for my service palatable, I'd need to create a sync system for registrars.
  - Not all registrars have public APIs (see: Hover).
  - There are **so** many registrars. It's not cost-effective to maintain syncing for each.
  - Creating a sync system based on undocumented APIs like some people have done with Hover is a *terrible* idea. Undocumented APIs means they can break at *any* moment.

For these reasons and more, *I have decided to make BeachfrontDigital free* when V2 goes live. I'm currently working on a stock photography site for people of color so upgrades and changes to BD will occur in March (when I'm not playing my Nintendo Switch, hehe). I also plan to update the site with a visual style reminiscent of the 80s. Here's how the site used to look:

![First version of BeachfrontDigital](/assets/images/2017/roadmap-for-beachfront-digital-a.png)

Here's how it looks now:

![Second version of BeachfrontDigital](/assets/images/2017/roadmap-for-beachfront-digital-b.png)

As you can see, the styling went from pretty cool (the logo was levitating and the background grid moved as well) to extremely sterile. Nothing's *wrong* with a sterile look, that's what this blog looks like, haha! But for something with the URL `beachfront.digital`, it could stand to look a **bit** more impressive.

A key missing feature is the ability to import your domains. If you've already got a method to organize your domains and you want to use BeachfrontDigital, you sure wouldn't want to type everything again right? **Hell no**, who has time for *that*?! I intend to make the wishlist feature more robust, as well as the personal analytics. For example, I'm paying $2027 for 75 domains per year 😅. Anyhoo, watch this space and [@BeachfrontD](https://twitter.com/@BeachfrontD "BeachfrontDigital on Twitter") on Twitter for updates. 🕸
