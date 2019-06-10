---
title:      The Future of the Operating System: Revisited, Part 1
date:       2019-06-09
tags:       hikari
tldr:       Where we're going is...fascinating and unknown.
color:      green
published:  true
---

[Back in 2013](https://2016.dsgn.io/thoughts/post/the-future-of-the-operating-system "The Future of the Operating System") I penned an essay titled, "The Future of the Operating System." In it, I attempted to predict where the operating system paradigm was headed based on what was obvious to me at the time: cloud services were taking off and mobile devices were seeing greater usage than personal computers. Logically (to me), this meant the concept of a responsive OS was upon us. Some of the cited examples were [Firefox OS](https://en.m.wikipedia.org/wiki/Firefox_OS "Wikipedia article for Firefox OS") and [Ubuntu Edge](https://en.m.wikipedia.org/wiki/Ubuntu_Edge "Wikipedia article for Ubuntu Edge"), products that were both designed to be highly mobile primary computing devices that would dock to an apparatus on one's desk to become a full-fledged workstation. The essay was also an opportunity to plug my OS _in-progress_ (now dormant), [hikari](https://hikar.io "hikari OS"), built around the responsive OS concept.

For now, a rectangular slab of glass and metal that more or less fits in the palm of an adult hand appears to be the preferred format for a mobile computing device. Specific details and component internals can and will change but the external _probably_ won't change much so no time will be spent talking about that. Instead, I'll go over my favorite UI concepts that inventive minds have created in the half-decade since my inital opus.



### [eDEX-UI](https://github.com/GitSquared/edex-ui)

> eDEX-UI is a fullscreen, cross-platform terminal emulator and system monitor that looks and feels like a sci-fi computer interface.
>
> Heavily inspired from the [TRON Legacy movie effects](https://web.archive.org/web/20170511000410/http://jtnimoy.com/blogs/projects/14881671) (especially the [Board Room sequence](https://gmunk.com/TRON-Board-Room "TRON Board Room case study")), the eDEX-UI project was originally meant to be _"[DEX-UI](https://github.com/seenaburns/dex-ui "DEX UI repo") with less « art » and more « distributable software »"_. While keeping a futuristic look and feel, it strives to maintain a certain level of functionality and to be usable in real-life scenarios, with the larger goal of bringing science-fiction UXs to the mainstream.
>
> It might or might not be a joke taken too seriously.

[![eDEX-UI screenshot](/assets/images/2019/future-of-the-os-a.png)](/assets/images/2019/future-of-the-os-a.png)
[![eDEX-UI screenshot](/assets/images/2019/future-of-the-os-b.png)](/assets/images/2019/future-of-the-os-b.png)
[![eDEX-UI screenshot](/assets/images/2019/future-of-the-os-c.png)](/assets/images/2019/future-of-the-os-c.png)

The on-screen keyboard suggests the use of this UI on a large touchscreen table (like [Microsoft's PixelSense](https://en.m.wikipedia.org/wiki/Microsoft_PixelSense "Wikipedia article for Microsoft PixelSense") or [Oblivion's Light Table](https://duckduckgo.com/?q=oblivion+table&iax=images&ia=images "DuckDuckGo image search for 'oblivion table'")) or at least the 12" iPad Pro. Despite what some would consider "visual noise", this UI has almost everything one would need for text entry and multitasking.

I personally don't see myself using a UI like this because of limited color palette. It looks wonderful for focus though.

If nothing else, it is fun to look at and pretend you're in a future where hoverboards are actually real and not 🤬 batteries on wheels.



### [Desktop Neo](https://desktopneo.com)

> Neo is a conceptual desktop operating system interface that is built for todays people, needs and technologies.

[![Desktop Neo screenshot](/assets/images/2019/future-of-the-os-d.jpg)](/assets/images/2019/future-of-the-os-d.jpg)
[![Desktop Neo screenshot](/assets/images/2019/future-of-the-os-e.jpg)](/assets/images/2019/future-of-the-os-e.jpg)
[![Desktop Neo screenshot](/assets/images/2019/future-of-the-os-f.png)](/assets/images/2019/future-of-the-os-f.png)

This UI is all about fullscreen _everything_. Window manager lovers would be so into this (looking at you, [/r/unixporn](https://www.reddit.com/r/unixporn "unixporn subreddit...this is not *actual* porn, just UI inspiration") community). Heck, **I** am into this! All day every day I am _constantly_ resizing/swiping/moving windows around.

The panel concept of this UI is nice and the search functionality sounds like something I **need**. I am currently on the beta for macOS Catalina and it _almost_ has the concept down but you can only split two windows, max.

[![macOS Catalina, splitscreen](/assets/images/2019/future-of-the-os-g.png)](/assets/images/2019/future-of-the-os-g.png)

I do like how productive it makes me feel so maybe I'll become a heavy user of it (and hope Apple expands on the feature). Of the UI concepts showcased here, Desktop Neo is my favorite.



### [Mercury](https://www.mercuryos.com)

> Mercury is a speculative reimagining of the operating system as a fluid experience driven by human intent.

> No Apps or Folders. Mercury fluidly assembles content and actions based on your intentions. So you can focus on the destination, not the many ways to get there.

[![Mercury screenshot](/assets/images/2019/future-of-the-os-h.png)](/assets/images/2019/future-of-the-os-h.png)
[![Mercury screenshot](/assets/images/2019/future-of-the-os-i.png)](/assets/images/2019/future-of-the-os-i.png)
[![Mercury screenshot](/assets/images/2019/future-of-the-os-j.png)](/assets/images/2019/future-of-the-os-j.png)
[![Mercury screenshot](/assets/images/2019/future-of-the-os-k.png)](/assets/images/2019/future-of-the-os-k.png)

This is interesting because it completely strips away the desktop paradigm and creates something that aims to intuit what you'll do based on previous interactions. Basically, local machine learning to help you be more productive.

Mercury makes **heavy** use of shortcuts and search to get around, so this isn't the UI for the faint of heart.

The mockups show email messages and some neat things around that but nothing else. It'd be interesting to see how a web browser would look. How do I see all my apps? The creator of Mercury says there aren't any apps but come on, _of course there are_.

I'm excited to see where Mercury heads but for now, it just looks like a nice email app.



### Thoughts

A key issue I have with every UI concept mentioned here (and nearly every one on the Internet) is the lack of real work being done within them. Outside of a email or text prompt, you rarely see how a coder would use it. Or an analyst. Or a designer. Or anyone being productive, period.

A common thread that brings these concepts together is, _focus_. Another is _change_ (obviously). After all, the [desktop metaphor](https://en.m.wikipedia.org/wiki/Desktop_metaphor) as we know it was created in 1970. **Nineteen seventy**. What you are reading right now was written in 2019, nearly 50 _years_ later and...not much has changed.

As I am wont to do, I think about lapsed projects of mine and wonder what would warrant further development. In hikari's case, it doesn't make sense to simply recreate the tried-and-true desktop metaphor. If my aim is to solve problems inherent to a dated paradigm, keeping with the status quo is _not_ the way to go.

One of the reasons Apple's iOS is massively popular is because users don't have to think about files and folders, a chief tenant of the desktop paradigm.

So...where do we go from here?

I don't pretend to have the answer but I think we're _slowly_ going in the right direction.
