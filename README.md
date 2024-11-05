# blog

> Welcome to Paul Anthony Webb's corner of the 'Net where he'll regale you with
> whatever he finds interesting.



## Prerequisites

- [Deno](https://deno.land/#installation)
- [Just](https://just.systems/man/en)

## Setup

```sh
git clone https://github.com/NetOpWibby/blog.git && cd $_
```

## Commands

```sh
# run blog for local development
just dev

# run blog for production
just start

# generate feeds
just feed

# generate version.txt
just version
```

## Production

- ensure Deno is installed on your server
- make note of `which deno` to find the path of your install
- `nano /etc/systemd/system/blog.service`
  ```service
  [Unit]
  After=network.target
  Description=My cool blog
  Documentation=https://blog.webb.page

  [Service]
  # your deno path
  ExecStart=/root/.deno/bin/deno run --allow-env --allow-net --allow-read main.ts
  Restart=on-failure
  Type=simple
  User=root
  # the path of your blog
  WorkingDirectory=/var/www/blog

  [Install]
  WantedBy=multi-user.target
  ```
- `systemctl start blog`
- `systemctl enable blog`
- when making changes to your `blog.service` file, you'll need to run `systemctl daemon-reload`

## Notes

- The text files have Markdown syntax for reasons:
  - I'm used to writing in Markdown
  - These files were converted from Markdown
  - I may create a Markdown renderer in the future
- Relative paths will be encased in arrow brackets:
  - example: </2019-12-02-a-personal-api.txt>
- Images are hosted on my CDN and you'll have to manually copy/paste to view:
  - example: https://🔥.pixels.wtf/blog/image/2019/year-in-review-c.jpg
