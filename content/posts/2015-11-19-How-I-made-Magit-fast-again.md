---
title: How I made Magit fast again
date: 2015-11-19 15:51:54
tags: ["magit", "emacs"]
---

TLDR: here are the settings that made the biggest difference for me. YMMV.

```lisp
(setq magit-commit-show-diff nil
      magit-revert-buffers 1)
```

[Magit](http://magit.vc/) is awesome. And it's getting better with regular
releases, a more consistent interface, and much more. But since the release of
2.1, it's generally been slower for me.
[I'm not the only one](https://github.com/magit/magit/issues/2104). In
particular, the status buffer would take multiple seconds to refresh after
almost any action such as committing, checking out a branch, stashing/popping,
deleting a file, etc.

Tarsius, Magit's maintainer, is clearly aware of the performance issues and
working to fix them. It can't be easy to diagnose performance problems given the
multitude of ways Magit can be configured, plus the huge variety of
characteristics among all the git repos out there. Nonetheless, I'm sure
performance will improve in future versions.

But I needed to do something about it in the near term. I searched online and
while Magit has a
[page dedicated to perf settings](http://magit.vc/manual/magit/Performance.html#Performance),
none of them helped me much. So I grepped the Magit source for `defcustom` and
read all the docstrings in search of things to try. Here's what I found.

<!-- more -->

## Setting 1: `magit-commit-show-diff`

Docs say: "Whether the relevant diff is automatically shown when committing." In
practice, I found that this added a lot of time to committing. From the magit
status page, I would hit `c c` and wait and wait for the commit message edit
buffer to open. After setting this to `nil`, it opens quickly.

I prefer to review diffs as I stage files and hunks, not before writing the
commit message, so this has the bonus of better matching my workflow.

## Setting 2: tt`magit-revert-buffers`

Docs say: "How file-visiting buffers in the current repository are reverted."
The default value is `usage` which prints a message explaining what this setting
is. Long ago I'd switched it to `silent`: "Revert the buffers synchronously and
be quiet about it."

I want my buffers reverted because it's quite annoying to do work in a buffer whose
underlying file has changed, so the option `nil` (don't revert) was no good. But
I noticed a value I had never seen before:

```
NUMBER    An integer or float.  Revert the buffers asynchronously,
          mentioning each one as it is being reverted.  If user
          input arrives, then stop reverting.  After NUMBER
          seconds resume reverting.
```

This seemed promising. So I tried it with `NUMBER` set to 1. And it feels
**great**. The status buffer can still take a while to finish refreshing, but I
no longer have to wait for it. Emacs is responsive almost right away.

The risk, of course, is that not all buffers have been reverted. However, in
practice, this has not been a problem for me. I haven't encoutered the dread
"buffer has changed since visited. Save anyway?" prompt yet after several days.

The implication of this is that the time it takes to refresh the status buffer
grows with the number of buffers visiting files in a given repo. And my
experience also bears this out: with `magit-revert-buffers` set to `silent`, I
found that the status buffer for a repo took much longer to refresh if I had 100
buffers visiting its files than if I had 20. So if you prefer to keep that
setting, then you can get faster refresh times by vigilantly killing buffers
when you're done working with them.

I went back to `magit-revert-buffers` = 1. With this setting, magit echoes the
names of buffers as it reverts them. They fly by fast but a few times I've
spotted the names of buffers I knew were not part of the repo I was working
with, which leads to me to wonder if Magit might be unintentionally reverting
buffers it doesn't need to revert -- that would be unfortunate.
