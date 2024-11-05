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

## Notes

- The text files have Markdown syntax for reasons:
  - I'm used to writing in Markdown
  - These files were converted from Markdown
  - I may create a Markdown renderer in the future
- Relative paths will be encased in arrow brackets:
  - example: </2019-12-02-a-personal-api.txt>
- Images are hosted on my CDN and you'll have to manually copy/paste to view:
  - example: https://🔥.pixels.wtf/blog/image/2019/year-in-review-c.jpg
