import express from "express";

export const getPublicKeyRoute = express.Router();

getPublicKeyRoute.get("/", (req, res) => {
  const { site } = req.query;

  if (site === "example.com") {
    res.json({
      "site": "example.com",
      "publicKey": "5d15becd14554bb1ff2f6819b0e6cccd6b8de09c893a22af1225ced83e3af819",
      "intents": ["pricing", "features"],
      "agent_url": "http://localhost:3000/ai/agent",
      "metadataSignature": "uJyHtdGLOnVc7JGZ8CDLRCP2F4dNMF7NBrbs+VBBEe8="
    });
  } else if (site === "avaargon.com") {
    res.json({
      "site": "avaargon.com",
      "publicKey": "b7b1fe29d6ac3d028486bf118dbc5e5b8a86630cca734c01a1f9ef4368065f0e",
      "intents": ["pricing", "features"],
      "agent_url": "http://localhost:3000/ai/agent",
      "metadataSignature": "aMSFytz0N8zadnRDaVQTK6WCUOhWqVk9S+HlP3MaMRU="
    });
  } else {
    res.status(404).json({ "error": "Site not found" });
  }
});
