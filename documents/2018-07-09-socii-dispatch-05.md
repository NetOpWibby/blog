---
title:      Socii Dispatch 05
date:       2018-07-09
tags:       project
tldr:       Ship often!
color:
published:  true
---

I guess this is turning into a bi-monthly update? Don't fret, the silence doesn't mean there wasn't progress being made. Let's jump in.

### Quick life update
I got a (remote) job! And a house! Kids are happy, wife is happy, so I'm happy.

### JSON Feed support
Every profile is now equipped with [JSON Feed](https://jsonfeed.org) support! Created by Manton Reece and Brent Simmons, JSON Feed aims to be the new RSS. To access your feed (or others), append `/feed` to a user's profile page. Here's an example:

```
https://hub.socii.network/Socii/feed
```

Your feed is now available for whatever you wish to use it for. Maybe you want to display your latest posts on your personal site? Have a customized dashboard? Put 'er there!

Socii is a social network, yes, but not one that wants to keep you on it all the time. Your data is yours.

### GDPR
By now you've seen the emails and memes as a result of the passing of General Data Protection Regulation (GDPR) in Europe. Long story short, it's a collection of data protections passed into law for European citizens. This means, companies are required to protect data pertaining to any users from Europe and to also deliver or delete said data should the user request it.

Unlike the major social networks here in America, I didn't opt to have two versions of privacy policies for users in Europe and those outside. EVERYONE deserves to have their data protected, exported, and/or deleted at a whim. To echo the words of Childish Gambino, "this is America".

Now, GDPR isn't _perfect_ but it's a step in the right direction. To that end, I've updated the [policies](https://socii.network/policies) page to be more comprehensive about the data Socii collects, how that data is used, email addresses of the Data Controller and Data Controller officer, and so on. I dislike that it's so long though…I may bring back the TL;DR version from before and have a toggle to see both. Yeah, that's a great idea!

### Notifications
This was a long time coming. When you favorite or respond to a post, the author will get a beautifully simple email stating such.

The notifications tab on the hub is still empty for now but I **could not wait** to ship the workable part of this feature.

`@ mention` support for notifications will come shortly. This will pave the way for private messages as well.

### Performance gains
Yes! _FINALLY_. You wanna know why loading of `hub.socii.network` was so slow? I was literally loading…every…single…post before displaying the hub. Over time the wait got progressively worse because there were more posts to load.

Enough was enough and after I shipped notifications, I got to work on implementing GraphQL-based pagination. I had this implemented _partially_ for about a month or so but other issues plagued me more than the slowness of the hub. Pagination is _also_  active on profile pages. It may not be perfect but it's close.

A blog post to detail how to do pagination in GraphQL without Apollo, Prisma, or whatever magic framework is forthcoming. I've had developers attached to the GraphQL project tell me that pagination is [trivial](https://github.com/howtographql/howtographql/issues/514), unimportant, or easy, both on GitHub and Slack. Or, that I **need** to use yet _another_ framework to achieve it.

Good thing there are other places to find help. No matter how much I learn, I remember knowing _a lot less_. I feel obligated to pass on the knowledge of dope things. Stay tuned!

### Low-hanging fruit and other changes
- Email addresses can now have `+` and `.` characters, perfect for having multiple accounts and using email aliases.
- When posts are deleted, favorite and reply counts are accurate.
- When a post with replies is deleted, the replies lose the reply icon
Implementation of reposting is _canceled_, [discussion here](https://hub.socii.network/s/jfy2tm86000h10bk4i1epmp2).
- Message flasher (for lack of better description) has a reasonable z-index now. No more covering navigation menus.
- Post preview button is now disabled when no text has been entered, [bug report here](https://hub.socii.network/s/jgtl9k0n000wxobkq9a9u54k).
- New post modal now matches language with the button that triggers it, [bug report here](https://hub.socii.network/s/jgtl9k0n000wxobkq9a9u54k).
- Visual issues regarding the Markdown help have been fixed.
- Increased character count for "optimal display".
- New post modal and reply box is now fully responsive.
- Got rid of as many "magic numbers" from the CSS as possible. This required some refactoring.
- Refactored all my microservices and added tests. TESTS. Currently, they check for out-of-date dependencies and lints the code.

### Things I've Learned
1. You will almost always hate your old code.
2. Refactoring is fun. I already knew this but I like reminding myself. It's an opportunity to replace/improve functionality with less code. _Amazing_. 🤩
3. Everything can be distilled into simple concepts if you think long enough.
4. Big Social is duplicitous.

[&there4;&thinsp;NetOpWibby](https://hub.socii.network/NetOpWibby), out! 🕸
