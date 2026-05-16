---
title: About
date: 2010-09-19
---

By day, I get to work with incredibly smart, talented, and all-around great
people at [Curiosity Media](http://www.curiositymedia.com) (now part of
[IXL](https://www.ixl.com/)), where I'm an engineer for [SpanishDict.com](http://www.spanishdict.com) (también [en
español](http://www.ingles.com)! & [French](https://www.frenchdictionary.com)
/ [le français](www.anglais.com)), the world's best
language learning and reference websites.

I divide the rest of my time between working on my own
[projects](#projects-talks-etc), both software and otherwise; hiking and
backpacking; cooking and grilling; and enjoying the company of my
wife and daughters. I also write, both [blog posts](/) and [fiction and
essays](#publications) now and then.

My most recent project is
[Nicer.email](https://chrome.google.com/webstore/detail/niceremail-easiest-chatgp/abncbkabpogmedlafpfdfafnfkafieke?hl=en&authuser=0),
the easiest, simplest Gmail AI extension (no prompts!).

## Projects, Talks, Etc.

### [Nicer.email](https://chrome.google.com/webstore/detail/niceremail-easiest-chatgp/abncbkabpogmedlafpfdfafnfkafieke?hl=en&authuser=0)

[Nicer.email](https://chrome.google.com/webstore/detail/niceremail-easiest-chatgp/abncbkabpogmedlafpfdfafnfkafieke?hl=en&authuser=0) is
the easiest, simplest Gmail AI extension (no prompts!).

### [equivalency](https://github.com/sandinmyjoints/equivalency)

Declaratively define rules for string equivalence so you can focus on the differences that matter.

### [anybar-webpack-plugin](https://github.com/sandinmyjoints/anybar-webpack-plugin) and [rollup-plugin-anybar](https://github.com/sandinmyjoints/rollup-plugin-anybar)

Webpack build status indicators using [Anybar](https://github.com/tonsky/AnyBar).

### [ema-stream](https://github.com/sandinmyjoints/ema-stream)

A Node module and command line tool to calculate an [exponential moving average from a stream](https://github.com/sandinmyjoints/ema-stream).

### [If everyone would](https://twitter.com/ifeveryonewould) (RIP)

A Twitter bot that helpfully retweets tweets containing the phrase "if everyone would".
[Source](https://github.com/sandinmyjoints/ifeveryonewould).

### [What's my UA?](http://www.whatsmyua.info/)

See what your user-agent detection library really thinks! Results from three top
ua detection libs:

* https://github.com/tobie/ua-parser
* https://github.com/faisalman/ua-parser-js
* https://github.com/bestiejs/platform.js/

### [Node on the Road](https://www.joyent.com/noderoad/cities/washington-dc-8-20-2014)

In August 2014, I was a presenter and panelist when
[Node on the Road visited Washington, DC](https://www.joyent.com/noderoad/cities/washington-dc-8-20-2014).

### Conversations and Connections

In April 2014, I discussed my experience co-curating
[Call + Response](http://callandresponsedc.org/) during the "Let's Make Stuff
Together: Collaboration in Writing" panel at the 2014
[Conversations and Connections conference](http://writersconnectconference.com/).

### [Towards 100% Uptime with Node](http://sandinmyjoints.github.io/towards-100-pct-uptime/)

I gave a talk at the
[December 2013 Nova Node](http://www.meetup.com/Nova-Node/events/154016332/)
meetup called
["Towards 100% Uptime with Node.js"](http://sandinmyjoints.github.io/towards-100-pct-uptime/).
It explained how to keep Node apps running all the time by sensibly handling
uncaught exceptions, using domains to contain errors, managing processes with
the cluster module, and gracefully terminating TCP connections when necessary.

### The Little Schemer

In the spring of 2013, I read the classic functional programming book
[The Little Schemer](http://www.goodreads.com/book/show/548914.The_Little_Schemer).
[I did the exercises](https://github.com/sandinmyjoints/the-little-schemer) and
learned a lot from them -- highly recommended!

### [Zero to Node](http://sandinmyjoints.github.com/zero-to-node/)

I gave a talk at the [November 2012 Nova Node meetup](http://www.meetup.com/Nova-Node/events/89366852/) titled [Zero to Node: A Case Study of Deploying Node in Production](http://sandinmyjoints.github.com/zero-to-node/). It was about my experience building a text-to-speech service powered by Node.js during my first month at SpanishDict, covering topics such as:

* Node.js basics.
* How to structure an Express app.
* Learning to think asynchronously, using events, streams, and pipes.
* Writing a Chef cookbook to deploy a Node app to Amazon Web Services.
* Monitoring an application for high performance.

### [Visularity](https://github.com/sandinmyjoints/visularity)

[Visularity](https://github.com/sandinmyjoints/visularity) is a web app for visualizing semantic similarity that I wrote as a demo for [a talk I gave at the May 2012 DC Python Meetup](/2012/05/an-introduction-to-gensim-topic-modelling-for-humans/). When provided with data representing a large corpus of documents (for example, Wikipedia articles), Visularity will cluster words that appear in the corpus by how close they are in meaning. This is accomplished through a technique called latent semantic analysis, implemented via [Gensim](http://radimrehurek.com/gensim/), a Python topic modelling library. For clustering, I used [scipy](http://www.scipy.org/) and [scikit-learn](http://scikit-learn.org/stable/), and for visualization, I used [d3.js](http://d3js.org/). To make it all work in realtime, I used [hookbox](https://github.com/hookbox).

### [An Introduction to Gensim](/2012/05/an-introduction-to-gensim-topic-modelling-for-humans/)

I gave a talk at the [May 2012 DC Python meetup](http://meetup.dcpython.org/events/23832731/) titled [An Introduction to Gensim: Topic Modelling for Humans](/2012/05/an-introduction-to-gensim-topic-modelling-for-humans/). It discussed Gensim, a Python library, a free Python framework for topic modelling and semantic similarity using latent semantic analysis/indexing and other statistical techniques as efficiently (computer-wise) and painlessly (human-wise) as possible.

### Doread.me

In Spring 2012, I developed a web app (fancy name for a website with some
additional functionality) called doread.me that presents a new story every day,
drawn automagically from literary journals across the internet. I used
[Django](http://www.djangoproject.com), third-party Django apps including Zinnia
and South, and a lot of JQuery.
I retired the site a few years ago, but [the source is available on github](https://github.com/sandinmyjoints/doreadme).

### Readsr

During the first half of 2011, I worked on a web app that tracks literary
reading series in cities. It's called [Readsr](http://www.readsrs.com) and was
created with [Django](http://www.djangproject.com) and various third-party apps
and libraries. I retired the site a few years ago.

### Other Web Projects

At any given time, I'm probably working on several web development projects. The best way to see what I'm up to is visit my [github profile](https://github.com/sandinmyjoints).

### 2011 DC Young Artist Grant

I was awarded a [2011 DC Young Artist Grant](http://thedcarts.wordpress.com/2011/01/04/the-commission-is-proud-to-announce-our-fy-2011-grantees/#YAP). I am immensely grateful to the DC Commission on the Arts and Humanities for this honor. My grant activities included:

* Leading student writing workshops at [826DC](http://www.826dc.org) to further the development of DC's young writers.
* Giving readings of my work for the DC community, including at the lowercase, a monthly reading series at [Big Bear Cafe](http://bigbearcafe-dc.com/blog/) in DC's Bloomingdale neighborhood that is sponsored by 826DC.
* Submitting my stories to a number of writing contests at respected literary journals.
* Attending the [Association of Writing Programs 2011 conference](http://www.awpwriter.org/conference/2011awpconf.php) in Washington, DC.
* Attending a writer's retreat at [Doe Branch Ink](http://doebranchink.org/) near Marshall, North Carolina, in spring 2011.

### Call + Response

[Call + Response](http://www.callandresponsedc.org) is an art show pairing
writers and artists. My friend Kira and I started it and co-curated the first
three installments, which were shown at
[Hamiltonian Art Gallery](http://www.hamiltoniangallery.com/) in Washington, DC.

1. The [first Call + Response](http://callandresponsedc.org/2010/) ran from January 23 to February 13, 2010.
2. The second, [Call + Response: Textures](http://callandresponsedc.org/2011), ran from April 16 to April 28, 2011.
3. The [third Call + Response](http://callandresponsedc.org/2012/) ran from June 2-16, 2012.

I am not involved anymore, but Kira continues to create awesome new installments
of Call + Response!

### 826DC

[826DC](http://www.826dc.org) is a youth writing center that I helped found. At
various times during its existence I've been a board member (when it was
initially incorporated as Capitol Letters Writing Center), maintained its
website, thought of products and written copy for the [Museum of Unnatural
History](http://826dc.org/?page_id=24) (including all the copy for the Species
Identification Chart pictured below), and led and TAed many workshops, including
some of the ones that led to _[Get Used to the Seats](http://826dc.org/?p=510)_
and _[The Way We See It](http://826dc.org/?p=512)_. Most recently, in November
2010, I led a workshop series for middle schoolers called [_Caught in the Act_](/2010/11/caught-in-the-act-part-3/), and I
served as Secretary of the Board up through February 2011.

[![Museum of Unnatural History Species Identification Flowchart](/images/826dc_flowchart_11.jpg)](/images/826dc_flowchart_11.jpg)

### Yesterdaze

The Beatles' Yesterday is one of the most covered songs in history. In college,
I mashed up a bunch of the covers to produce this agglomeration.

<iframe style="display: block; margin: 0 auto 20px;" width="560" height="315" src="https://www.youtube-nocookie.com/embed/oWJxSJ-DTtc?rel=0" frameborder="0" allowfullscreen></iframe>

## Publications

[DIAGRAM, Issue 12.6](http://thediagram.com/12_6/rev_reitz.html) - Review of Requests 1.0

[FUSION, Spring 2012](http://www.fusionmagazine.org/wp-content/uploads/2012/09/2fusion.vol3_online_10.9.12.pdf) - "Canyon" (short story)

[Don't Forget to Write for the Secondary Grades: 50 Enthralling and Effective Writing Lessons](http://www.amzn.com/111802432X) from [826 National](http://www.826national.org/) - "Busted" (lesson plan)

[Anomalous Press, March 2011](http://www.anomalouspress.org/current/21.bert.winner.php) - "Winner" (short story)

[Brightest Young Things, August 2009](http://www.brightestyoungthings.com/music/the-future-is-now-an-interview-with-mike-and-andrew-from-future-times/) - The Future Is Now: An Interview with Mike and Andrew from Future Times [record label]

[pacificREVIEW, 2008](http://pacificreview.sdsu.edu/casa1.html) - "In the Altogether" (short story)

[Colorado Review, Winter 2007](http://coloradoreview.colostate.edu/cr/cont/TOC_w07.pdf) - Review of _Five Skies_ by Ron Carlson

Sonora Review, Issue 52, Fall 2007 - Interview with Ron Carlson

Sonora Review, Issue 52, Fall 2007 - Review of _The Children's Hospital_ by Chris Adrian

[Pittsburgh Post-Gazette, October 17, 2007](http://www.post-gazette.org/pg/07290/825917-44.stm) - Interview with Kirk Nesset

[Static Multimedia, 2005 - 2007](http://www.google.com/search?q=site%3Astaticmultimedia.com%20william%20bert&hl=en) - Reviews of new music and DVD releases
