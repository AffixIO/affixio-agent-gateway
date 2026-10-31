import test from "node:test";
import assert from "node:assert/strict";
import { gateToolCall } from "@affixio/mcp";
const base = { apiKey: "test-only", apiBase: "https://api.affix-io.com", home: "/tmp/affixio-agent-gateway-test", defaultAgentId: "test-agent", allowedTools: ["demo.echo"], maxAmount: 10, currency: "GBP", blockedPatterns: ["secret"] };
test("denies an unlisted tool before execution", async () => { const result = await gateToolCall({ tool: "shell.exec", args: { command: "echo hi" } }, base); assert.equal(result.allowed, false); assert.match(result.reason, /tool_not_allowed/); });
test("denies sensitive arguments", async () => { const result = await gateToolCall({ tool: "demo.echo", args: { value: "secret" } }, base); assert.equal(result.allowed, false); assert.equal(result.reason, "blocked_argument_pattern"); });
test("denies amounts above policy", async () => { const result = await gateToolCall({ tool: "demo.echo", amount: 11, args: {} }, base); assert.equal(result.allowed, false); assert.match(result.reason, /amount_above_limit/); });
