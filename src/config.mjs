import { mkdir } from "node:fs/promises";
import { join } from "node:path";

export async function config() {
  if (!process.env.AFFIXIO_API_KEY) throw new Error("AFFIXIO_API_KEY is required");
  const home = process.env.AFFIXIO_STATE_DIR || "./data";
  await mkdir(home, { recursive: true });
  return { apiKey: process.env.AFFIXIO_API_KEY, apiBase: process.env.AFFIXIO_API_BASE || "https://api.affix-io.com", home, defaultAgentId: process.env.AFFIXIO_AGENT_ID || "local-test-agent", allowedTools: (process.env.AFFIXIO_ALLOWED_TOOLS || "").split(",").map((x) => x.trim()).filter(Boolean), maxAmount: process.env.AFFIXIO_MAX_AMOUNT ? Number(process.env.AFFIXIO_MAX_AMOUNT) : null, currency: "GBP", blockedPatterns: ["password", "api_key", "secret", "private_key", "access_token"], store: { proofs: join(home, "proofs.json"), queue: join(home, "offline-queue.json"), licence: join(home, "licence.json"), stats: join(home, "stats.json"), spend: join(home, "spend"), codeUses: join(home, "code-uses.json"), signingKeys: join(home, "secrets", "mldsa65.json"), hmacSecret: join(home, "secrets", "hmac.secret") } };
}
