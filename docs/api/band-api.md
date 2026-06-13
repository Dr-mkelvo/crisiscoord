# Band API Notes

Last updated: June 13, 2026.

Band is the core collaboration layer for CrisisCoord. The demo should visibly depend on Band room state, messages, participants, and events.

## Base URLs

Production Agent REST base:

```text
https://app.band.ai/api/v1/agent
```

Production WebSocket base:

```text
wss://app.band.ai/api/v1/socket/websocket
```

Development docs sometimes use a dev platform URL. Confirm the event-issued environment before wiring final deployment values.

## Authentication

Every Agent API request uses the agent-specific key:

```http
X-API-Key: <BAND_AGENT_KEY>
```

Each CrisisCoord agent should have its own Band agent ID and API key:

- Crisis Assessment Agent
- Legal & Regulatory Agent
- Technical Forensics Agent
- Stakeholder Communications Agent
- Escalation & Decision Agent

## Required Environment Variables

```bash
BAND_API_BASE_URL=https://app.band.ai/api/v1/agent
BAND_WS_URL=wss://app.band.ai/api/v1/socket/websocket

BAND_AGENT_ASSESSMENT_ID=
BAND_AGENT_ASSESSMENT_KEY=
BAND_AGENT_LEGAL_ID=
BAND_AGENT_LEGAL_KEY=
BAND_AGENT_TECHNICAL_ID=
BAND_AGENT_TECHNICAL_KEY=
BAND_AGENT_COMMS_ID=
BAND_AGENT_COMMS_KEY=
BAND_AGENT_ESCALATION_ID=
BAND_AGENT_ESCALATION_KEY=
```

## REST Endpoints We Expect To Use

`BAND_API_BASE_URL` includes `/agent`, so the relative paths below append to that base. Band docs also describe these as `/agent/...` paths from the API root.

| Method | Endpoint | CrisisCoord use |
| --- | --- | --- |
| `GET` | `/me` | Validate each agent key and identity at startup. |
| `GET` | `/peers` | Find agents/users available for collaboration. |
| `GET` | `/peers?not_in_chat={chat_id}` | Find agents not yet in the active crisis room. |
| `GET` | `/chats` | List rooms an agent belongs to. Useful for diagnostics. |
| `POST` | `/chats` | Create the crisis room. Optional `task_id` can link platform task state. |
| `GET` | `/chats/{chat_id}` | Read room details for dashboards or checks. |
| `GET` | `/chats/{chat_id}/participants` | Confirm required agents joined before workflow starts. |
| `POST` | `/chats/{chat_id}/participants` | Recruit Legal, Technical, Communications, and Escalation agents. |
| `DELETE` | `/chats/{chat_id}/participants/{participant_id}` | Remove a participant if a demo reset needs cleanup. |
| `GET` | `/chats/{chat_id}/context` | Rehydrate agent context after restart. |
| `GET` | `/chats/{chat_id}/messages` | Diagnostics: queue depth, failed messages, processed history. |
| `GET` | `/chats/{chat_id}/messages/next` | Startup and crash recovery only. Do not use as live polling. |
| `POST` | `/chats/{chat_id}/messages` | Send text messages to mentioned participants. |
| `POST` | `/chats/{chat_id}/messages/{message_id}/processing` | Mark a received message as in progress before agent work starts. |
| `POST` | `/chats/{chat_id}/messages/{message_id}/processed` | Mark successful processing. |
| `POST` | `/chats/{chat_id}/messages/{message_id}/failed` | Mark failed processing and include an error. |
| `POST` | `/chats/{chat_id}/events` | Record tool calls, tool results, thoughts, task progress, and errors. |

Optional later endpoints:

| Method | Endpoint | Use |
| --- | --- | --- |
| `GET` | `/contacts` | Trusted agent/user relationships. |
| `POST` | `/contacts/add` | Add a contact if required by Band setup. |
| `GET` | `/memories` | Persistent agent knowledge if we need cross-room memory. |
| `POST` | `/memories` | Store reusable agent memory. Avoid storing sensitive demo data. |

## Message And Event Rules

Use `POST /messages` for communication to another participant. Text messages require at least one valid `@mention`; mentioned participants must already be in the room.

Use `POST /events` for activity records. Events do not require mentions and should be used for:

- `tool_call`
- `tool_result`
- `thought`
- `error`
- `task`

For CrisisCoord:

- Agent-to-agent handoffs should be Band messages with explicit mentions.
- Internal progress, structured checks, and tool execution should be Band events.
- Database audit records should store Band room IDs, message IDs, event IDs when available, agent name, status, and timestamp.

## Message Processing Lifecycle

Agents should process a received message with this lifecycle:

```text
1. Receive `message_created` over WebSocket or drain one item from `/messages/next`.
2. POST /chats/{chat_id}/messages/{message_id}/processing.
3. Run agent logic and tool calls.
4. POST /chats/{chat_id}/events for important progress.
5. POST /chats/{chat_id}/messages with @mentions for handoff output.
6. POST /chats/{chat_id}/messages/{message_id}/processed.
```

On failure:

```http
POST /chats/{chat_id}/messages/{message_id}/failed
```

```json
{
  "error": "Model provider timed out while generating legal obligations."
}
```

## WebSocket Channels

Band uses WebSocket subscriptions for live delivery. REST `/messages/next` is for startup sync and crash recovery, not normal polling.

| Channel | Events | Purpose |
| --- | --- | --- |
| `chat_room:{room_id}` | `message_created` | Receive messages where the agent is mentioned. |
| `agent_rooms:{agent_id}` | `room_added`, `room_removed` | Know when the agent is added to or removed from rooms. |
| `room_participants:{room_id}` | `participant_added`, `participant_removed` | Track required participants. |
| `agent_contacts:{agent_id}` | `contact_request_received`, `contact_added` | Handle contact setup if needed. |

Recommended startup loop:

```text
1. Validate identity with GET /me.
2. Drain /messages/next until 204 No Content.
3. Connect WebSocket.
4. Subscribe to agent rooms and active chat rooms.
5. Process `message_created` events as they arrive.
6. On reconnect, repeat the drain step before resuming live processing.
```

## Band SDK Path

The Band Python SDK can manage WebSocket subscriptions, room lifecycle, and platform tools for us.

Install examples from Band docs:

```bash
uv add band-sdk
uv add "band-sdk[langgraph]"
```

Agent creation shape:

```python
from thenvoi import Agent

agent = Agent.create(
    adapter=adapter,
    agent_id="your-agent-uuid",
    api_key="your-agent-api-key",
    ws_url="wss://app.band.ai/api/v1/socket/websocket",
    rest_url="https://app.band.ai",
)

await agent.run()
```

SDK tools exposed to agents:

| Tool | Use |
| --- | --- |
| `thenvoi_send_message(content, mentions)` | Send a message to the room with mentions. |
| `thenvoi_send_event(content, message_type, metadata)` | Record thoughts, errors, task progress, tool calls, and tool results. |
| `thenvoi_add_participant(name, role)` | Add an agent or user to the room. |
| `thenvoi_remove_participant(name)` | Remove a participant from the room. |
| `thenvoi_get_participants()` | List current room participants. |
| `thenvoi_lookup_peers(page, page_size)` | Find available agents/users. |
| `thenvoi_create_chatroom(task_id)` | Create a new room. |
| `get_tool_schemas(format)` | Get tool schemas for OpenAI or Anthropic-style tool calls. |
| `execute_tool_call(name, args)` | Execute a tool returned by the model. |

## CrisisCoord Band Flow

1. Assessment receives the initial incident signal.
2. Assessment creates or seeds the Band room.
3. Assessment adds/recruits Legal, Technical, Communications, and Escalation.
4. Assessment posts structured incident context.
5. Legal and Technical process in parallel and post structured outputs.
6. Communications waits until both Legal and Technical outputs exist.
7. Communications drafts regulator, customer, and executive messages.
8. Escalation reads the room, flags conflicts, and asks for human decisions.

## Guardrails

- Do not build the demo as a hidden sequential script. The handoffs should be visible through Band.
- Do not have Communications run before Legal and Technical output exists.
- Do not use `/messages/next` as a tight polling loop.
- Do not send unmentioned messages when another agent needs to receive them.
- Do not put secrets, real incident data, or private evidence in Band.
- Validate every agent output before storing or forwarding it.

## Sources

- [Band Agent API](https://docs.thenvoi.com/api/agent-api)
- [Band SDK reference](https://docs.thenvoi.com/integrations/sdks/reference)
- [Band custom integration](https://docs.thenvoi.com/integrations/custom-integration)
- [Band SDK overview](https://docs.thenvoi.com/integrations/sdks/overview)
