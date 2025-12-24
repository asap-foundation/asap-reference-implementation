# AI Site Agent Protocol (ASAP)

*"HTML is for humans. AI Site Agents are for machines."*

**ASAP (AI Site Agent Protocol)** - Official Answers for the AI Web

https://github.com/asap-foundation/asap-protocol

A decentralized protocol for AI-powered websites to provide cryptographically verified, official responses to user queries through dedicated AI agents.

## 🌟 What is ASAP?

ASAP enables websites to speak directly to AI systems with authoritative, signed answers - eliminating hallucinations and ensuring accuracy.

### Key Features:
- **Intent-Based Queries**: AI asks specific questions (pricing, features, etc.)
- **Cryptographic Verification**: All responses are digitally signed
- **Decentralized Architecture**: No central authority required
- **Official Answers Only**: No crawling, no guessing

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   AI Consumer   │───▶│    Registry     │───▶│   AI Agent      │
│                 │    │                 │    │                 │
│ • Sends queries │    │ • Routes requests│    │ • Provides     │
│ • Verifies sig. │    │ • Public keys    │    │   official      │
│ • Gets answers  │    │ • Metadata       │    │   answers      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Components:
- **AI Agent**: Website's dedicated endpoint providing official responses
- **Registry**: Directory of registered agents and their public keys
- **AI Consumer**: Client library for querying verified responses

## 🚀 Quick Start

### 1. Running Servers

First, you need to run the registry and agent servers:

```bash
# Terminal 1: Run registry
cd registry
node server.js

# Terminal 2: Run agent
cd agent
node server.js
```

### 2. Running Consumer

```bash
# Run test consumer
cd ai-consumer
node index.js
```

## 🎮 Live Demo

Try ASAP with our demo setup:

```bash
# Query pricing information
curl -X POST http://localhost:4000/query \
  -H "Content-Type: application/json" \
  -d '{"intent":"pricing","parameters":{"site":"example.com"},"requestId":"demo-123","timestamp":"2025-12-24T10:00:00Z","clientInfo":{"platformName":"Demo","platformVersion":"1.0"}}'

# Expected Response:
{
  "verified": true,
  "data": {
    "site": "example.com",
    "intent": "pricing",
    "answer": {
      "data": "We offer three plans: Free, Professional, Enterprise.",
      "confidence": 0.97,
      "language": "en"
    },
    "data_type": "official",
    "signature": "BASE64_SIGNATURE"
  }
}
```

## 📖 How to Use

### Basic Usage

```javascript
import fetch from "node-fetch";
import crypto from "crypto";

async function queryRegistry(site, intent, parameters = {}) {
  const requestId = crypto.randomUUID();

  const request = {
    intent,
    parameters: { site, ...parameters },
    requestId,
    timestamp: new Date().toISOString(),
    clientInfo: {
      platformName: "YourAI",
      platformVersion: "v1.0",
      publicKey: "YOUR_PUBLIC_KEY" // For future signature verification
    }
  };

  const response = await fetch("http://localhost:4000/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  return await response.json();
}

// Usage
const result = await queryRegistry("example.com", "pricing");
if (result.verified) {
  console.log("Verified response:", result.data.answer.data);
}
```

### Advanced Usage

```javascript
// Query with additional parameters
const result = await queryRegistry("example.com", "features", {
  language: "en",
  category: "security"
});

// Error handling
if (!result.verified) {
  console.error("Error:", result.error);
  return;
}

// Access data
const { data, confidence, language } = result.data.answer;
console.log(`Response (${language}): ${data}`);
console.log(`Confidence: ${confidence}`);
```

## 🎯 Available Intents

### pricing
Get pricing information
```javascript
await queryRegistry("example.com", "pricing");
```

### features
Get features information
```javascript
await queryRegistry("example.com", "features", { language: "en" });
```

## 🔧 Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| site | string | ✅ | Website domain name |
| intent | string | ✅ | Operation type (pricing, features) |
| parameters | object | ❌ | Additional parameters |
| language | string | ❌ | Response language (en, fa, etc.) |

## 📊 Request/Response Structure (ASAP Compliant)

### Request Structure
```javascript
{
  "intent": "pricing",
  "parameters": {
    "site": "example.com",
    "language": "en"
  },
  "requestId": "req_1234567890",
  "timestamp": "2025-12-23T10:30:00Z",
  "clientInfo": {
    "platformName": "YourAI",
    "platformVersion": "v1.0",
    "publicKey": "YOUR_PUBLIC_KEY"
  }
}
```

### Response Structure
```javascript
{
  "verified": true,
  "data": {
    "site": "example.com",
    "intent": "pricing",
    "requestId": "req_1234567890",
    "answer": {
      "data": "We offer three plans: Free, Professional, Enterprise.",
      "confidence": 0.98,
      "language": "en"
    },
    "data_type": "official",
    "updated_at": "2025-12-23T10:30:00Z",
    "policy": "public",
    "signature": "BASE64_SIGNATURE",
    "registry_url": "https://registry.asap.foundation"
  }
}
```

## ⚠️ Important Notes

1. **Always check verified** before using the data
2. **Unique requestId** links response to original request and prevents confusion
3. **Digital signature** ensures response has not been tampered with
4. **Timestamp** is used to prevent replay attacks
5. **data_type: "official"** indicates cryptographically signed official responses
6. **confidence** indicates site confidence in the answer (recommended)
7. **policy** can be "public" or "private" based on site publishing policy
8. **registry_url** provides link to official registry for signature verification

## 🔗 Real-world Examples

### ChatGPT Plugin Usage
```javascript
async function getOfficialPricing(site) {
  const result = await queryRegistry(site, "pricing");
  if (result.verified) {
    return `Official pricing information: ${result.data.answer.data}`;
  }
  return "Information not available.";
}
```

### Discord Bot Usage
```javascript
client.on('message', async (message) => {
  if (message.content.includes('!pricing')) {
    const result = await queryRegistry("example.com", "pricing");
    if (result.verified) {
      message.reply(result.data.answer.data);
    }
  }
});
```

### Web App Usage
```javascript
// React component
function PricingInfo({ site }) {
  const [pricing, setPricing] = useState(null);

  useEffect(() => {
    queryRegistry(site, "pricing").then(result => {
      if (result.verified) {
        setPricing(result.data.answer.data);
      }
    });
  }, [site]);

  return <div>{pricing || "Loading..."}</div>;
}
```

## 🤝 Contributing

We welcome contributions to ASAP! Here's how you can help:

### Development Setup:
1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/asap-reference-implementation.git`
3. Install dependencies: `npm install` in each component directory
4. Start development servers: `npm run demo`
5. Make your changes and submit a PR

### Areas for Contribution:
- **New Intent Types**: Add support for additional query types
- **Client Libraries**: SDKs for different programming languages
- **Security Enhancements**: Improve cryptographic implementations
- **Documentation**: Tutorials, guides, and API documentation
- **Testing**: Comprehensive test suites for all components

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the need for trustworthy AI-web interactions
- Built with modern JavaScript and Node.js
- Cryptographic operations using Node.js crypto module

---

*"ASAP gives the web an official voice in the age of AI."* 🚀
