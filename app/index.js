"use strict";



//  I M P O R T S

import chew from "chewit/fastify";
import compress from "fastify-compress";
import fastify from "fastify";
import helmet from "fastify-helmet";
import statik from "fastify-static";
import style from "colorette";

//  U T I L S

import {
  analyticsId,
  appName,
  appUrl,
  isDevelopment,
  mode,
  port,
  siteVersion
} from "~util";

import prepareGetRoutes from "./routes/get";

export const server = fastify({
  caseSensitive: false,
  logger: {
    level: "warn",
    prettyPrint: isDevelopment
  }
});



//  P R O G R A M

server
  .register(compress)
  .register(helmet, {
    hidePoweredBy: {
      setTo: "The Most Fantabulous"
    }
  })
  .register(statik, {
    prefix: "/assets/",
    root: `${__dirname}/dist/`
  })
  .register(chew, {
    id: analyticsId
  })
  .ready(serverReadinessError => {
    if (serverReadinessError)
      throw serverReadinessError;
  });

prepareGetRoutes(server);



//  B E G I N

const start = async() => {
  try {
    await server.listen(process.env.PORT || port, process.env.IP || "0.0.0.0");
  } catch(err) {
    server.log.error(err);
    process.exit(1);
  }

  process.stdout.write(`\n${style.bold(appName + " v" + siteVersion)} is running at ${style.bold(appUrl)} in mode ${style.bold(mode)}\n\n`);
};

start();
