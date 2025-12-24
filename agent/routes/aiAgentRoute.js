import express from "express";
import { OFFICIAL_DATA } from "../officialData.js";
import fs from "fs";
import path from "path";
import crypto from "crypto";

function getPrivateKeyForSite(site) {
  const keyDir = path.join(process.cwd(), '..', 'keys');
  const keyFile = path.join(keyDir, `${site}.json`);

  try {
    const keyData = JSON.parse(fs.readFileSync(keyFile, 'utf8'));
    return keyData.privateKey;
  } catch (err) {
    console.error(`Error loading private key for ${site}:`, err);
    return null;
  }
}

function signPayloadForSite(payload, site) {
  const privateKey = getPrivateKeyForSite(site);
  if (!privateKey) {
    throw new Error(`Private key not found for site: ${site}`);
  }

  return crypto.createHmac("sha256", privateKey)
    .update(JSON.stringify(payload))
    .digest("hex");
}

const router = express.Router();

router.post("/ai/agent", (req, res) => {
  // Validate new protocol request
  const { intent, parameters, requestId, timestamp, clientInfo } = req.body;

  if (!intent || !parameters || !requestId || !timestamp || !clientInfo) {
    return res.status(400).json({
      error: "Invalid request format",
      required: ["intent", "parameters", "requestId", "timestamp", "clientInfo"]
    });
  }

  const site = req.headers['x-site'] || 'example.com';

  if (!OFFICIAL_DATA[intent]) {
    return res.status(404).json({
      error: "intent_not_supported",
      supported_intents: Object.keys(OFFICIAL_DATA),
      requestId // Return requestId for traceability
    });
  }

  // Generate response with new protocol
  const answer = OFFICIAL_DATA[intent]();

  const response = {
    site,
    requestId, // Same requestId as sent
    intent,
    answer: {
      data: answer.data,
      confidence: answer.confidence,
      language: answer.language
    },
    data_type: answer.data_type,
    updated_at: answer.updated_at,
    policy: answer.policy,
    registry_url: "http://localhost:4000", // or https://registry.asap.foundation in production
    // signature will be added below
  };

  try {
    const signature = signPayloadForSite(response, site);
    res.json({ ...response, signature });
  } catch (err) {
    res.status(500).json({
      error: "Failed to sign response",
      requestId
    });
  }
});

export default router;
