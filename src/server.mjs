import http from "node:http";
import { gateToolCall, verifyAction } from "@affixio/mcp";
import { config } from "./config.mjs";

const settings = await config();
const json = (res, status, body) => { res.writeHead(status, { "content-type": "application/json" }); res.end(JSON.stringify(body)); };
const read = async (req) => { let raw = ""; for await (const chunk of req) raw += chunk; return raw ? JSON.parse(raw) : {}; };
const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET" && req.url === "/health") return json(res, 200, { ok: true, sdk: "affixio@2.0.4", mcp: "@affixio/mcp@0.1.0" });
    if (req.method !== "POST") return json(res, 405, { error: "method_not_allowed" });
    const body = await read(req);
    if (req.url === "/v1/gate") return json(res, 200, await gateToolCall(body, settings));
    if (req.url === "/v1/verify") return json(res, 200, await verifyAction(body, settings));
    return json(res, 404, { error: "not_found" });
  } catch (error) { return json(res, 400, { error: error instanceof Error ? error.message : "request_failed" }); }
});
server.listen(Number(process.env.PORT || 8787), "127.0.0.1", () => console.log(`agent gateway listening on http://127.0.0.1:${process.env.PORT || 8787}`));
