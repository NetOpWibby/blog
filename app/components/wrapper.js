"use strict";



//  E X P O R T

export default (render, model) => {
  return render`
    <!DOCTYPE html>
    <html lang="en">
      <head>${model.head}</head>
      <body data-scroll="yes">${model.body}</body>
    </html>
  `;
};
