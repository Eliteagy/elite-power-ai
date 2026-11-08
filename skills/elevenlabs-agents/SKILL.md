---
name: elevenlabs-agents
description: Work with ElevenLabs Conversational AI agents - initiate calls, retrieve transcripts, manage phone numbers, and analyze agent conversations. Use when building or testing voice AI applications.
---

# ElevenLabs Agents

Interact with ElevenLabs Conversational AI agents to initiate voice conversations, retrieve call transcripts, and manage outbound calling capabilities.

## Prerequisites

This skill requires the ElevenLabs Agents MCP server to be deployed and configured:

1. **Deploy the MCP server** from this repository's `mcp-server/` directory to Vercel
2. **Set the `ELEVENLABS_API_KEY`** as a Vercel environment variable (not in .env files)
3. **Add to your Claude Code MCP config** (`~/.claude.json` or project `.claude/settings.json`):

```json
{
  "mcpServers": {
    "elevenlabs-agents": {
      "url": "https://your-vercel-deployment.vercel.app/mcp",
      "transport": "http"
    }
  }
}
```

See the repository README for detailed setup instructions: https://github.com/taskcrew/elevenlabs-agents

## When to Use This Skill

Use this skill when you need to:
- Initiate conversations with ElevenLabs AI agents
- Make outbound phone calls using AI agents
- Retrieve and analyze conversation transcripts
- Monitor call status and completion
- List available agents or phone numbers
- Build or test voice AI applications

## Available Tools

### Agent Management
- **list_agents**: Get all available ElevenLabs agents in your account
- **get_agent**: Retrieve detailed information about a specific agent

### Conversation Initiation
- **initiate_agent_call**: Start a conversation with an agent and wait for completion
  - Default timeout: 50 seconds (configurable up to 300 seconds)
  - Returns full transcript upon completion
  - Best for quick, synchronous interactions

### Outbound Calling
- **list_phone_numbers**: Get all phone numbers available for outbound calls
- **initiate_outbound_call**: Make a phone call to any number using an agent
  - Requires agent_id and to_number (E.164 format, e.g., +15551234567)
  - Returns conversation_id for tracking
  - Best for asynchronous phone calls

### Status & Transcripts
- **get_call_status**: Check the current status of a conversation/call
  - Statuses: initiated, in-progress, processing, done, failed
  - Returns call_outcome: completed, failed, no_answer, or in_progress
- **get_call_transcript**: Retrieve full transcript and metadata from any finalized call
  - Works for completed calls (status: done/completed)
  - Works for failed calls (status: failed)
  - Works for no-answer calls (status: initiated with null accepted_time_unix_secs)
  - Returns conversation turns, timestamps, LLM usage, cost data, and call_outcome

## Common Workflows

### Quick Agent Testing
```
1. List agents to find the agent_id
2. Use initiate_agent_call with a test message
3. Review the returned transcript
```

### Outbound Calling
```
1. List phone numbers to verify availability
2. Initiate outbound call with agent_id and phone number
3. Poll get_call_status to monitor progress
4. Retrieve transcript with get_call_transcript when done
```

### Conversation Analysis
```
1. Get conversation status to check completion
2. Retrieve transcript with full metadata
3. Analyze conversation turns, timestamps, and metrics
4. Review LLM usage and cost data
```

## Important Notes

### Status Values
- **initiated**: Call set up but not started (may indicate no-answer if never accepted)
- **in-progress**: Active conversation
- **processing**: Call completed, being processed
- **done**: Fully completed and processed
- **failed**: Call encountered an error

### Call Outcomes
The MCP adds a `call_outcome` field to help identify the result:
- **completed**: Call successfully completed (status: done/completed)
- **failed**: Call failed with an error (status: failed)
- **no_answer**: Call was initiated but never answered (status: initiated, accepted_time_unix_secs: null)
- **in_progress**: Call is still ongoing (status: in-progress/processing)

### Phone Number Format
Always use E.164 format for phone numbers:
- Correct: +15551234567
- Incorrect: (555) 123-4567, 555-123-4567

### Transcript Availability
Transcripts are available for:
- **Completed calls**: Full conversation with all turns
- **Failed calls**: Partial data with error information
- **No-answer calls**: Empty transcript with metadata showing the call was never answered
- **In-progress calls**: Will return a status message, check back later

### Timeout Considerations
- Default timeout for initiate_agent_call: 50 seconds
- Maximum timeout: 300 seconds (Vercel serverless limit)
- For longer conversations, use the outbound calling pattern with status polling

## Response Structure

### Conversation Transcript
Each transcript contains:
- **role**: "agent" or "user"
- **message**: The spoken content
- **time_in_call_secs**: Timestamp within conversation
- **conversation_turn_metrics**: Performance metrics
- **llm_usage**: Token counts and costs
- **source_medium**: "audio" or "text"

### Metadata
Full conversation metadata includes:
- Call duration and timestamps
- Cost breakdown (LLM charges, call charges)
- Phone call details (if outbound)
- Termination reason
- Features usage
- Analysis results (if enabled)

## Example Usage

### Test an agent with a simple message
```
Use initiate_agent_call with:
- agent_id: "agent_xxx"
- initial_message: "Hello, can you tell me about your services?"
```

### Make an outbound sales call
```
1. List phone numbers to get phone_number_id
2. Use initiate_outbound_call with:
   - agent_id: "agent_xxx"
   - to_number: "+15551234567"
3. Poll status every 5-10 seconds
4. Get transcript when status is "done"
```

### Retrieve a specific conversation
```
Use get_call_transcript with:
- conversation_id: "conv_xxx"
```

## Related Documentation

For detailed API reference, search the indexed NIA documentation:
- "ElevenLabs conversation API"
- "ElevenLabs agents platform"
- "ElevenLabs outbound calling"
