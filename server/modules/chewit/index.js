"use strict";



//  P A C K A G E S

const agent = require("./lib/ua");
const chalk = require("chalk");
const request = require("request-promise-native");

//  V A R I A B L E

const log = console.log;



//  P R O G R A M

module.exports = exports = (siteId) => {
  return (req, res, next) => {
    if (!siteId || !req) return displayError("A parameter is missing!");

    const logVisit = {};

    logVisit.id = siteId;
    logVisit.timestamp = Date.now();

    if (req.headers.host) logVisit.host = req.headers.host;
    if (req.hostname) logVisit.hostname = req.hostname;
    if (req.headers["accept-language"]) logVisit.language = req.headers["accept-language"];
    if (req.headers.referer) logVisit.referrer = req.headers.referer;

    if (
      req.headers.cookie &&
      req.headers.cookie.includes("ChewSessionId")
    ) {
      const r = /(ChewSessionId).+?([;]|[\s]|[\n]|[\r])/gm;

      if (
        !req.headers.cookie.match(r) ||
        !req.headers.cookie.match(r)[0] ||
        !req.headers.cookie.match(r)[0].split("=") ||
        !req.headers.cookie.match(r)[0].split("=")[1] ||
        !req.headers.cookie.match(r)[0].split("=")[1].replace(";", "")
      ) return;

      // This cookie grabber here will be checked
      // server-side over on Chew to see if you
      // are logged in and viewing your own site.
      //
      // If so, your site visit will be ignored
      // and not added to your analytics.

      logVisit.cookie = req.headers.cookie.match(r)[0].split("=")[1].replace(";", "");
    }

    if (
      req.headers.dnt &&
      parseInt(req.headers.dnt)
    ) logVisit.dnt = parseInt(req.headers.dnt);

    if (
      req.url ||
      req.originalUrl ||
      req.path
    ) logVisit.url = req.url || req.originalUrl || req.path;

    if (req.method) logVisit.httpMethod = req.method;

    if (
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.ip
    ) logVisit.ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.ip;

    if (req.protocol) logVisit.protocol = req.protocol;

    // User Agent

    let source = req.headers["user-agent"] || "";
    if (req.headers["x-ucbrowser-ua"]) source = req.headers["x-ucbrowser-ua"];

    const ua = new agent();

    ua.Agent.source = source.replace(/^\s*/, "").replace(/\s*$/, "");
    ua.Agent.os = ua.getOS(ua.Agent.source);
    ua.Agent.osversion = ua.getOSVersion(ua.Agent.source);
    ua.Agent.platform = ua.getPlatform(ua.Agent.source);
    ua.Agent.browser = ua.getBrowser(ua.Agent.source);
    ua.Agent.browserversion = ua.getBrowserVersion(ua.Agent.source);

    ua.testBot();
    ua.testWebkit();
    ua.testDevice();
    ua.testAndroidTablet();
    ua.testTablet();
    ua.testCompatibilityMode();
    ua.testCaptiveNetwork();

    logVisit.ua = ua.Agent;

    return new Promise((resolve, reject) => {
      request({
        method: "POST",
        url: "http://localhost:8002", // "https://api.chew.sh",
        body: logVisit,
        json: true
      }).then(body => {
        if (!body) return reject(body);
        resolve(body);
        next();
      }).catch(welp => {
        displayError(welp);
        resolve(welp);
      });
    });
  };
};



//  H E L P E R

const displayError = text => {
  if (text.toString().includes("40"))
    text = text.toString().split("-")[1].trim().replace(/"/g, "");

  if (text.toString().includes("50"))
    text = "Internal server error, please try once more in a few minutes.";

  if (text.toString().includes("socket hang up")) return;

  return log(
    chalk.red(`\n▸▸ Chew Error\n`) +
    chalk.magenta(`▸▸▸ ${text.toString().split(":")}\n\n`) +
    chalk.cyan(`Check ${chalk.underline("https://chew.sh/docs")} for integration tips\n`)
  );
};
