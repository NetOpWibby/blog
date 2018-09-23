---
title:      APFS preboot install issues no more!
date:       2017-11-03
tags:       rant, tutorial
tldr:       Spoiler alert, Time Machine is trash.
color:      red
published:  true
---

I was minding my business one day (October 27th) and I thought, oh! What's this? A "recommended update"? "Oh sure, I'll update to macOS High Sierra Beta 5, while I wait to pre-order my iPhone X at 3am." Updating my OS is something I've done _countless_ times before. Apple waits until 1~3am to let me know there's a software update or just performs one while I'm asleep. I awake the following morning to find my computer more secure than it was the previous day. Guess what happened this time? On the day of my friggin' _marriage_ (at 2am)?

I glance at my computer and see a software update...stuck. No worries, I'll reboot! Okay, Recovery Mode! Also, Restore from Time Machine...wtf? Why the hell did it stop at 39%? _opens logs_ Can't find linker for CoreSomethingOrOther? Good grief, reboot! Ghostbusters logo in white, sans ghost. WHAT. THE. FUCK. I open the Apple Support app, choose my laptop from my devices list, and chat with a rep. After confirming I didn't want to book a Genius Bar appointment on my wedding day, I shut down my computer and went to bed in a huff (I prefaced my availability and was still asked..._bruh_).

Fast-forward a few days and I'm talking to a nice Genius about my computer issue (and Nintendo Switch, he's trying to justify buying one). He performs many of the same things I did to try and get my computer to work. Lo and behold, my computer lives! It breathes! It scrolls the wrong direction by default (Natural Scrolling is WRONG, you **heathens**)! I eagerly head home to perform a three-hour restore from my Time Machine.



### I done goofed

I went through the same recovery process I've done days prior. What did I see? GHOST. BUSTERS! Managed to get into Recovery Mode to try for the last time, restoring via Time Machine, even though I knew it would end in error. First though, I should reformat the drive with Apple's File System (APFS)...**Could not create a preboot volume for APFS install**. Welp. Time to fire up the iPad to search for solutions.



### Salvation

After scouring the Internet for some _semblance_ of a solution, I stumbled upon [a post](https://discussions.apple.com/thread/8106654 "FIX- Could not create a Preboot Volume for APFS install, on Apple Support") on Apple's own support forums by a user named Ethoic. Here is that post in full:

> Right Mac users. If your facing the same problem like me then I suggest you listen up. First don't try to install Mac OS high Sierra again or try anything else. You want to first of delete your drive until you have no drive. Yes I mean no drive. To do this, power off your Mac and then hold command + R and boot up your Mac. This should do the trick. Then delete your drive in disk utility by clicking the minus button on the top right and then enter internet recovery mode by repeating the process though this time adding option and then command + R. Then you will enter the same menu which is mac os utilities and then this time instead of Mac OS High Sierra you will just see Sierra. Go disk utilty  and create a disk this time clicking  + and make a drive calling it Macintosh HD with the format Mac OS Extended. The fix is your removing the APFS system which is what is confusing the drive which for some reason apple can't figure out them self. Then just click install Mac OS and you should be good to go. Hope your all good and ask anything you need.

Let's break that down into steps for ease of reading:

1. Don't try to install macOS High Sierra again.
2. Delete your drive until you have no drive. Seriously.
    - Power off your Mac and then hold the `Command + R` keys while booting.
    - Delete your drive in Disk Utility. You should only see the macOS Recovery Drive. **Leave this alone.**
3. Reboot Mac and hold down the `Option + Command + R` keys to activate Internet Recovery mode. Oh yeah, you'll need wifi. Make sure you're connected.
4. You should see a drive in Disk Utility. If you don't see a drive and are unable to click the little plus button to create one, reboot until you do..._this was a little weird for me, might not happen to you_.
    - If you do see a drive, reformat it as "**Mac OS Extended**" and call it "**Macintosh HD**".
    - There are a couple options for "Mac OS Extended". If you have a Time Machine backup you want to keep, know that you should choose "Case sensitive" if you setup your OS to be case sensitive (as an example).
5. Initiate Internet Recovery.
6. Once the recovery is successful, use Migration Assistant to restore from a Time Machine backup.

Restoring from Time Machine from scratch has NEVER worked for me and seemingly, 99% of the Internet. Absolute trash IMO. I'm glad I got my data back but jeez. So many hours of my life _wasted_ because of this issue. And the productivity loss (but Super Mario Odyssey _gains_)! Oh, and I'm not on the macOS beta anymore, haha. Other folks who have the same issue didn't seem to be on a beta OS but you can never be too sure.

If you are currently on a macOS beta and would like to [hop off that train](https://superuser.com/a/845520 "How can I get off the OS X beta track?, on SuperUser"):

> On `System Preferences → App Store` you have an option called "Your computer is set to receive pre-releases Software Update seeds", use the button `Change` and select `Do Not Show Pre-release Updates`.

Hope this helps! 🕸
