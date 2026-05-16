---
title: How HTML5 sandboxes could be so much more useful
date: 2015-10-19 17:27:18
tags:
---

I love the idea of
[HTML5 iframe sandboxes](http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/)
but I'm unable to apply them the way they are currently implemented.

Why? Because the iframes I want to target are created programmatically. I'm not
writing the `iframe` tags myself, or the code that writes them, so I can't
specify the `sandbox` attribute.

[www.spanishdict.com](http://www.spanishdict.com) is an ad-supported site, like
many other sites out there. We use Google Publisher Tags (GPT) which creates a
cross-origin iframe for each ad slot on the page -- automatically.

![unsandbox iframes in unsandboxed iframes](https://cldup.com/hi7ND3UGrI.png)

We have relationships with several different ad companies. On every pageview, we
load a script from each company so they can evaluate the impression and make
their bid (a technique known as
["header bidding"](http://blog.pubnation.com/when-ads-compete-you-win-ad-optimization-using-header-bidders/)).

Then the winner of the bid gets to load their creative, which they typically do
by creating another cross-origin iframe within the iframe that GPT created and
has given them access to. Sometimes you'll see several layers of iframe nesting.

These iframes are all created programmatically. Because I don't create the
iframes (or know anything about them ahead of time such as what domains they're
going to come from), I can't add the `sandbox` attribute, which makes it useless
for me.

## In my ideal world

Ideally, I could set sandboxing to apply to the cross-origin iframes I know *are
going to be created* on my page.

<!-- more -->

I'd love to be able to say: for all cross-origin iframes, use sandboxing, with
the following rules:
* no top navigation
* no popups
* no autoplay audio or video
* can run scripts
* can access data for its domain
* iframe scripts execute at a lower priority than scripts from the top window

Something like:

```
<html iframe-sandbox-template="allow-script allow-same-origin allow-forms">
```

(I stuck it on the `html` tag for lack of a better place to put it. Or maybe it
could go in a header.)

With that in place, as the ads created their iframes, sandboxing would be in
effect, and I'd know that no top navigation will take my users somewhere they
don't want to go, no popups will annoy them, etc. The potential of sandboxes,
fulfilled!

(That last rule up above about lower priority doesn't actually exist, but in my
ideal world, it would. I noticed that
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop) says:
"A web worker or a cross-origin iframe has its own stack, heap, and message
queue." Which gives me hope that this could be implemented. Prioritizing the top
window's code over the ad code would lead to a better user experience, making
the page and interactions with it feel snappy. When the ad code (initial flurry
of bids, followed by delivery of creatives) competes with our application code,
the result is jank and a feeling of heaviness/unresponsiveness that we and our
users *hate*.)
