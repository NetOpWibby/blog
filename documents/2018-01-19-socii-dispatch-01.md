---
title:      Socii Dispatch 01
date:       2018-01-19
tags:       project
tldr:       Updates with Socii's development
color:
published:  true
---

For the past month I've been hard at work, developing basic social network features. Namely, account and post creation and editing your profile. To be honest, it's not glamorous work but I've been having a blast doing it. Here's what's been completed thus far.



### Profile
![First look at your profile](/assets/images/2018/socii-dispatch-01-a.jpg)

On your profile, you'll see your avatar in whatever shape you choose from available options which are a triangle (the default), circle (classic), square (old-school), diamond, and inverted triangle. Below your avatar in the first sidebar, you'll find your name and username.

When you sign up for Socii, you're automatically logged in and given a generated username based on your email address so feel free to change it if something like `paul927465` doesn't quite fit you. Anecdotally, I've noticed that as people go through life changes they tend to want user/name changes as well so I've made Socii unreliant on usernames on the back-end. Friends and followers would want to know if you go from `SuperAwesomeMegaTon` to `netop://~tonton` and I'm building a notification system to accommodate that.

There are currently no limits on username changes and I can conceivably see how harassment could occur with it. You'll be equipped with proper muting and blocking tools should you unwittingly connect with an annoying person.

In the other sidebar, you'll see something called "top 8". Older readers will remember the _glory_ that was MySpace and I wanted to bring that back as I found it useful.

Sometimes I just want to visit a friend's page and I forget what their username is (and, if you follow a lot of people who post more often than your friend(s), you'll miss their posts). I sure know what my friends **look** like though and it'll be pretty sweet to see which shapes they choose for their avatars.

And of course you'll find your personal stream of posts. Within each post block is a menu indicator that contains actions for editing your post, quick copying of the direct link to the post, pinning the post to your profile, and deleting the post. If you want to like your own post for some reason, you can definitely do that. You can also create threads by responding to your own posts.



### Post creation
![Post creator, clean](/assets/images/2018/socii-dispatch-01-b.jpg)
![Post creator with a code snippet](/assets/images/2018/socii-dispatch-01-c.jpg)
![That rendered code snippet...wish it had color](/assets/images/2018/socii-dispatch-01-d.jpg)

Socii supports Markdown! I'm using a customized version of [Showdown](https://github.com/showdownjs/showdown "Showdown repo on GitHub") to enable it. The eye icon in the footer of the post creator allows for previewing what your post will look like when it's live. The character limit is 150 for reasons that will become apparent in a couple months, after I ship a major (secret) feature.

However, your post can be up to **5,000 characters** long if you so choose! 😰 That'd be _extremely_ annoying to attempt scrolling in a feed so posts longer than 150 characters will be truncated by default with a button to expand it should anyone want to read the entire thing. The question mark icon will give you quick tips on how to use Markdown to add a bit of flavor to your posts.

If you'd like to read a long post but don't have time at the moment, you can save that post for future reading.

![Respond to your own post to create a thread](/assets/images/2018/socii-dispatch-01-e.jpg)

For the moment, only one post status type is available and that is "publish". Forthcoming updates will bring three more: drafts, queues, and schedule. Similarly, the only post creator mode available is "text" but future updates will bring photo, audio, and video options.



### In progress
There's still a good amount of work to get done. For starters, there's no way for you to change your avatar and that's the _first_ thing I do when joining a new service. I also want to get notifications and the global/top 8 feeds working. I think being able to toggle between what everyone is talking about versus whomever in your top 8 is talking about will be neat.

I want to be more open about developing Socii for a couple reasons:

1. I want this social network to be good for people.
2. I develop in a vacuum and while I share updates with a couple people IRL, I think other people could benefit from what I'm learning in the process.
3. External reminder of what I have accomplished. Most people can agree that we accomplish things but beat ourselves up for that _one_ thing we didn't do. That's demoralizing and I don't want to stop before Socii gets into people's hands.

With that said, I'm making a new commitment to releasing Socii at the end of this month for alpha access to members of my mailing list. If you haven't joined yet, you can find it at [socii.network](https://socii.network/welcome "Mailing list for Socii"). For more information about Socii, you can [read this post](/2017/who-creates-social-networks "Who the hell creates a social network?") or check out the manifesto on Socii's official marketing page.



### Things I've learned
I figured it'd be a good idea to share what I've learned since my last blog post about Socii:

1. I'm tired of rounded corners everywhere. I've removed `border-radius` from all the Sass files.
2. GraphQL is awesome. However, I've been building REST APIs for the past month and have two microservices to handle things thus far _and that means_ I'm not transitioning to GraphQL until maybe version 1 of Socii is solidified. 😤 Wish I learned of it sooner (it's basically a better way to do REST and talk to servers).
3. Styling with `:root`. [This](https://developer.mozilla.org/en-US/docs/Web/CSS/:root "MDN article on :root styling") is how everyone will have customized profile pages. I don't know why every example I've seen it used has root styles overriding each other. I try to write my CSS in a way that doesn't have style overrides because it's a hassle to deal with. If you have `:root.user` styling, just have `:root:not(.user)` for your default styling. Easy.

That's all for now, see ya! 🕸
