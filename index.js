const http = require("http");
const fs = require("fs");
const index = fs.readFileSync("index.html", "utf8");
const data = JSON.parse(fs.readFileSync("db.json")); //JSON.PARSE() json data changing to string
const product = data.products[9];

const server = http.createServer((req, res) => {
  // console.log(req.url);
  if (req.url.startsWith("/product")) {
    res.setHeader("Content-type", "text/html");
    const modify = index
      .replace("**title**", product.title)
      .replace("**price**", product.price)
      .replace("**thumbnail**", product.thumbnail);
    res.end(modify);
  }
  switch (req.url) {
    case "/":
      res.setHeader("Content-Type", "text/html");
      res.end(index);
      break;
    case "/api":
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
      break;
    default:
      // res.writeHead(404);
      res.end();
  }
});

server.listen(3800);
