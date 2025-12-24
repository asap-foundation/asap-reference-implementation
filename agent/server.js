import express from "express";
import bodyParser from "body-parser";
import aiAgentRoute from "./routes/aiAgentRoute.js";

const app = express();
app.use(bodyParser.json());
app.use("/", aiAgentRoute);

app.listen(3000, () => {
  console.log(`AI Site Agent running on port 3000`);
});
