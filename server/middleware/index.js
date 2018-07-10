"use strict";



//  P A C K A G E

// import chew from "chewit";
import hbs from "hbs";

//  V A R I A B L E

const log = console.log; // eslint-disable-line



//  P R O G R A M

module.exports = (app) => {

  app.use((req, res, next) => {
    res.header("X-Powered-By", "Noto");
    // chew("5ad17a5cc3c718b4be009091", req); // analytics
    // 5ad17bb2c3c718b4be009092

    next();
  });



  // Handlerbars compare helper
  // via https://gist.github.com/pheuter/3515945#gistcomment-1378171
  hbs.registerHelper("compare", (lvalue, operator, rvalue, options) => {
    let operators;
    let result;

    if (arguments.length < 3) throw new Error(`Handlerbars Helper "compare" needs two parameters`);

    if (options === undefined) {
      options = rvalue;
      rvalue = operator;
      operator = "===";
    }

    operators = {
      "==":     (l, r) => l == r,
      "===":    (l, r) => l === r,
      "!=":     (l, r) => l != r,
      "!==":    (l, r) => l !== r,
      "<":      (l, r) => l < r,
      ">":      (l, r) => l > r,
      "<=":     (l, r) => l <= r,
      ">=":     (l, r) => l >= r,
      "typeof": (l, r) => typeof l === typeof r
    };

    if (!operators[operator]) throw new Error(`Handlerbars Helper "compare" does not know the operator "${operator}"`);
    result = operators[operator](lvalue, rvalue);

    if (result) return options.fn(this);
    else return options.inverse(this);
  });

};
