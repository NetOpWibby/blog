"use strict";



//  P A C K A G E S

const color = require("colorette");

const fastify = require("fastify")({
  logger: {
    level: "warn",
    prettyPrint: process.env.NODE_ENV === "development" ? true : false
  }
});



//  P R O G R A M

fastify
  .register(require("chewit/fastify"), {
    id: "5ae8a593b13869077c37f620"
  })
  .register(require("choo-ssr/fastify"), {
    app: require("./app")
  })
  .register(require("fastify-compress"))
  .register(require("fastify-helmet"), {
    hidePoweredBy: { setTo: "The Most Fantabulous" }
  })
  .register(require("fastify-static"), {
    prefix: "/assets/",
    root: `${__dirname}/app/dist/`
  });

fastify.ready(err => {
  if (err) throw err;
});



//  B E G I N

const start = async() => {
  try {
    await fastify.listen(process.env.PORT || 4000, process.env.IP || "0.0.0.0");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  process.stdout.write(`\n— ${color.green("🕸")}  ${fastify.server.address().port}\n\n`);
};

start();
