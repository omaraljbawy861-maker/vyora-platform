# VYORA

**Connect Beyond Borders.**

VYORA is a multilingual community platform concept designed to help people discover communities, share content, and communicate across language barriers.

## Product direction

- Responsive web experience first, followed by Android and iOS apps.
- Free core social features, with optional premium tools and carefully labelled advertising later.
- Multilingual interface and translation-ready content architecture.
- Separate owner, administrator, and moderator roles with least-privilege permissions.
- User safety, privacy, reporting, blocking, and moderation are core product requirements.

## Repository structure

```
apps/
  web/          Next.js web application
docs/           Product and technical decisions
```

## Development status

This repository currently contains the initial product foundation and documentation. Authentication, database persistence, media processing, messaging, translation providers, and mobile clients are not yet implemented.

## Getting started

See [apps/web/README.md](apps/web/README.md) for local web development instructions.

## Security

Never commit API keys, service-role keys, passwords, private user data, or production secrets. Use environment variables and keep `.env.local` out of version control.

## Important

VYORA is a working project name, not a confirmation of trademark or domain availability. Complete legal and brand clearance before commercial launch.
