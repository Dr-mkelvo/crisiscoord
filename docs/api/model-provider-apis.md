# Model Provider API Notes

Last updated: June 13, 2026.

CrisisCoord should use one internal model-provider interface and support multiple OpenAI-compatible providers. This keeps agents stable if one provider is slow, rate-limited, or missing a model on demo day.

We do not strictly need OpenAI as a hosted model provider. If we use the `openai` npm package, it should be treated as an OpenAI-compatible client library for AI/ML API or Featherless, not as a requirement to use OpenAI models or an `OPENAI_API_KEY`.

## Provider Strategy

Primary path:

- Use AI/ML API for general agent reasoning and structured outputs.
- Use Featherless AI as fallback or for open-model experiments.
- Keep OpenAI-compatible request shapes so provider switching is mostly `baseURL`, `apiKey`, and `model`.
- Add direct OpenAI only if we later choose it deliberately for reliability.

Recommended internal config:

```bash
MODEL_PROVIDER=aimlapi
MODEL_TIMEOUT_MS=45000
MODEL_MAX_RETRIES=2

AIML_API_BASE_URL=https://api.aimlapi.com/v1
AI_ML_API_KEY=
AIML_DEFAULT_MODEL=google/gemma-3-4b-it

FEATHERLESS_API_BASE_URL=https://api.featherless.ai/v1
FEATHERLESS_API_KEY=
FEATHERLESS_DEFAULT_MODEL=Qwen/Qwen2.5-7B-Instruct
```

## Shared OpenAI-Compatible Client Shape

```ts
import OpenAI from "openai";

export function createModelClient(config: {
  apiKey: string;
  baseURL: string;
}) {
  return new OpenAI({
    apiKey: config.apiKey,
    baseURL: config.baseURL,
  });
}
```

Agent call shape:

```ts
const response = await client.chat.completions.create({
  model,
  messages: [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ],
  temperature: 0.2,
  max_tokens: 1200,
});
```

## AI/ML API

Base URL:

```text
https://api.aimlapi.com/v1
```

Primary endpoint:

```http
POST /chat/completions
```

Full URL:

```text
https://api.aimlapi.com/v1/chat/completions
```

Authentication:

```http
Authorization: Bearer <AI_ML_API_KEY>
Content-Type: application/json
```

Documented request fields include:

- `model`
- `messages`
- `temperature`
- `max_tokens`

AI/ML API also documents OpenAI SDK usage with `base_url` / `baseURL` set to `https://api.aimlapi.com/v1`.

Recommended CrisisCoord usage:

| Agent | Temperature | Notes |
| --- | --- | --- |
| Assessment | `0.1` to `0.2` | Deterministic classification and severity. |
| Legal & Regulatory | `0.1` | Conservative obligations summary. Include "not legal advice" in output. |
| Technical Forensics | `0.1` to `0.2` | Structured scope and containment output. |
| Communications | `0.3` to `0.5` | Drafting can be warmer, but must use Legal and Technical facts. |
| Escalation | `0.1` | Conflict detection and decision routing. |

## Featherless AI

Base URL:

```text
https://api.featherless.ai/v1
```

Authentication:

```http
Authorization: Bearer <FEATHERLESS_API_KEY>
Content-Type: application/json
```

Recommended application attribution headers:

```http
HTTP-Referer: <CRISISCOORD_APP_URL>
X-Title: CrisisCoord
```

Important endpoints:

| Method | Endpoint | Use |
| --- | --- | --- |
| `GET` | `/models` | Discover available models and model metadata. |
| `POST` | `/chat/completions` | Main chat-completion call. |
| `POST` | `/completions` | Legacy text completion when needed. Prefer chat completions. |

Useful model discovery queries:

```text
GET /models?available_on_current_plan=true
GET /models?capabilities=chat,tool-use&context_length_min=32768
GET /models?q=llama
GET /models?sort=-popularity&page=1&per_page=100
```

Documented `/chat/completions` request fields include:

- `model`
- `messages`
- `presence_penalty`
- `frequency_penalty`
- `repetition_penalty`
- `temperature`
- `top_p`
- `top_k`
- `min_p`
- `seed`
- `stop`
- `stop_token_ids`
- `include_stop_str_in_output`
- `max_tokens`
- `min_tokens`

## Structured Output Contracts

Every agent should return JSON that is parsed and validated with Zod before it is stored or sent to another agent.

Example Assessment shape:

```ts
const AssessmentOutput = z.object({
  incidentType: z.enum(["data_breach", "cyberattack", "product_recall", "compliance", "public_risk"]),
  severity: z.enum(["low", "medium", "high", "critical"]),
  summary: z.string(),
  requiredAgents: z.array(z.enum(["legal", "technical", "communications", "escalation"])),
  knownFacts: z.array(z.string()),
  unknowns: z.array(z.string()),
});
```

Implementation rule:

- Model output is untrusted until validated.
- Failed validation should create a Band `error` event and a Supabase `agent_runs` failure row.
- Never let invalid model output trigger customer/regulator communications.

## Fallback Rules

1. Try configured primary provider.
2. Retry transient failures with jittered backoff.
3. If still failing, use fallback provider with a compatible model.
4. If both fail, post a Band `error` event and route to Escalation.
5. Do not silently skip an agent output.

Minimum error fields to record:

- provider
- model
- agent
- incident ID
- Band room ID
- failure type
- retry count
- timestamp

## Security And Privacy Rules

- Use synthetic incident data only.
- Never send real regulated or confidential data to model providers.
- Keep prompts concise and purpose-specific.
- Store prompts/responses only when needed for the audit demo.
- Redact keys and credentials from logs.
- Track token usage and response latency for cost and demo stability.

## Sources

- [AI/ML API quickstart](https://docs.aimlapi.com/quickstart/simple-model)
- [AI/ML API text models reference](https://docs.aimlapi.com/api-references/text-models-llm)
- [AI/ML API supported SDKs](https://docs.aimlapi.com/quickstart/supported-sdks)
- [Featherless API overview](https://featherless.ai/docs/api-overview-and-common-options)
- [Featherless completions endpoints](https://featherless.ai/docs/completions)
- [Featherless models endpoint](https://featherless.ai/docs/api-reference-models)
- [Featherless examples](https://featherless.ai/docs/api-examples-and-snippets)
