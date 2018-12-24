---
title: "Taking care of your dependencies"
slug: taking-care-of-your-dependencies
date: 2018-12-24 12:00
published: false
---
If you've been working recently with Node (or Javascript in general) you've probably seen many complaints and/or jokes about the infamous weight of `node_modules` folder.

There're plenty of opinions about this issue. From "It's NPM's fault" to "It's developer's fault". I'm with the latter.

## Realization

I've been working with Node for many years now, frontend and backend projects, simple and complicated ones. I'm not sure about many things, but this one is an execption:

We can do much better when handling dependencies.

When you add a dependency to your project, you add a point of failure too, a portion of your project that you can't control anymore, not even when you use package locking. I'm not saying "never add dependencies", but a little bit of code is much better than a little dependency.

(Find elexir's creator tweet about dependencies)

Let me tell you something: npm isn't community driven, **it's a company**. As a company, it have commercial interests. They do what they do just because it's profitable. Companies born and die, because commercial interests born and die too. If you've a dependency as a npm package, and some day npm isn't there anymore (or just the package isn't there anymore), well, your project will not work anymore.

To summarize: The less external dependencies, the better. The probability of a dependency of yours being deleted from npm will be lower, and the amount of external code that you'll probably end up debugging any time, will be lower too.

But today's reality is: We are the ones choosing a bloated library, with millions of dependencies and features, just for using one of them, instead of looking for a more lightweight one. _Do one thing and do it well._

We are the ones including a CLI tool framework inside our library "just in case someone needs it as a CLI tool", instead of providing two packages that share a core functionality and build a library API or a CLI on top of it.

We are the ones including data collection mechanisms into our libraries so we can know who is installing it, or where, instead of... just not doing that.

We are the ones needing a library for a left pad or checking if a string is a valid email instead of writting it by ourselves.

## Taking action

So you want to take care of your dependencies. Glad to hear!

At this point you should already know what to do, but to summarize:

- Write some code instead of adding little dependencies to your project.
- Choose single-feature libraries over full-featured libraries or frameworks. You **can** do this, as Node's standard library is pretty decent and you can do a lot of things with it.
- Choose lightweight dependencies over heavy ones.

(Talk about importance of tests).
