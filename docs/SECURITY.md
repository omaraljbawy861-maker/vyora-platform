# Security Baseline

- Keep secrets in environment variables; never expose server secrets to browser code.
- Enforce authorization on the server and at the database layer.
- Use least-privilege role permissions and require strong authentication for owner accounts.
- Record privileged actions in append-only audit events.
- Provide report, block, mute, and appeal flows before opening user-generated content to the public.
- Apply rate limits to login, messaging, posting, search, and invitation endpoints.
- Validate and constrain uploads; do not serve arbitrary executable content.
- Establish privacy, retention, deletion, and incident-response policies before public launch.
