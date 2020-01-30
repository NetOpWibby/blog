---
title:      Migrating from MongoDB to RethinkDB
date:       2020-01-28
tags:       database, tutorial
tldr:       Thank me later
color:      blue
published:  true
---

RethinkDB, seemingly on life support for quite some time, is seeing a [revival](https://rethinkdb.com/blog/2.4.0-release "Announcing RethinkDB 2.4.0: Night Of The Living Dead") of sorts. As such, I thought it prudent to make available evergreen content for my favorite database these days. If you are interested in trying RethinkDB you can check out [these](https://pusher.com/tutorials/live-node-rethinkdb "How to build a realtime application with Node.js and RethinkDB") [two](https://www.pluralsight.com/guides/a-practical-introduction-to-rethinkdb "A Practical Introduction to RethinkDB") tutorials (my guide will not cover installation or setup).



## Preparing MongoDB exports

```sh
# Command
mongoexport --port PORT_NUMBER --db DATABASE_NAME --collection COLLECTION_NAME --out COLLECTION_NAME-`date "+%Y-%m-%d"`.json --pretty --jsonArray   

# Example
mongoexport --port 98765 --db dawebb --collection users --out users-`date "+%Y-%m-%d"`.json --pretty --jsonArray
```

There's a bit to unpack here so I'll break it down. Keep in mind that all the parameters yelling at you are _placeholders_ (for you to replace with your own parameters).

Actually, the placeholders are self-explanatory but the second half of the command is interesting.

```COLLECTION_NAME-`date "+%Y-%m-%d"`.json``` makes it so the exported collection looks like `users-2020-01-24.json`, with the date being whenever you ran the above command. Super nifty for backups too.

The `--pretty` flag isn't necessary for the import into RethinkDB to work, it's for **you** to inspect the export for any reason.

[The last flag](https://docs.mongodb.com/manual/reference/program/mongoexport/#cmdoption-mongoexport-jsonarray "MongoDB reference about the 'jsonArray' flag"), `--jsonArray`, is the most important. For _some reason_, MongoDB exports each item in a collection as its own object **not** separated by commas. Maybe MongoDB's import process doesn't choke on malformed JSON but everything else does. `--jsonArray` puts the contents of the export into a single JSON array. Like you'd expect by default...maybe that's just me.

NOTE: `--out` is the destination path so if you haven't prefaced ```COLLECTION_NAME-`date "+%Y-%m-%d"`.json``` with a path, the export will be in your home directory.

Anyhoo once you've exported the collections you care about, SFTP into that server to grab them and place them on your Desktop so you don't have a brain fart and forget where you put them moments later.



## Migrating, phase 01

MongoDB comes with some oddities that you may not want in your new database. Notably, how it deals with IDs. Here's an example:

```json
{
  "_id": {
    "$oid": "6bf9b676c24869077c37f61e"
  },
  "admin": true,
  "dashboard": [],
  "language": "en_US",
  "loginMethod": "link",
  "nameFirst": "",
  "nameLast": "",
  "plan": "free",
  "summaries": [],
  "timezone": "gmt-05-02",
  "verified": true,
  "email": "user@domain.tld",
  "__v": 0
}
```

In RethinkDB IDs are simply `id` and you have no need for `__v` so you probably don't want these values in your shiny new database. Also, you may have decided to use this migration period switch up your schema. Combine `nameFirst` with `nameLast`? Drop `plan`? Update `timzeone`? Replace `createdAt` with `created`? Regardless, you're gonna need to do a bit of legwork to clean your MongoDB export(s).

The entire script I use is hosted [here](https://gist.github.com/NetOperatorWibby/5084bf5c64306093e067fc43cfa4fcdb "MongoDB to RethinkDB migration script") but I'll point out some relevant pieces.

If you have any fields with dates/milliseconds, your import will fail unless you wrap those fields in `new Date` like so:

```json
…,
timestamp: new Date(timestamp),
…,
```

To reuse the IDs that were generated in MongoDB for usage in RethinkDB, you're gonna need to do something like this:

```json
…,
id: record._id["$oid"],
…,
```

You'll also need to make sure to explicity select the fields you want to transfer into your new export. The gist linked above should answer remaining questions you may have.



## Importing into RethinkDB

Even though you've already installed RethinkDB, you need to install [the Python driver](https://rethinkdb.com/docs/install-drivers/python "RethinkDB Python driver installation instructions") as well (for importing functionality, at least I had to do this for macOS).

Also, make sure you are importing your newly processed/migrated data into RethinkDB, not the original nonsense from your MongoDB export (unless of course, that's your plan).

```sh
# Command
rethinkdb import -f PATH_TO_PROCESSED_EXPORT_FILE --table DATABASE.TABLE -c CONNECTION_URL --password-file PASSWORD_FILE --force

# Example
rethinkdb import -f ~/Desktop/migrated/users-2020-01-24.json --table dawebb.users -c localhost:98765 --password-file ~/Desktop/rethinkpass.txt --force   
```

If you don't have a password on your RethinkDB database, you can safely omit the `--password-file` flag. Otherwise, make sure the password file only contains the password. If your IDE automatically generates new lines in files, just create the password file with `nano`.

Make sure you run the above command while RethinkDB is running and you'll see freshly created tables successfully created.



## Migrating, phase 02

Alright, we're almost at the finish line!

One of the neat things about RethinkDB (and a feature that convinced me to make the jump) is its Data Explorer. It's a UI that allows you to manipulate or check out your tables. There are just two remaining things we need to do and they're quick and easy: 1) set up indexes for our tables and 2) update time-based data to a format RethinkDB _really_ likes.

Visit `http://localhost:8080` (default port, unless you changed it) and click on "Data Explorer" in the header. In the text field you'll be able to perform queries using JavaScript.

### Setting up indexes

By default `id` is an index but you may want more. Indexes are for fields with unique values so it's easy to think of which field(s) would be suitable.

Sometimes, only the ID would be unique and that's fine.

```js
// Command
r.db("DATABASE_NAME").table("TABLE_NAME").index_create("FIELD_WITH_UNIQUE_VALUE");   

// Examples
r.db("dawebb").table("users").index_create("email");
r.db("dawebb").table("posts").index_create("slug");
```

Now let's update our time-based fields:

```js
// Command
r.db("DATABASE_NAME").table("TABLE_NAME").update({
  created: r.iso8601(r.row["created"]).to_iso8601(),
  updated: r.iso8601(r.row["updated"]).to_iso8601()
});

// Examples
r.db("dawebb").table("users").update({
  created: r.iso8601(r.row["created"]).to_iso8601(),
  updated: r.iso8601(r.row["updated"]).to_iso8601()
});

r.db("dawebb").table("visits").update({
  created: r.iso8601(r.row["created"]).to_iso8601(),
  timestamp: r.iso8601(r.row["timestamp"]).to_iso8601()   
});
```



## FIN

And there you have it! A super easy guide to move from MongoDB to RethinkDB. I've been using RethinkDB for several months now and I am way happier than I was with MongoDB. While super easy to get into, once you get in too deep it becomes an exercise in frustration to find solutions to ambiguous errors and the MongoDB docs are not user-friendly.

Contrast that with RethinkDB's Data Explorer, clear error messages, and clean documentation and it's not difficult to imagine why I'd make the switch. 🕸

P.S. New year, [new projects](https://socii.network/NetOpWibby/status/e3HWCaoqTZYzZvZ47RXfp "Sneak peek at codebase"), and now I feel like I need a new design for this blog. And then I remembered that first I need to create a [personal API](/2019/a-personal-api "A Personal API") so this blog can just become the presentation layer for the content.


***2020.01.30 update***

> Another reason to migrate is the license of MongoDB: SSPL vs. Apache 2 of RethinkDB.
> — [af](https://lobste.rs/u/af)

For others who may not know what [SSPL](https://lukasatkinson.de/2019/mongodb-no-longer-seeks-osi-approval-for-sspl) entails (like me until I read the linked post):

Basically, SSPL means one cannot offer MongoDB as a hosted service. That makes sense from their end as they offer hosting. However, it's a bit of a punk move because they are preventing potential competition from forcing them to improve their product.
