import fetch from "node-fetch";
import crypto from "crypto";

async function queryRegistry(site, intent, parameters = {}) {
  // Generate unique UUID for request
  const requestId = crypto.randomUUID();

  // Build request with ASAP protocol
  const request = {
    intent,
    parameters: {
      site, // Include site in parameters
      ...parameters
    },
    requestId,
    timestamp: new Date().toISOString(),
    clientInfo: {
      platformName: "ASAP-Consumer",
      platformVersion: "v1.0",
      publicKey: "BASE64_PUBLIC_KEY_PLACEHOLDER" // Will be replaced with actual key in future
    }
  };

  console.log("Sending request:", JSON.stringify(request, null, 2));

  const response = await fetch("http://localhost:4000/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  const data = await response.json();
  return data;
}

(async () => {
  const result = await queryRegistry("example.com", "pricing");
  if (result.verified) {
    console.log("Verified answer:", result.data.answer.data);
    console.log("Confidence:", result.data.answer.confidence);
    console.log("Language:", result.data.answer.language);
    console.log("Request ID:", result.data.requestId);
    console.log("Data type:", result.data.data_type);
    console.log("Policy:", result.data.policy);
  } else {
    console.log("Verification failed:", result.error);
  }
})();
