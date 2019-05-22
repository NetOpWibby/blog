---
title:      Using nginx and Socket.io
date:       2018-02-09
tags:       code, tutorial
tldr:       Two of my favorite web technologies, together
color:      purple
published:  true
---

When pushing [Socii](https://hub.socii.network "Socii, the better social network") to production, I forgot how to account for the fact that [Socket.io](https://socket.io "Real-time websocket engine") will not work out of the box with HTTPS without a lil' extra configuration.

On your nginx server, you'll want to edit your `default` file located at `etc` > `nginx` > `sites-available`. I'll use one of my server blocks as an example:

```nginx
server {
  # removed for brevity

  location ~* \.io {
    proxy_set_header X-Real-IP        $remote_addr;
    proxy_set_header X-Forwarded-For  $proxy_add_x_forwarded_for;
    proxy_set_header Host             $http_host;
    proxy_set_header X-NginX-Proxy    true;
    proxy_pass                        http://localhost:1234;
    proxy_redirect                    off;
    proxy_http_version                1.1;
    proxy_set_header Upgrade          $http_upgrade;
    proxy_set_header Connection       "upgrade";

    proxy_redirect                    off;
    proxy_set_header                  X-Forwarded-Proto $scheme;
    proxy_cache_key                   sfs$request_uri$scheme;
  }
}
```

The `proxy_pass` value will be the same as your app's. Actually, the entire location directive is exactly the same, except for the opening `location` bit. So, in the section that was removed for brevity you'd have the same `location` block as above but `location ~* \.io` would be replaced with `location /`.

Once you're done editing, SSH into your server and run `nginx -t` to ensure your configuration syntax is solid. Your changes won't be applied until the nginx service (or your server) restarts and if you configured something incorrectly, you don't want that to happen. If you get a message saying the syntax is okay, run `service nginx restart` and you're good to go!

This is something I do once or twice a year and am stumped by so this blog post is serving as an external memory unit. Hope this helps you as well! 🕸
