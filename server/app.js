"use strict";



//  P A C K A G E S

import bodyParser from "body-parser";
import chalk from "chalk";
import chew from "chewit";
import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import favicon from "serve-favicon";
import findErrors from "debug";
import hbs from "hbs";
import hbsutils from "hbs-utils";
import http from "http";
import logger from "morgan";
import minifyHTML from "express-minify-html";

//  V A R I A B L E S

import notoMiddleware from "./middleware";
import notoRoutes from "./routes";

const debug = findErrors("Noto:server");
const handlebars = hbsutils(hbs);
const log = console.log; // jshint ignore:line



//  P R O G R A M

const app = express()
  .set("trust proxy", 1)
  .set("view engine", "html")
  .set("views", "./views")
  .set("layouts", "./views/layouts")

  .engine("html", hbs.__express)

  .use(favicon("./public/favicon.ico"))

  .use(logger("dev"))
  .use(compression())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(express.static("./public"))
  .use(minifyHTML({
    override: true,
    htmlMinifier: {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      keepClosingSlash: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
      minifyJS: true
    }
  }))
  .use(chew("5ae8a593b13869077c37f620"))
;



//  R E J E C T I O N
//  ~ H A N D L I N G

process.on("unhandledRejection", (reason, p) => {
  log(
    `${chalk.red("▸▸ Unhandled promise rejection")}\n`,
    `${chalk.magenta("▸▸▸▸", reason)}\n\n`, p,
    `\n\n${chalk.magenta("◂◂◂◂")}\n\n`
  );
});



//  G L O B A L S

app.locals.Author = "Paul Anthony Webb";
app.locals.Description = "theWebb.blog is Paul Anthony Webb's corner of the 'Net where he regales you with info about whatever he finds interesting.";
app.locals.Email = "netopwibby@thenetwork.email";
app.locals.Tagline = "Stick around for a bit";
app.locals.Title = "theWebb.blog";
app.locals.URL = "https://thewebb.blog";



//  P A R T I A L S

handlebars.registerPartials("./views/partials");
handlebars.registerWatchedPartials("./views/partials");



//  M I D D L E W A R E

notoMiddleware(app);



//  R O U T E S

notoRoutes(app);



//  P O R T

const port = normalizePort(process.env.PORT || "4000");
// app.set("port", port);



//  ~   I N I T
//  S E R V E R

const server = http.createServer(app);



//  ~   I N I T
//  L I S T E N

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);



//  N O R M A L I Z E
//  ~         P O R T

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) return val; // named pipe
  if (port >= 0) return port; // port number

  return false;
}



//  ~     E R R O R
//  H A N D L I N G

function onError(error) {
  if (error.syscall !== "listen") throw error;
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  /* eslint-disable */
  // Handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;

    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;

    default:
      throw error;
  }
  /* eslint-enable */
}



//  ~     H E Y
//  L I S T E N

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;

  log(`\n  🕸  theWebb.blog ⚡ ${addr.port}\n`);
  debug(`Listening on ${bind}`);
}



//  E X P O R T

module.exports = app;
