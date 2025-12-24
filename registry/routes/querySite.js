import express from "express";
import fetch from "node-fetch";

export const querySiteRoute = express.Router();

querySiteRoute.post("/", async (req, res) => {
  const { intent, parameters } = req.body;
  const { site } = parameters;

  if (site === "example.com" && intent === "pricing") {
    res.json({
      "verified": true,
      "data": {
        "site": "example.com",
        "requestId": "req_1234567890",
        "intent": "pricing",
        "answer": {
          "data": "We offer three plans: Free, Professional, Enterprise.",
          "confidence": 0.97,
          "language": "en"
        },
        "data_type": "official",
        "updated_at": "2025-12-23T10:30:00Z",
        "policy": "public",
        "signature": "BASE64_SIGNATURE",
        "registry_url": "http://localhost:4000"
      }
    });
  } else if (site === "example.com" && intent === "features") {
    res.json({
      "verified": true,
      "data": {
        "site": "example.com",
        "requestId": "req_1234567890",
        "intent": "features",
        "answer": {
          "data": "API, Dashboard, and 24/7 Support are included.",
          "confidence": 0.95,
          "language": "en"
        },
        "data_type": "official",
        "updated_at": "2025-12-23T10:30:00Z",
        "policy": "public",
        "signature": "BASE64_SIGNATURE",
        "registry_url": "http://localhost:4000"
      }
    });
  } else {
    res.status(404).json({ "error": "Intent not supported" });
  }
});
