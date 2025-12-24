import crypto from "crypto";

export function verifySignature(data, publicKey) {
  const { signature, ...payload } = data;
  const expected = crypto
    .createHmac("sha256", publicKey)
    .update(JSON.stringify(payload))
    .digest("hex");

  return signature === expected;
}
