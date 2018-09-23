---
title:      BeachfrontDigital — April Update
date:       2017-04-11
tags:       development, project
tldr:       Eliminating friction and adding new features to BeachfrontDigital.
color:      pink
published:  true
---

Who knew analytics could be fun?

I've spent the past week and a half working on the new [BeachfrontDigital](https://beachfront.digital "Manage your domain names with Beachfront.Digital!") and I'm loving it. After publishing my [previous post](/thoughts/2017/roadmap-for-beachfront-digital "Roadmap for BeachfrontDigital, on theWebb.blog"), I thought about how I could make BD more useful to myself and other people. Something that bothered me for awhile was the lack of importing. *To be quite honest*, I was scared of the work required to make importing domains work. I just didn't want to deal with it. **Lame**, right?

Here's a reminder of why nobody bothered to sign up for V1 of BeachfrontDigital:

- I wasn't offering anything that a spreadsheet couldn't handle.
- $6/year was still too much to charge for someone who has <10 domains.
- To make charging for my service palatable, I'd need to create a sync system for registrars.
  - Not all registrars have public APIs (see: Hover).
  - There are **so** many registrars. It's not cost-effective to maintain syncing for each.
  - Creating a sync system based on undocumented APIs like some people have done with Hover is a *terrible* idea. Undocumented APIs means they can break at *any* moment.

This reminder was enough to get me back into making BD better, starting with CSV importing and guess what? It wasn't **that** bad! I think it took me two days to get importing to work, with another two for optimization. When a user decides to export their data, it'll look something like this:

![Snippet of my domain export from BeachfrontDigital](🖼01.png)



### Eliminating friction
During a coding break, I read an article that was sitting in a tab for at least a week, [Amazon's Friction-Killing Tactics To Make Products More Seamless](http://firstround.com/review/amazons-friction-killing-tactics-to-make-products-more-seamless "Amazon article on First Round Review"). What an eye-opener that was! The takeaway I got from it was to *minimize as much friction as possible for the end user*. It was easy to identify a major point of friction with BD as it was something I was actually dreading. Me, the guy who made the product, didn't want to perform the basic task. Why? It was too much work!

In V1 of BeachfrontDigital, I had to input the domain name, registrar, price, AND expiration for every single domain I own. Even if the number of domains I had were two, that's *still* more work than I'm willing to do. No one likes filling out spreadsheets, it's a chore. What to do? Automate the hell outta what we don't want to deal with!

Of course, you'll have to input your domains because BD is not a mind-reading app (it *would be* in a few years if it was a Google product). Thankfully, BD will run a WHOIS search in the background and automatically grab registrar and expiration info. Pricing is something you'll have to input as well because registrars don't have the same pricing for domains/top-level domains (TLDs).

![Screenshot of my domain portfolio](🖼02.jpg)

Don't even get me started on how inconsistent TLD operators are with listing registrar names. In my testing, I found [three variations](https://twitter.com/BeachfrontD/status/848404426557673472 "Screenshot of the hot mess that = TLD operators") of the business name for Tucows. Like, why? Lucky for you, I asked customer support at both Tucows and Hover and was told this:

> The variations in the Tucows name for different domains is simply how it was inputted at the Registry level (each domain extension or tld has a governing entity known as a Registry), and since that is a human's job normally, it gets added to their system slightly different each time.
>
> — Jordan Q

In addition, domains purchased through Hover will list the registrar in WHOIS searches as Tucows. Gandi will show EPAG Domainservices GmbH, iwantmyname will show 1API GmbH, and so on. It would be *ideal* to show the actual reseller you purchased your domains from but that's not how WHOIS works. Oh well.



### New features
![Portfolio dashboard for BeachfrontDigital](🖼03.jpg)

This is how the new portfolio dashboard looks! I figured that it'd be good to show personal analytics in both textual and graphical formats. While creating this, I learned how flexible and awesome [Handlebars](http://handlebarsjs.com "Build semantic templates without frustration!") is.

At a glance, you can see how many domain renewals are occurring this month, this year, and next year. January and July are busy months for me. Interesting that they are six months apart. What is it about those months that give me ideas? I just realized I haven't accounted for people who renew domains for multiple years...*updates list of TODOs*.

You can also see how many domains you own per registrar. Obviously, I favor Tucows because I like the included WHOIS privacy from Hover, for domains that support it (I don't get why `.fm` and `.io` don't, so dumb). I purchased `frsh.fm` from Gandi initially, but then moved it to Hover. Not sure why EPAG Domainservices GmbH is there...

Finally, you also get to see how many domains you have per TLD. `.com` and `.online` are my favorite ones, apparently. The legend for this chart is awfully busy, I'll need to find a way to make it look better. I mean, someone with 50+ TLDs in their domain portfolio might be an edge-case, but it's going to bother me until I find a solution, haha. 🤷🏾‍♂️

In order to make every data point stand out, you need color. Well, I wasn't going to manually create colors, these are all generated dynamically! I need to do a bit of tweaking here and there but I'm mostly satisfied with the results.



### In conclusion
At the end of my [previous post](/thoughts/2017/roadmap-for-beachfront-digital "Roadmap for BeachfrontDigital, on theWebb.blog") about BeachfrontDigital, I mentioned making the service free. Hmm, **nope**. However, it *will* be free during beta, which is whenever I launch V2 until I deem the service is ready for primetime. That could be as early as this summer or as late as 2018. At that point, BeachfrontDigital will cost $11/year afterwards.

What you've seen above is only half of the first wave of upgrades. My next BD post will most likely show more charts, but centered around pricing! I'm also thinking about making each of the charts fullscreen-capable. It would be neat to use the left/right arrow keys to look at the other charts in fullscreen mode as well! 🕸
