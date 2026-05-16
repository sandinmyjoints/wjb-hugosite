---
title: Fixing 'Failed to ping backend API' Docker error on macOS
date: 2021-11-08 10:12:05
tags: ["docker", "macos"]
---

I recently upgraded to an M1 Macbook Pro running macOS Monterey, and at first,
Docker seemed to run fine. I was able to build my containers and do a lengthy
database import.

A day later, when I started Docker, nothing happened for a minute, then I saw
an error modal saying "Failed to ping backend API". The modal offered a few
buttons such as resetting to factory defaults, but 1) I really didn't want to
reset and lose my containers, including that lengthy database import, and 2)
the buttons did not work anyway -- I got a beachball cursor if I tried to
click them.

I quickly found [this issue](https://github.com/docker/for-mac/issues/5037)
with lots of folks reporting the same problem. It was still open, with no
progress in sight. There were several reported fixes, and I tried the ones that
seemed possibly applicable to my case, mostly around giving Docker additional
privileges through System Settings -> Privacy, including Full Disk Access,
Automation control of Terminal.app, and Developer Tools. I continued to get
the same error. Nothing was left except the brute-force approach of
[uninstalling Docker via command
line](https://docs.docker.com/desktop/mac/troubleshoot/#troubleshoot), which
again, I really didn't want to do.

I opened Console.app just to have a look at what happened when I launched
Docker. As usual, a flood of output scrolled past, plenty of it from Docker.
One snippet that caught my eye was this:

```
unlocking leaked directory locks: 2 errors occurred:
	* modifying existing entry for /Users/william/scm/sd/sd-playground/config: getting qualifier in ACL entry &{0x13700ba10} for /Users/william/scm/sd/sd-playground/config: mbr_uuid_to_id: No such file or directory
	* modifying existing entry for /Users/william/scm/sd/sd-playground/src: getting qualifier in ACL entry &{0x13800d810} for /Users/william/scm/sd/sd-playground/src: mbr_uuid_to_id: No such file or directory
```

sd-playground is a source-controlled directory containing an application I
work on for my job at [SpanishDict](www.spanishdict.com/). It contains a
Dockerfile and a container is from it by our application stack. I was curious
why these subdirectories were singled out with this error, so I searched on
"mbr_uuid_to_id" and found...nothing very useful. The other part that grabbed
my eye was the mention of an [ACL](https://linux.die.net/man/5/acl) -- I
didn't see any reason these directories should have ACLs, as I've never used
that feature. I noticed something strange when I did `ls -l` on them:

```
$ ls -ld config
drwxr-xr-x+ 10 william  staff   320B Oct  6 13:57 config/
```

The plus sign in the rightmost column stood out, so I searched on that and
[found](https://serverfault.com/a/227858) that it signifies the presence of
extended permissions called -- wait for it -- ACLs. Some more searching, and I
found that I could see the actual ACL with the `-e` flag:

``` text
$ ls -lde config
drwxr-xr-x+ 10 william  staff   320B Oct  6 13:57 config/
 0: 247BA062-6ABD-446F-80B7-6BE861CFCA42 deny delete
```

Mostly, I wanted to remove the ACL since I saw no use for it, and figured it
might get rid of one problem bothering Docker. `chmod 755 config` didn't do
it, but [`chmod -N` did the trick](https://superuser.com/a/299912):

``` text
$ chmod -N config
$ ls -lde config
drwxr-xr-x  10 william  staff   320B Oct  6 13:57 config/
```

I figured this was unlikely to fix Docker, but when I restarted Docker.app, to
my surprise, it came up! Obviously, it would be helpful if Docker for Mac
could surface errors like this for the end user, so they don't have to go
spelunking in the system logs.
