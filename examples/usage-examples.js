// ASAP Consumer Usage Examples

import fetch from "node-fetch";
import crypto from "crypto";

// Copy of queryRegistry function from ai-consumer/index.js
async function queryRegistry(site, intent, parameters = {}) {
  const requestId = crypto.randomUUID();

  const request = {
    intent,
    parameters: {
      site,
      ...parameters
    },
    requestId,
    timestamp: new Date().toISOString(),
    clientInfo: {
      platformName: "ASAP-Consumer",
      platformVersion: "v1.0",
      publicKey: "BASE64_PUBLIC_KEY_PLACEHOLDER"
    }
  };

  const response = await fetch("http://localhost:4000/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  const data = await response.json();
  return data;
}

// Example 1: Simple pricing query
async function getPricingInfo(site) {
  const result = await queryRegistry(site, "pricing");
  if (result.verified) {
    console.log(`${site} pricing:`, result.data.answer.data);
    return result.data.answer.data;
  } else {
    console.error("Failed to get pricing:", result.error);
    return null;
  }
}

// Example 2: Features query with language parameter
async function getFeaturesInfo(site, language = "en") {
  const result = await queryRegistry(site, "features", { language });
  if (result.verified) {
    console.log(`${site} features (${language}):`, result.data.answer.data);
    return result.data.answer.data;
  } else {
    console.error("Failed to get features:", result.error);
    return null;
  }
}

// Example 3: Usage in real application (like ChatGPT plugin)
async function handleUserQuery(userQuery) {
  // Analyze user query
  if (userQuery.includes("pricing") || userQuery.includes("price")) {
    const pricing = await getPricingInfo("example.com");
    return `According to official site information: ${pricing}`;
  }

  if (userQuery.includes("features") || userQuery.includes("capabilities")) {
    const features = await getFeaturesInfo("example.com", "en");
    return `Site features: ${features}`;
  }

  return "Unfortunately I cannot answer this question.";
}

// Run examples
(async () => {
  console.log("=== ASAP Consumer Examples ===\n");

  // Example 1
  console.log("1. Getting pricing info:");
  await getPricingInfo("example.com");

  // Example 2
  console.log("\n2. Getting features info:");
  await getFeaturesInfo("example.com");

  // Example 3
  console.log("\n3. Handling user query:");
  const response = await handleUserQuery("What prices do you have?");
  console.log("Response:", response);

})();
