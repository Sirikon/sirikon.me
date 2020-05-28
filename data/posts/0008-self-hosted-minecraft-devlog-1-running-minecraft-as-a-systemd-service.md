---
slug: self-hosted-minecraft-devlog-1-minecraft-systemd-service
date: 2020-05-28 22:40
published: true
title: "Self Hosted Minecraft: Devlog #1. Running Minecraft as a Systemd Service"
---
The official Minecraft Server implementation is written in Java. As of today, the recommended JRE version for Minecraft is **Java 8**.

You could make it work with Java 11 or later, but what I was trying to host was Minecraft Forge 1.12.2, which [only works with Java 8](https://www.minecraftforge.net/forum/topic/73597-starting-forge-1122-with-java-11-solved/?tab=comments#comment-353851). Even if we were using a more up-to-date version of Minecraft, the server performs better in terms of stability with Java 8, so, we'll stick with that version for now.  

Once you have Java available in your `PATH`, running Minecraft Server is really straightforward:

```bash
java -jar minecraft_server.jar
```

That command will start an **interactive** process, which provides both the backend for the server *and* a command line interface for interacting with it. Having this interactive shell is useful for performing maintenance tasks, but we want the process to run as a service using Systemd and get automatic restarts if it fails, start on boot, etc. So... how can we do that?

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

That's a pretty common Systemd service definition, but it will run Minecraft on the background without interactivity. To make the process run in background **and** maintain interactivity, we can use [GNU Screen](https://www.gnu.org/software/screen/) and some tweaking on our Systemd service definition.

> Screen is a full-screen window manager that multiplexes a physical terminal between several processes, typically interactive shells. [...] When screen is called, it creates a single window with a shell in it (or the specified command) and then gets out of your way so that you can use the program as you normally would. [...] Programs continue to run when their window is currently not visible and even when the whole screen session is detached from the users terminal.

With Screen we can run a program and **detach it** from our terminal. Then we can **reattach to it** from anywhere.

In the following example, notice the "detached" message inside the terminal on the left. That happens when you use `Ctrl + a` and then `d` (Action -> Detach).

<video autoplay loop>
	<source src="/assets/post-assets/screen-demo.mp4" type="video/mp4">
	Your browser does not support the video tag.
</video>

Running `screen` puts us in an interactive shell to run any program, but we could run `screen` directly with a program of our choice:

```bash
screen ping 8.8.8.8
```

That's running the program `ping 8.8.8.8` directly on top of `screen`. It will keep the same functionality as the previous example of being able to interact and detach, but the screen session will last as long as the specified program. In this case, as soon as you produce a SIGINT (`Ctrl + c`), it will stop `ping` **and** finish the `screen` session.

Now we could run `screen`... but starting the program **detached** from it, instead of attached at start.

```bash
screen -dm ping 8.8.8.8
# -d means "detach"
# -m means "force to create a new session instead of reusing an existing one"
```

You'll notice that running that command produces no output. That's because it starts directly detached, on the background. Run `screen -r` to re-attach to it.

We could even put a "sockname" to the sessions when creating them. The session's name is the combination of the process' PID and the sockname.

```bash
screen -dmS coolping ping 8.8.8.8
```

After that, run `screen -ls` and see the name of the session. It should be something like "xxxx.coolping".

If there's no sockname defined, it gets one by default. Defining a sockname is useful because it lets us re-attach to sessions by a recognisable name, which comes handy when you have more than one session and need to re-attach to an specific one.

```bash
screen -r coolping
# is better than
screen -r 8381
```

Now we have a way to run any program, in the background, keeping interactivity! Let's add it to our Systemd service definition:

```bash
[Unit]
Description=Minecraft
After=network.target

[Service]
Type=forking
Restart=on-failure
RestartSec=3
WorkingDirectory=/srv/minecraft
ExecStart=/usr/bin/screen -dmS minecraft /usr/bin/java -jar minecraft_server.jar

[Install]
WantedBy=multi-user.target
```

Notice that I didn't just prepend `/usr/bin/screen -dmS minecraft` to `ExecStart`. I also added `Type=forking` to the `[Service]` part.

In Systemd there are many types of services. The most simple is, well, `Type=simple`, which considers that a service has a **main** process, the first one. As long as the process is alive, the service is alive too, and will try to restart the service if it finishes, depending always on the restart policy.

But `Type=forking` [is a little bit different](https://www.freedesktop.org/software/systemd/man/systemd.service.html#Type=):

> The parent process is expected to exit when start-up is complete and all communication channels are set up. The child continues to run as the main service process, and the service manager will consider the unit started when the parent process exits.

That's exactly what happens when using `screen`. When running `screen -dmS coolping ping 8.8.8.8` the first process (`screen`) starts a child process (in this case, a wrapped `ping`) and then it finishes, leaving the child process alone. In this scenario, `Type=forking` considers the child process as the new **main** process.

We have covered how to start the service properly, but... how do we **stop** a Minecraft process, in background, inside screen, inside a Systemd service?

To see an example, run again this command we saw earlier in the post:

```bash
java -jar minecraft_server.jar
```

Once the world is loaded (You'll know because there's a message saying "Done!"), produce a SIGINT by typing `Ctrl + c`.

What you should see is Minecraft closing itself **safely**. Disconnecting all the players, saving the world, and finally finishing the process. Minecraft always does this when receiving a SIGINT, and you can send a SIGINT (Or [any other signal](https://www.man7.org/linux/man-pages/man7/signal.7.html)) to any running process, interactively or not.

Screen also receives signals. When a screen session receives a SIGINT, it will send a **SIGINT** to it's **wrapped process**, too.

**And** we can instruct Systemd to send an specific signal when stopping a running service:

```bash
[Unit]
Description=Minecraft
After=network.target

[Service]
Type=forking
Restart=on-failure
RestartSec=3
WorkingDirectory=/srv/minecraft
ExecStart=/usr/bin/screen -dmS minecraft /usr/bin/java -jar minecraft_server.jar
KillSignal=SIGINT
TimeoutStopSec=60

[Install]
WantedBy=multi-user.target
```

`KillSignal=SIGINT` tells Systemd to use a SIGINT whenever it needs to stop the running service. A SIGINT signal provides a process time to stop safely: Persisting data to disk, closing communication channels gracefully, etc.

Systemd also gives a maximum time span for the process to end, and if it doesn't end on time, it will send a SIGKILL, which means killing the process instantly. In our case it's `TimeoutStopSec=60`. Usually a whole **minute** for a process to stop is a lot, but in case of Minecraft it's adequate because **world information is pretty delicate**, and you don't want corrupted maps.

That's all! Hope this post was useful for you. Don't hesitate to [contact me](https://sirikon.me/about/) if you have any questions or comments.

Remember that this devlog is about my process of building [Ourcraft](https://github.com/sirikon/ourcraft), a tool to help you on the endeavor of hosting your own Minecraft server.

See you in the next one!
