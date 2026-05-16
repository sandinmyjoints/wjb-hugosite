---
title: 'Docker for Mac: the Missing Manual'
date: 2017-12-29 09:20:38
tags: ["docker,", "docker", "for", "mac,", "osx,", "macos,", "docker-sync,", "overlay2,", "aufs"]
---

Under the hood, [Docker for Mac](https://www.docker.com/docker-mac) is running
an [Alpine Linux](https://www.alpinelinux.org/) virtual machine. This guide
helps with issues related to communication between OS X/macOS and this VM, and
running up against limits on the size of the disk allocated to the VM.

* [Speeding things up](#Speeding-things-up)
  * [Disable sync on flush](#Disable-sync-on-flush)
  * [overlay2 storage engine](#overlay2-storage-engine)
  * [Docker-sync](#Docker-sync)
* [Freeing disk space](#Freeing-disk-space)
  * [Diagnosis](#Diagnosis)
  * [Subproblem 1: removing unneeded images and containers](#Subproblem-1-removing-unneeded-images-and-containers)
  * [Pruning volumes](#Pruning-volumes)
  * [Alternative](#Alternative)
  * [Subproblem 2: reclaiming space for VM and host](#Subproblem-2-reclaiming-space-for-VM-and-host)
* [Getting a shell in the VM](#Getting-a-shell-in-the-VM)
  * [Alternative: attach to tty](#Alternative-attach-to-tty)
* [More!](#More)

## Speeding things up

### Disable sync on flush

This speeds up write operations involving containers. The tradeoff is increased
risk of data loss: pending writes will be lost if your computer, Docker, or a
container crashes. Since Docker for Mac is used for development, not production,
this may be a good tradeoff to make. Here's how:

<script src="https://gist.github.com/mkrakauer-rio/e7d9de75f5ac680e790365748ca188a4.js"></script>

##### References:
- https://gist.github.com/mkrakauer-rio/e7d9de75f5ac680e790365748ca188a4
- https://dzone.com/articles/docker-for-mac-performance-tweaks-1

### overlay2 storage engine

If you installed Docker for Mac a while ago, it's probably using the aufs
storage engine. overlay2 is a newer, more performant storage engine. From
<https://docs.docker.com/engine/userguide/storagedriver/selectadriver/#docker-ce>:

> When possible, overlay2 is the recommended storage driver. When installing
> Docker for the first time, overlay2 is used by default. Previously, aufs was
> used by default when available, but this is no longer the case.

> On existing installations using aufs, it will continue to be used.

Elsewhere, this page says:

> Docker for Mac and Docker for Windows are intended for development, rather
> than production. Modifying the storage driver on these platforms is not
> possible.

But this is not true: you *can* use overlay2 with Docker for Mac.

<!-- more -->

Switching storage engines changes where Docker looks for containers and images,
so none of the ones you had with the old storage engine will be found. When you
build images, Docker will download new ones to be stored using the new storage
engine. Once you're happy with the new storage engine, you can temporarily
switch back, delete all the images and containers associated with the old one,
and then return to the new storage engine.

Not sure if you need to switch? Check first:

    docker info | grep "Storage Driver"
    # If it's overlay2, you're good. If it's aufs, continue with the next steps.

To switch, go to Docker, Preferences, Daemon, Advanced, and add the following
key/value pair to the json in the box:

``` json
{
  "storage-driver": "overlay2"
}
```

Click Apply & Restart.

##### References:
- https://docs.docker.com/engine/userguide/storagedriver/selectadriver/#docker-cea
- http://markshust.com/2017/03/02/making-docker-mac-faster-overlay2-filesystem

### Docker-sync

Some people use Docker-sync for better performance, especially when using PHP
projects like Symfony or Drupal. I haven't used it myself, so here's where to
learn more:

- http://docker-sync.io/
- https://spin.atomicobject.com/2017/06/20/docker-mac-overcoming-slow-volumes/

## Freeing disk space

The VM disk has a limit on how big it can grow, so it can run out of space,
resulting in errors when trying to build images.

Additionally, you may want to reclaim space from the VM disk image for your own
use, particularly if you know that you are storing images and containers that
you no longer need.

### Diagnosis

What size is your VM's disk?

    $ /Applications/Docker.app/Contents/MacOS/qemu-img info ~/Library/Containers/com.docker.docker/Data/com.docker.driver.amd64-linux/Docker.qcow2
    image: /Users/william/Library/Containers/com.docker.docker/Data/com.docker.driver.amd64-linux/Docker.qcow2
    file format: qcow2
    virtual size: 64G (68719476736 bytes)
    disk size: 53G
    cluster_size: 65536
    Format specific information:
        compat: 1.1
        lazy refcounts: true
        refcount bits: 16
        corrupt: false

64G for the VM. How much space is left on it?

    $ docker run --rm --privileged debian:jessie df -h
    Filesystem      Size  Used Avail Use% Mounted on
    overlay          60G   51G  5.2G  91% /
    tmpfs            64M     0   64M   0% /dev
    tmpfs           3.0G     0  3.0G   0% /sys/fs/cgroup
    /dev/sda2        60G   51G  5.2G  91% /etc/hosts
    shm              64M     0   64M   0% /dev/shm

Only 5.2G left on `/`! Pull a few more big images, or build a large project
inside a container, and this VM could run out of space.

### Subproblem 1: removing unneeded images and containers

1. Start containers that you know you want to keep.

1. Using [Spotify's docker-gc](https://github.com/spotify/docker-gc), do a dry
   run to see what would be deleted:

    $ docker run --rm -e DRY_RUN=1 -v /var/run/docker.sock:/var/run/docker.sock -v /etc:/etc:ro spotify/docker-gc

1. If that looks good, do the real thing:

    $ docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v /etc:/etc:ro spotify/docker-gc

##### References:
- https://www.ghostar.org/2016/10/docker-for-mac-tips-troubleshooting/
- https://github.com/spotify/docker-gc

### Pruning volumes

More about this to come.

    docker volume ls -f dangling=true
    docker system prune --volumes

### Alternative

[docker-clean](https://github.com/ZZROTDesign/docker-clean) provides a nice
wrapper around the actual docker commands.

``` shell
# Install:
$ brew install docker-clean

# Dry run:
$ docker-clean -n
```

### Subproblem 2: reclaiming space for VM and host

Now that unneeded images and containers are gone, we want to reclaim the disk
space they occupied for use by the host and/or the VM.

Docker for Mac (after version 1.12) is supposed to run TRIM every 15 minutes
using a cron job. If you want to manually trigger a TRIM:

    $ docker run --rm -it --privileged --pid=host walkerlee/nsenter -t 1 -m -u -i -n fstrim /var

The first time I tried this, nothing happened until I restarted Docker. After
restarting, hyperkit went to max cpu for hours. While it was running, docker
commands hung. Once it finished, I had to restart Docker again. It had freed up
30 GB!

Since then, it has worked (freeing space on the VM and on the host) without a
restart.

##### References:
- https://docs.docker.com/docker-for-mac/faqs/#how-do-i-reduce-the-size-of-dockerqcow2
- https://stackoverflow.com/a/37642236
- How to resize qcow image: https://gist.github.com/stefanfoulis/5bd226b25fa0d4baedc4803fc002829e

## Getting a shell in the VM

``` shell
docker run --rm -it --privileged --pid=host walkerlee/nsenter -t 1 -m -u -i -n sh
```

##### References:
- http://blog.kontena.io/docker-for-mac-glibc-issues/ (provides full explanation
  of all the flags)

### Alternative: attach to tty

``` shell
$ brew install screen
$ screen ~/Library/Containers/com.docker.docker/Data/com.docker.driver.amd64-linux/tty
```

This isn't really getting a shell, but rather using GNU screen to connect to a
tty device. Don't exit the shell; instead, tell screen to detach by typing
`Control-a d`. To re-attach:

``` shell
$ screen -ls
# lists screen session that is still open

$ screen -dr
# re-attaches to open session
```

If you simply attach screen again, the terminal text will be garbled.

##### References:
- https://gist.github.com/BretFisher/5e1a0c7bcca4c735e716abf62afad389s

## Problems with tar

macOS uses GNU tar. Inside a Linux-based image, the tar that's available is
likely GNU tar. If you encounter errors like "Directory renamed before its
status could be extracted", they might stem from running GNU tar inside an image
on a tarball created by BSD tar (outside of the image).

Try either:

1. Install GNU on your host and use it:

``` shell
brew install gnu-tar
gtar ...
```

2. Or use BSD tar inside the image by installing it in your Dockerfile:

```
FROM ...

apt-get update -qq
apt-get install -qqy --no-install-recommends bsdtar

RUN bsdtar ...
```


## More!

Got more tips? This is a living document. Please leave a comment below.
