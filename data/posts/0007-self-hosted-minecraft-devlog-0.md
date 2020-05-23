---
title: "Self Hosted Minecraft: Devlog #0"
slug: self-hosted-minecraft-devlog-0
date: 2020-05-23 16:12
published: true
---

I recently found myself in the endeavor of hosting Minecraft on my own. Not relying on specialized game-hosting companies and start with a fresh install of Ubuntu instead, and build from there.

But I'll not throw a bunch scripts to the server to launch Minecraft and call it a day. Being owners of our own entertainment is something important enough to, at least, try to make a solution that is user friendly, efficient, simple, and most importantly, respects the user's freedom.

Why this interest? It all started with a bad experience with a game-hosting company, of course.

## All I need is a Minecraft Forge server for four people

Asked a friend about a hosting company that he had good experience with and offered Minecraft Servers as a service. He recommended me AwfulHosting(TM) because he had good experience and fair price like a year ago. Fair enough, I gave it a try.

Installing Forge and launching the server for the first time worked just right, but from that point, problems started to emerge.

- Tried to upload the required mods. It didn't work on the web-based file browser
- Tried to connect to the FTP server provided by AwfulHosting(TM), but it didn't even connect
- After some hours, could upload the mods, but added an extra mod that wasn't needed... then tried to delete it, and deletion didn't work. Not deletion, renaming, or moving files. Just uploading worked.
- FTP didn't connect yet.

With all those problems, opened a new support ticket to request some help. Received one of those typical ACK emails that summarizes to:

> Received your message. We'll reply back in a maximum of 7 hours.

They didn't reply until **30 hours later**. 30 hours in which both web and FTP kept failing, obviously.

In their web page it said that you could ask for a refund if there was some technical issue out of their control, so I asked for a refund. The reply was that they couldn't refund me **4€** because they had to fix the FTP issue first. My last message was "Ok, keep the 4€, just cancel the service". 

Here I am, still waiting for a service cancellation, two days later, while thinking: There has to be a better solution.

## So, where do we start

Paraphrasing all the start-up gurus, I'll start with an MVP. And an MVP means doing exactly the thing I said I wouldn't do at the start of this post: Throw some scripts to the server to make Minecraft run. It wasn't ideal, but it worked. And most importantly, we had **a starting point**.

It didn't even worked well because the JVM was eating all the resources of the VPS, but we had something to start with.

In the following episodes I'll be talking about all the steps I'm taking to have a piece of software that lets anyone host and manage their own Minecraft servers, so you don't depend on some crappy hosting company that just wants your cash without giving much in return.

I'll be learning a lot for sure. And hope that anyone reading this learns something, too.
