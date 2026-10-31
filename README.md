# AffixIO Agent Gateway

A small local gateway that sits between an LLM agent and its tools. It uses `affixio@2.0.4` and `@affixio/mcp@0.1.0` to make tool policy decisions, sign local outcomes, and verify returned attestations.

The agent connects to `POST /v1/gate` before executing a tool. The gateway fails closed when the tool is not allowlisted, an amount exceeds the local limit, or arguments contain sensitive-key patterns. `POST /v1/verify` verifies an attestation returned by the gateway. No model provider is required: connect any custom LLM setup to these HTTP endpoints.

## Quick start

```bash
npm install
cp .env.example .env
# Set AFFIXIO_API_KEY to an active key. Never commit it.
npm test
npm start
```

Health: `GET http://127.0.0.1:8787/health`

```bash
curl -s http://127.0.0.1:8787/v1/gate \
  -H 'content-type: application/json' \
  -d '{"tool":"demo.echo","agent_id":"my-agent","args":{"message":"hello"}}'
```

The returned decision is an outcome of the configured policy and SDK. A successful decision does not mean an LLM answer is correct. Keep the API key server-side, use a separate key per environment, and set explicit tool and spend limits.
