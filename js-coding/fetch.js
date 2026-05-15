import fetch from "node-fetch";

// Fails in Browser outside Google page becausee of CORS
fetch("https://www.google.com/")
  .then((response) => response.text())
  .then((text) => console.log(text.substring(0, 15)))
  .catch((e) => console.log(e));
// <!doctype html>

// Anywhere since public CDN links skip CSRF
fetch("https://code.jquery.com/jquery-3.6.0.js")
  .then((response) => response.text())
  .then((text) => console.log(text.substring(7, 39)));
// jQuery JavaScript Library v3.6.0
