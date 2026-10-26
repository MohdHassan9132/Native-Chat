# Auth Requirements

> **Document type:** Target-state functional and non-functional requirements  
> **Scope:** NativeChat authentication  
> **Status:** Target requirements are defined below. Capacity and performance are not considered proven until benchmark results are recorded.

## 1. Functional Requirements

- Users shall be able to register using a verified phone number.
- Users shall be able to log in using the supported phone-number or email flow.
- The server shall validate all authentication input before processing it.
- The server shall generate short-lived OTP challenges and deliver OTPs through the configured delivery provider.
- OTP challenges shall expire after 5 minutes.
- A successful OTP challenge shall be consumed exactly once, including when concurrent verification requests are received.
- Each challenge shall allow no more than 3 incorrect OTP attempts; exhausting the limit shall trigger the defined temporary block policy.
- The system shall prevent repeated challenge creation and verification attempts from bypassing rate limits.
- Successful registration verification shall create the account and issue authentication tokens.
- Successful login verification shall issue authentication tokens for the existing account.
- Protected API requests and WebSocket connections shall authenticate the user and enforce authorization.
- The refresh-token flow shall validate the refresh token and support revocation/rotation according to the session policy.
- Authentication shall fail safely when required dependencies are unavailable; it shall not issue tokens when verification or persistence has not succeeded.

## 2. Non-Functional Requirements

### Security and privacy

- Raw OTP values shall never be stored in persistent storage or production logs. Store only a keyed HMAC/hash suitable for verification.
- Raw refresh tokens shall never be stored in the database; persist only a cryptographic hash of the token.
- Sensitive identifiers shall be protected at rest where appropriate. Use keyed HMACs for lookup where deterministic matching is required, and encryption where the original value must be recovered.
- Encryption keys, HMAC secrets, and JWT signing secrets shall be stored outside source control and rotated according to a defined policy.
- All client/server communication shall use HTTPS; secrets and tokens shall not be logged.
- Access tokens shall have bounded lifetimes. Refresh tokens shall be revocable and protected against replay according to the session design.
- OTP verification, challenge consumption, attempt decrementing, and blocking shall be safe under concurrent requests.
- Rate limiting shall prevent abuse across relevant dimensions, including identifier and source IP, with distributed enforcement when multiple application instances are used.
- Authentication errors shall not disclose whether sensitive account details exist beyond the product's deliberate account-enumeration policy.

### Scalability and performance

- The target system shall support **1,000,000 concurrently connected/active users** under a documented workload model.
- The workload model shall specify the fraction of users authenticating per second/minute, request mix, connection behavior, and traffic-spike profile. One million concurrent users shall not be interpreted as one million requests per second unless explicitly required by the workload.
- The system shall scale horizontally without relying on in-memory state held by a single application instance.
- Slow external delivery providers shall not hold application request resources indefinitely; use bounded timeouts and asynchronous delivery processing where appropriate.
- Queues and workers shall have bounded concurrency, retry policies, duplicate-job handling, and overload behavior.
- Redis and database access shall use bounded connection pools and efficient queries. The system shall handle dependency saturation without unbounded queues or resource exhaustion.
- Define and measure latency objectives for each endpoint. **Initial target values must be agreed before the acceptance benchmark**; record p50, p95, and p99 latency.
- Define an acceptable error-rate threshold and minimum sustained throughput for the target workload before testing.
- The system shall expose sufficient metrics to identify saturation in application instances, Redis, PostgreSQL, queues/workers, and delivery providers.

### Reliability and operations

- The system shall handle process restarts and individual instance failures without losing durable account/session data.
- Queue-backed work shall be retried only under a defined policy and shall not cause duplicate account creation or duplicate logical processing.
- Redis, database, and delivery-provider timeouts and errors shall be handled explicitly.
- The system shall provide structured logs and metrics without logging raw OTPs, raw refresh tokens, or other secrets.
- Performance claims shall be tied to a repeatable test configuration, build/commit, environment, workload, and date.

## 3. Rate-Limiting Policy

The current implementation configures these route-level limits:

| Endpoint group | Current configured limit |
|---|---|
| Registration initiation | 3 requests per hour |
| Login initiation | 3 requests per hour |
| Registration verification | 9 requests per hour |
| Login verification | 9 requests per hour |

These are current settings, not proof that distributed abuse protection is complete. The target system shall apply appropriately scoped, distributed rate limits and document the final policy. IP-based limits and CAPTCHA are not currently implemented.

## 4. Performance Acceptance Record

**Target:** 1,000,000 concurrent/active users under the documented workload.

**Current result:** Not measured. Do not claim the target is met until load tests demonstrate it.

```json
{
  "target": {
    "concurrentUsers": 1000000,
    "workloadModel": "REQUIRED: define authentication rate, request mix, connection behavior, and spike profile"
  },
  "benchmark": {
    "version": "TBD",
    "commit": "TBD",
    "testDate": "TBD",
    "environment": "TBD",
    "tool": "k6",
    "duration": "TBD",
    "loadProfile": "TBD"
  },
  "acceptanceTargets": {
    "p95LatencyMs": "SET BEFORE TEST",
    "p99LatencyMs": "SET BEFORE TEST",
    "maximumErrorRatePercent": "SET BEFORE TEST",
    "minimumSustainedRequestsPerSecond": "SET BEFORE TEST"
  },
  "measuredResults": {
    "achievedConcurrentUsers": null,
    "achievedRequestsPerSecond": null,
    "latencyP50Ms": null,
    "latencyP95Ms": null,
    "latencyP99Ms": null,
    "errorRatePercent": null,
    "droppedIterations": null
  },
  "resourceMetrics": {
    "applicationCpuAndMemory": "TBD",
    "redisUtilizationAndLatency": "TBD",
    "databaseConnectionsAndLatency": "TBD",
    "queueDepthAndWorkerThroughput": "TBD"
  },
  "result": "NOT TESTED",
  "bottleneck": "TBD",
  "evidence": "TBD: link to k6 output, test script, and monitoring results"
}
```

## 5. Verification Plan

- Test registration initiation, login initiation, successful verification, incorrect OTP, expired challenge, and rate-limited requests as separate scenarios.
- Test concurrent attempts against one challenge and verify that at most one request succeeds.
- Test sustained load, gradual ramp-up, short traffic spikes, and recovery after the spike.
- Test with the actual Redis, PostgreSQL, application-instance, queue/worker, and delivery-provider configuration intended for the benchmark.
- Measure both API response behavior and downstream work completion, such as OTP delivery latency and queue depth.
- Record the highest load at which every predefined acceptance threshold remains satisfied.
- Do not use a third-party OTP provider for load testing without permission; use a controlled test adapter or sandbox.
- A k6 result only supports the workload and environment actually tested. It does not by itself prove every possible one-million-user workload.

## 6. Implementation Versions

| Version | Intended milestone | Evidence required |
|---|---|---|
| V1 | Current direct-flow baseline | Baseline k6 results and bottleneck analysis |
| V2 | Queue and workers for suitable asynchronous work | Comparable k6 results plus queue depth, processing rate, and delivery latency |
| V3 | Horizontal application scaling | Comparable results plus per-instance and shared-dependency metrics |
| V4+ | Optimize measured Redis/database/worker bottlenecks | Before/after results for each change |

Each version shall record the implementation change, hypothesis, test environment, workload, measured results, observed bottleneck, and conclusion. The one-million-user goal remains a target until supported by benchmark evidence.
