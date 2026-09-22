const http = require("http");

const server = http.createServer((req, res) => {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.method === "POST" && req.url === "/api/generate") {

    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {

      try {
        const data = JSON.parse(body);

        if (!data.prompt) {
          res.writeHead(400, {
            "Content-Type": "application/json"
          });

          return res.end(JSON.stringify({
            error: "Prompt is required"
          }));
        }

        res.writeHead(
