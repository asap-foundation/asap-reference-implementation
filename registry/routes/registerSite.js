import express from "express";

export const registerSiteRoute = express.Router();

registerSiteRoute.post("/", (req, res) => {
  res.json({
    "success": true,
    "message": "Site registered successfully"
  });
});
