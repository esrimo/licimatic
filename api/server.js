const app = require("express")();
const bodyParser = require("body-parser");
const cors = require('cors');
const { get: GetGrants } = require("./lm/endpoints/get.grants");
const { get: GetGrantStats } = require("./lm/endpoints/get.grant.stats");
const { post: GrantsBackFill } = require("./lm/endpoints/post.grants.backfill");

const port = 3001;

try {
  app.use(cors());
  app.use(bodyParser.json());

  app.get("/grant", GetGrants);
  app.get("/grant-stats", GetGrantStats);
  app.post("/grant", GrantsBackFill);

  console.log("Exposing:");
  app._router.stack.forEach(function (r) {
    if (r.route && r.route.path) {
      const m = Object.keys(r.route.methods)[0].toUpperCase();
      console.log("\x1b[33m%s\x1b[0m", "\t" + m + ' ' + r.route.path);
    }
  });

  const server = app.listen(port, () =>
    console.log(`Licimatic Grants API Server running on port ${port}`)
  );

  server.timeout = process.env.MAX_TIMEOUT || 360000;
} catch (error) {
  console.log(error.stack);
}
