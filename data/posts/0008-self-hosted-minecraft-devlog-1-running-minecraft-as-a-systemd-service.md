---
title: "Self Hosted Minecraft: Devlog #1. Running Minecraft as a Systemd Service"
slug: self-hosted-minecraft-devlog-1-minecraft-systemd-service
date: 2020-05-23 16:12
published: false
---
The official Minecraft Server implementation is written in Java. As of today, the recommended JRE version for Minecraft is **Java 8**.

You could make it work with Java 11 or later, but what I was trying to host was Minecraft Forge 1.12.2, which [only works with Java 8](https://www.minecraftforge.net/forum/topic/73597-starting-forge-1122-with-java-11-solved/?tab=comments#comment-353851). Even if we were using a more up-to-date version of Minecraft, the server performs better in terms of stability with Java 8, so, we'll stick with that version for now.  

Once you have Java available in your `PATH`, running Minecraft Server is really straightforward:

```bash
java -jar minecraft_server.jar
```

That command will start an **interactive** process, that provides both the backend for the server *and* a command line interface for interacting with it. Having this interactive shell is useful for performing maintenance tasks, but we want the process to run as a service using Systemd and get automatic restarts if it fails, start on boot, etc. So... how can we do that?

First, let's create a simple Systemd `.service` file for our server:

```bash
[Unit]
Description=Minecraft
After=network.target

[Service]
Restart=on-failure
RestartSec=3
WorkingDirectory=/srv/minecraft
ExecStart=/usr/bin/java -jar minecraft_server.jar

[Install]
WantedBy=multi-user.target
```

This service described as `Minecraft` will run `/usr/bin/java -jar minecraft_server.jar` on the directory `/srv/minecraft`. If the process exists [with any other state than a successful one](https://www.freedesktop.org/software/systemd/man/systemd.service.html#Restart=), it will be restarted after `3` seconds. Also, it's gonna start on system's boot, right after networking is available.

That's the most common Systemd service definition, but it will run Minecraft on the background without interactivity. To make the process run in background **and** maintain interactivity, we can use [GNU Screen](https://www.gnu.org/software/screen/) and some tweaking on our Systemd service definition.
