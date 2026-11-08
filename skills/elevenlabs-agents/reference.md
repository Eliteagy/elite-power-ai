# ElevenLabs Agents API Reference

## Tool Schemas

### list_agents
```json
{
  "name": "list_agents",
  "description": "List all available ElevenLabs agents in your account",
  "parameters": {}
}
```

**Response Example:**
```json
{
  "agents": [
    {
      "agent_id": "agent_xxx",
      "name": "Sales Agent",
      "tags": [],
      "created_at_unix_secs": 1234567890,
      "last_call_time_unix_secs": 1234567890,
      "archived": false
    }
  ],
  "next_cursor": null,
  "has_more": false
}
```

### get_agent
```json
{
  "name": "get_agent",
  "description": "Get detailed information about a specific agent",
  "parameters": {
    "agent_id": "The unique ID of the agent"
  }
}
```

### initiate_agent_call
```json
{
  "name": "initiate_agent_call",
  "description": "Start a conversation with an ElevenLabs agent and wait for completion",
  "parameters": {
    "agent_id": "The unique ID of the agent to call",
    "initial_message": "The initial message to send to the agent",
    "custom_variables": "Optional custom variables to pass to the agent",
    "timeout": "Maximum time to wait in milliseconds (default: 50000)"
  }
}
```

**Response Example:**
```json
{
  "status": "completed",
  "conversation_id": "conv_xxx",
  "transcript": [
    {
      "role": "agent",
      "message": "Hi there! How can I help you today?",
      "time_in_call_secs": 0
    },
    {
      "role": "user",
      "message": "I'd like to learn more about your services.",
      "time_in_call_secs": 3,
      "source_medium": "audio"
    }
  ],
  "duration": 45
}
```

### list_phone_numbers
```json
{
  "name": "list_phone_numbers",
  "description": "List all available phone numbers for making outbound calls",
  "parameters": {}
}
```

**Response Example:**
```json
[
  {
    "phone_number_id": "phnum_xxx",
    "number": "+19207098588",
    "label": "Main Sales Line",
    "agent_id": "agent_xxx",
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

### initiate_outbound_call
```json
{
  "name": "initiate_outbound_call",
  "description": "Initiate an outbound phone call to any phone number using an ElevenLabs agent",
  "parameters": {
    "agent_id": "The unique ID of the agent to use for the call",
    "to_number": "The phone number to call (E.164 format)",
    "agent_phone_number_id": "Optional: The phone number ID to use for the call"
  }
}
```

**Response Example:**
```json
{
  "message": "Outbound call initiated successfully",
  "conversation_id": "conv_xxx",
  "status": "initiated",
  "next_steps": "Use get_call_status to check the call status, or get_call_transcript once completed"
}
```

### get_call_status
```json
{
  "name": "get_call_status",
  "description": "Get the current status of a conversation/call",
  "parameters": {
    "conversation_id": "The conversation ID returned from initiate_outbound_call"
  }
}
```

**Response Examples:**

Completed call:
```json
{
  "conversation_id": "conv_xxx",
  "status": "done",
  "call_outcome": "completed",
  "duration_seconds": 93,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:01:33Z",
  "has_transcript": true
}
```

No-answer call:
```json
{
  "conversation_id": "conv_xxx",
  "status": "initiated",
  "call_outcome": "no_answer",
  "duration_seconds": 0,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:15Z",
  "has_transcript": true
}
```

Failed call:
```json
{
  "conversation_id": "conv_xxx",
  "status": "failed",
  "call_outcome": "failed",
  "error": "Connection timeout",
  "duration_seconds": 0,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:30Z",
  "has_transcript": true
}
```

### get_call_transcript
```json
{
  "name": "get_call_transcript",
  "description": "Get the full transcript and details of a call. Works for completed, failed, and no-answer scenarios",
  "parameters": {
    "conversation_id": "The conversation ID to retrieve the transcript for"
  }
}
```

**Full Response Structure:**
```json
{
  "conversation_id": "conv_xxx",
  "status": "done",
  "duration_seconds": 93,
  "transcript": [
    {
      "role": "agent",
      "message": "Hi there, I'm reaching out from Example Corp...",
      "time_in_call_secs": 0,
      "conversation_turn_metrics": {
        "metrics": {
          "convai_tts_service_ttfb": {
            "elapsed_time": 0.302
          }
        }
      },
      "llm_usage": {
        "model_usage": {
          "gemini-2.5-flash": {
            "input": {
              "tokens": 8117,
              "price": 0.00121755
            },
            "output_total": {
              "tokens": 142,
              "price": 0.0000852
            }
          }
        }
      },
      "interrupted": false,
      "source_medium": null
    },
    {
      "role": "user",
      "message": "Sure.",
      "time_in_call_secs": 6,
      "source_medium": "audio"
    }
  ],
  "metadata": {
    "start_time_unix_secs": 1763823938,
    "call_duration_secs": 93,
    "cost": 874,
    "charging": {
      "llm_charge": 11,
      "call_charge": 863,
      "llm_price": 0.0017973
    },
    "phone_call": {
      "direction": "outbound",
      "agent_number": "+19207098588",
      "external_number": "+420775263589",
      "type": "twilio",
      "call_sid": "CAxxx"
    },
    "termination_reason": "Call ended by remote party",
    "main_language": "en"
  }
}
```

## Status Lifecycle

```
initiated → in-progress → processing → done
                              ↓
                           failed
```

## Error Handling

### Common Errors

**"Call is not yet completed"**
- Cause: Trying to get transcript before call finishes
- Solution: Check get_call_status first, wait until status is "done"

**"No phone numbers available"**
- Cause: No phone numbers configured in ElevenLabs account
- Solution: Add a phone number in the ElevenLabs dashboard

**"Call initiation failed: No conversation ID returned"**
- Cause: Permissions issue or invalid phone number
- Solution: Verify phone number format (E.164) and account permissions

**"Conversation timed out"**
- Cause: Conversation exceeded timeout limit
- Solution: Increase timeout parameter or use outbound calling with polling

## Best Practices

### Polling Strategy
When monitoring outbound calls:
- Start polling after 2-3 seconds
- Poll every 5-10 seconds
- Stop when status is "done" or "failed"
- Maximum recommended polls: 60 (5 minutes at 5-second intervals)

### Cost Optimization
- Review metadata.charging for cost breakdown
- LLM charges based on tokens used
- Call charges based on duration and region
- Use timeout limits to prevent runaway costs

### Conversation Design
- Keep initial_message clear and concise
- Use custom_variables for context injection
- Design agent prompts to handle interruptions
- Test with various user responses

## MCP Server Configuration

Deploy your own MCP server from the `mcp-server/` directory in this repository:

```bash
cd mcp-server
npm install
vercel --prod
```

Then configure Claude Code to connect:
- **Your URL**: `https://your-app.vercel.app/mcp` (replace with your Vercel deployment URL)
- **Transport**: HTTP
- **Authentication**: Set `ELEVENLABS_API_KEY` in Vercel environment variables (Dashboard → Settings → Environment Variables)

**Important**: Never commit API keys. Always use Vercel environment variables for production.

## Troubleshooting

### Transcript Not Showing
1. Check conversation status with get_call_status
2. Verify status is "done" (not "completed")
3. Ensure conversation_id is correct
4. Check for errors in metadata

### Calls Not Connecting
1. Verify phone number format (must be E.164)
2. Check phone number availability with list_phone_numbers
3. Ensure agent_id is valid
4. Review account permissions and credits

### Timeout Issues
1. Default timeout is 50 seconds
2. For longer calls, use outbound calling pattern
3. Monitor via get_call_status instead of waiting
4. Maximum serverless timeout is 300 seconds
