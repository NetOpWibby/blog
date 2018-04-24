"use strict";



//  P A C K A G E

const log = console.log; // eslint-disable-line



//  P R O G R A M

module.exports = (app) => {

  //  H O M E P A G E

  app.get("/", require("./home"));



  //  F E E D S

  app.get("/feed", require("../feed"));
  app.get("/feed/json", require("../feed/json"));



  //  A R C H I V E

  app.get("/thoughts", require("./thoughts"));
  app.get("/thoughts/:year", require("./thoughts/year"));



  //  T A G S

  app.get("/tags", require("./tags"));
  app.get("/tags/:tag", require("./tags/tag"));



  //  P A G E

  app.get("/:page", (req, res) => {
    res.render(`pages/${req.params.page}`, Object.assign({
      layout: "layouts/default"
    }));
  });



  //  P O S T

  app.get("/thoughts/:year/:page", require("./post"));



  // Ignore errors...
  app.use((err, req, res, next) => {
    if (err.stack.includes("Failed to lookup view")) return res.redirect("/");
    return next;
  });

};
