# Security Policy

## Supported Versions

The following table describes which versions of AgriNN currently receive security updates.

| Version | Supported |
| ------- | --------- |
| 1.x     | Yes       |
| 0.x     | No        |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it privately by email:

- **Email:** security@example.com

Please do **not** create a public GitHub issue for security vulnerabilities.

When reporting, include as much detail as possible:

- Description of the vulnerability
- Affected component(s)
- Reproduction steps or proof of concept
- Potential impact
- Suggested mitigation (if known)

## Response Timeline

We aim to follow this response timeline:

- **Acknowledgement:** within 72 hours
- **Initial assessment:** within 7 business days
- **Status updates:** at least weekly until resolution
- **Fix release target:** based on severity and complexity

Timelines may vary for complex issues, but we will keep reporters informed.

## Responsible Disclosure

We request responsible disclosure from all researchers and contributors:

- Report vulnerabilities privately before any public disclosure.
- Allow reasonable time for investigation and remediation.
- Avoid accessing, modifying, or deleting data that you do not own.
- Avoid actions that could disrupt services or compromise user privacy.

After a fix is released, we may publicly acknowledge the report (with your permission).

## Security Best Practices for Contributors

- Keep dependencies up to date and monitor advisories.
- Never commit secrets (API keys, tokens, credentials).
- Use environment variables for sensitive configuration.
- Validate and sanitize all user inputs.
- Apply authentication and authorization checks consistently.
- Prefer least-privilege access for services and database users.
- Use HTTPS in production environments.
- Review logging to avoid leaking sensitive data.

Thank you for helping keep AgriNN and its community secure.
