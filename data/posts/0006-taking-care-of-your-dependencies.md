---
title: "Taking care of your dependencies"
slug: taking-care-of-your-dependencies
date: 2018-12-24 12:00
published: false
---
If you've been working recently with Node (or Javascript in general) you've probably seen many complaints and/or jokes about the infamous weight of `node_modules` folder.

There're plenty of opinions about this issue. From "It's NPM's fault" to "It's developer's fault". I'm with the latter.

## Realization

I've been working with Node for many years now, frontend and backend projects, simple and complicated ones. I'm not sure about many things, but this one is an exception:

We can do much better when handling dependencies.

When you add a dependency to your project, you add a point of failure too, a portion of your project that you can't control anymore, not even when you use package locking. I'm not saying "never add dependencies", but a little bit of code is much better than a little dependency.

<blockquote class="twitter-tweet">
    <p>Of course - I try to write code with zero dependencies - code I wrote 25 years ago with zero dependencies still works today. Code I wrote 5 years ago with external dependencies often fails.</p>
    <p>It’s my contribution to the war on entropy.</p>
    <div class="twitter-tweet-bar">
        Joe Armstrong (@joeerl) - <a href="https://twitter.com/joeerl/status/1075291458117271552">See this tweet</a>
    </div>
</blockquote>

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
- You should also think about testing your dependencies.

### Test your dependencies

Many dependencies already have their own tests that need to pass before releasing a new version, and you could argue "well, the dependency already have tests, I'll assume that the dependency works", but reality is way more complicated.

The only way to ensure that your project **actually** works is testing it as a whole, including the dependencies. Or, at least, as many dependencies as you can. It's pretty easy to make tests for dependencies like markdown parsers, cyphers, etc, but it's much harder to test a dependency that is a Twitter client, for example. If you're adding a dependency that is easily testable, you should consider testing it, even with unit tests.

Let's say that you add a library that manages JWT tokens (building, parsing, validation...) and one day that library gets updated or you decide to change the dependency to use another one that you consider is a better option. Wouldn't be handy to have tests for that? This is because, once you add a dependency to your project, that dependency becomes a functional part of your project, becomes a responsability of yours, that also needs proper testing as any other part of your project.

Testing your dependencies is a way to protect yourself from them, and make them easily replaceable.

## The responsible developer's toolkit

I'll leave here the tools I currently use to analyze npm packages before adding them as a dependency. Or to analyze my own projects.

Suggestions are welcome! Make a PR to [this article on GitHub](https://github.com/Sirikon/sirikon.me/blob/master/data/posts/0006-taking-care-of-your-dependencies.md) or [contact with me](/about).

- [Bundle Phobia](https://bundlephobia.com): Enter the name of a npm package and get the size it will add to your bundle, including handy info like the size of each of it's dependencies or the time it could take to download it in 2G/3G conectivity. It's oriented to bundle size analysis for frontend development.
- [Package Phobia](https://packagephobia.now.sh/): Similar to Bundle Phobia but way simpler. Enter a npm package and get it's installation size and the published size (or the size of just the npm package itself).
- [Cost of Modules](https://www.npmjs.com/package/cost-of-modules): Handy CLI tool that will analyze the dependencies of your current project (in your current folder) and return the size of each dependency and the total size. This one is really helpful because the previous ones might have problems analyzing some packages. For example `node-sass` will download a binary file once it's installed, and that will not reflect on Bundle Phobia, while Package Phobia will fail. Also, this allows you to check sizes in the operating system of your choice (as dependencies might vary).
