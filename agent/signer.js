import crypto from "crypto";
import { PRIVATE_KEY } from "./config.js";

export function signPayload(payload) {
  return crypto
    .createHmac("sha256", PRIVATE_KEY)
    .update(JSON.stringify(payload))
    .digest("hex");
}
