# ElevenLabs Agents - Examples

## Example 1: Quick Agent Test

Test an agent's response to a simple query.

```javascript
// Step 1: List agents to find the one you want
const agents = await listAgents();
console.log(agents.agents[0].agent_id); // "agent_4301kan4hcdtfygbvfynw5fa78tn"

// Step 2: Initiate a test conversation
const result = await initiateAgentCall({
  agent_id: "agent_4301kan4hcdtfygbvfynw5fa78tn",
  initial_message: "Hi, can you tell me what you do?",
  timeout: 30000 // 30 seconds
});

// Step 3: Review the transcript
console.log(result.transcript);
/*
[
  {
    role: "agent",
    message: "Hi! I help customers learn about our AI automation services...",
    time_in_call_secs: 0
  },
  {
    role: "user",
    message: "Hi, can you tell me what you do?",
    time_in_call_secs: 2
  }
]
*/
```

## Example 2: Outbound Sales Call

Make an outbound phone call and retrieve the full conversation.

```javascript
// Step 1: Verify phone numbers are available
const phoneNumbers = await listPhoneNumbers();
console.log(phoneNumbers);
/*
[
  {
    phone_number_id: "phnum_xxx",
    number: "+19207098588",
    label: "Sales Line"
  }
]
*/

// Step 2: Initiate the outbound call
const call = await initiateOutboundCall({
  agent_id: "agent_4301kan4hcdtfygbvfynw5fa78tn",
  to_number: "+15551234567",
  agent_phone_number_id: "phnum_xxx" // Optional
});

console.log(call);
/*
{
  message: "Outbound call initiated successfully",
  conversation_id: "conv_9901kap1jkjrfjg9jtg27vxd65n3",
  status: "initiated"
}
*/

// Step 3: Poll for completion (wait a few seconds between polls)
async function waitForCompletion(conversationId) {
  while (true) {
    const status = await getCallStatus({ conversation_id: conversationId });

    console.log(`Status: ${status.status}`);

    if (status.status === "done" || status.status === "failed") {
      return status;
    }

    // Wait 5 seconds before polling again
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
}

const finalStatus = await waitForCompletion("conv_9901kap1jkjrfjg9jtg27vxd65n3");

// Step 4: Retrieve the full transcript
const transcript = await getCallTranscript({
  conversation_id: "conv_9901kap1jkjrfjg9jtg27vxd65n3"
});

console.log(transcript);
```

## Example 3: Conversation Analysis

Analyze a completed conversation for insights.

```javascript
const transcript = await getCallTranscript({
  conversation_id: "conv_9901kap1jkjrfjg9jtg27vxd65n3"
});

// Analyze conversation metrics
const metrics = {
  totalDuration: transcript.metadata.call_duration_secs,
  totalCost: transcript.metadata.cost,
  llmCost: transcript.metadata.charging.llm_charge,
  callCost: transcript.metadata.charging.call_charge,
  totalTurns: transcript.transcript.length,
  agentTurns: transcript.transcript.filter(t => t.role === "agent").length,
  userTurns: transcript.transcript.filter(t => t.role === "user").length,
  interruptions: transcript.transcript.filter(t => t.interrupted).length
};

console.log(metrics);
/*
{
  totalDuration: 93,
  totalCost: 874,
  llmCost: 11,
  callCost: 863,
  totalTurns: 10,
  agentTurns: 5,
  userTurns: 5,
  interruptions: 2
}
*/

// Analyze conversation flow
const conversationFlow = transcript.transcript.map(turn => ({
  time: turn.time_in_call_secs,
  role: turn.role,
  message: turn.message?.substring(0, 50) + "...",
  interrupted: turn.interrupted || false
}));

console.log(conversationFlow);
/*
[
  { time: 0, role: "agent", message: "Hi there, I'm reaching out from Duvo.ai...", interrupted: false },
  { time: 6, role: "user", message: "Sure.", interrupted: false },
  { time: 8, role: "agent", message: "Great, thanks for taking my call...", interrupted: true },
  ...
]
*/
```

## Example 4: Testing Agent Variations

Test multiple messages with the same agent to evaluate responses.

```javascript
const testMessages = [
  "What services do you offer?",
  "How much does it cost?",
  "Can you help with automation?",
  "I'm not interested, goodbye."
];

async function testAgent(agentId, messages) {
  const results = [];

  for (const message of messages) {
    console.log(`Testing: ${message}`);

    const result = await initiateAgentCall({
      agent_id: agentId,
      initial_message: message,
      timeout: 30000
    });

    results.push({
      input: message,
      response: result.transcript.find(t => t.role === "agent")?.message,
      duration: result.duration,
      status: result.status
    });

    // Wait 2 seconds between tests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  return results;
}

const testResults = await testAgent(
  "agent_4301kan4hcdtfygbvfynw5fa78tn",
  testMessages
);

console.log(testResults);
```

## Example 5: Cost Tracking

Track costs across multiple calls.

```javascript
const conversationIds = [
  "conv_001",
  "conv_002",
  "conv_003"
];

async function analyzeCosts(convIds) {
  let totalCost = 0;
  let totalLlmCost = 0;
  let totalCallCost = 0;
  let totalDuration = 0;

  const details = [];

  for (const convId of convIds) {
    const transcript = await getCallTranscript({ conversation_id: convId });

    totalCost += transcript.metadata.cost;
    totalLlmCost += transcript.metadata.charging.llm_charge;
    totalCallCost += transcript.metadata.charging.call_charge;
    totalDuration += transcript.metadata.call_duration_secs;

    details.push({
      conversation_id: convId,
      duration: transcript.metadata.call_duration_secs,
      cost: transcript.metadata.cost,
      llm_cost: transcript.metadata.charging.llm_charge,
      call_cost: transcript.metadata.charging.call_charge,
      cost_per_minute: (transcript.metadata.cost / transcript.metadata.call_duration_secs * 60).toFixed(2)
    });
  }

  return {
    summary: {
      total_calls: convIds.length,
      total_cost: totalCost,
      total_llm_cost: totalLlmCost,
      total_call_cost: totalCallCost,
      total_duration_secs: totalDuration,
      avg_cost_per_call: (totalCost / convIds.length).toFixed(2),
      avg_duration_per_call: (totalDuration / convIds.length).toFixed(2)
    },
    details
  };
}

const costReport = await analyzeCosts(conversationIds);
console.log(costReport);
```

## Example 6: Error Handling with Call Outcomes

Properly handle all call outcomes including no-answer scenarios.

```javascript
async function safeGetTranscript(conversationId, maxRetries = 10) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const status = await getCallStatus({ conversation_id: conversationId });

      // Check call outcome to determine how to proceed
      if (status.call_outcome === "completed") {
        // Transcript should be available
        return await getCallTranscript({ conversation_id: conversationId });
      } else if (status.call_outcome === "failed") {
        // Return failed call data
        const transcript = await getCallTranscript({ conversation_id: conversationId });
        console.warn("Call failed:", transcript.error);
        return transcript;
      } else if (status.call_outcome === "no_answer") {
        // Return no-answer data (empty transcript)
        const transcript = await getCallTranscript({ conversation_id: conversationId });
        console.warn("Call was not answered");
        return transcript;
      } else {
        // Still processing, wait and retry
        console.log(`Status: ${status.status}, call_outcome: ${status.call_outcome}, waiting...`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error; // Final retry failed
      }
      console.log(`Retry ${i + 1}/${maxRetries}: ${error.message}`);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  throw new Error("Max retries exceeded");
}

// Usage with outcome handling
try {
  const transcript = await safeGetTranscript("conv_9901kap1jkjrfjg9jtg27vxd65n3");

  switch (transcript.call_outcome) {
    case "completed":
      console.log("✅ Call completed successfully");
      console.log(`Duration: ${transcript.metadata.call_duration_secs}s`);
      console.log(`Turns: ${transcript.transcript.length}`);
      break;

    case "no_answer":
      console.log("📞 Call was not answered");
      console.log(`Attempted at: ${new Date(transcript.metadata.start_time_unix_secs * 1000).toISOString()}`);
      // Maybe retry or mark for follow-up
      break;

    case "failed":
      console.log("❌ Call failed");
      console.log(`Error: ${transcript.error || "Unknown error"}`);
      // Handle failure appropriately
      break;
  }
} catch (error) {
  console.error("Failed to get transcript:", error.message);
}
```

## Example 7: Batch Calling with Rate Limiting

Make multiple outbound calls with rate limiting.

```javascript
async function batchCall(agentId, phoneNumbers, delayMs = 10000) {
  const results = [];

  for (const phoneNumber of phoneNumbers) {
    try {
      console.log(`Calling ${phoneNumber}...`);

      const call = await initiateOutboundCall({
        agent_id: agentId,
        to_number: phoneNumber
      });

      results.push({
        phone_number: phoneNumber,
        conversation_id: call.conversation_id,
        status: "initiated",
        timestamp: new Date().toISOString()
      });

      // Wait between calls to avoid rate limits
      if (phoneNumbers.indexOf(phoneNumber) < phoneNumbers.length - 1) {
        console.log(`Waiting ${delayMs}ms before next call...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    } catch (error) {
      results.push({
        phone_number: phoneNumber,
        error: error.message,
        status: "failed",
        timestamp: new Date().toISOString()
      });
    }
  }

  return results;
}

const phoneNumbers = ["+15551234567", "+15559876543", "+15555555555"];
const batchResults = await batchCall(
  "agent_4301kan4hcdtfygbvfynw5fa78tn",
  phoneNumbers,
  10000 // 10 seconds between calls
);

console.log(batchResults);
```

## Example 8: Custom Variables

Use custom variables to personalize agent conversations.

```javascript
const result = await initiateAgentCall({
  agent_id: "agent_4301kan4hcdtfygbvfynw5fa78tn",
  initial_message: "Hello!",
  custom_variables: {
    customer_name: "John Doe",
    company_name: "Acme Corp",
    product_interest: "Enterprise AI Automation",
    account_type: "premium"
  },
  timeout: 60000
});

// The agent can reference these variables in its prompts
// to provide personalized responses
console.log(result.transcript);
```

## Common Patterns

### Pattern 1: Wait for Completion
```javascript
async function waitForDone(conversationId) {
  while (true) {
    const status = await getCallStatus({ conversation_id: conversationId });
    if (status.status === "done" || status.status === "failed") {
      return status;
    }
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
}
```

### Pattern 2: Retry with Exponential Backoff
```javascript
async function retryWithBackoff(fn, maxRetries = 5) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      const delay = Math.min(1000 * Math.pow(2, i), 10000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

### Pattern 3: Status Monitoring
```javascript
async function monitorCall(conversationId, onStatusChange) {
  let lastStatus = null;

  while (true) {
    const status = await getCallStatus({ conversation_id: conversationId });

    if (status.status !== lastStatus) {
      onStatusChange(status);
      lastStatus = status.status;
    }

    if (status.status === "done" || status.status === "failed") {
      return status;
    }

    await new Promise(resolve => setTimeout(resolve, 3000));
  }
}

await monitorCall("conv_xxx", (status) => {
  console.log(`Status changed to: ${status.status}`);
});
```
