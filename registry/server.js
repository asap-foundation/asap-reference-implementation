import express from "express";
import bodyParser from "body-parser";
import { registerSiteRoute } from "./routes/registerSite.js";
import { querySiteRoute } from "./routes/querySite.js";
import { getPublicKeyRoute } from "./routes/publicKey.js";

const app = express();
app.use(bodyParser.json());

app.use("/register", registerSiteRoute);
app.use("/query", querySiteRoute);
app.use("/publicKey", getPublicKeyRoute);

app.listen(4000, () => {
  console.log("Registry server running on port 4000");
});
