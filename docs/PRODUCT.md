# VYORA Product Brief

## Vision

Help people connect across borders by combining community discovery, content sharing, and language-aware communication.

## Initial release principles

1. Ship a dependable, narrow first release before attempting a full-scale social network.
2. Prioritize account security, user safety, privacy, and accessibility.
3. Do not launch public messaging, live streaming, or user-generated media until moderation and abuse-handling workflows are ready.
4. Keep core participation free. Premium features must be optional and must not undermine safety or basic access.
5. Make translation transparent: indicate translated text and allow users to view the original.

## MVP scope

- Responsive public landing page.
- Internationalized product shell (English first, Arabic-ready RTL).
- Authentication integration placeholder, not falsely represented as active.
- Community and feed experience using clearly labelled demo content only.
- Report, block, and moderation requirements documented before real user content is enabled.

## Later phases

- Real authentication and profile management.
- Persistent posts, comments, reactions, follows, and communities.
- Private messaging after safety controls are implemented.
- Translation provider integration with user consent and transparent limitations.
- Flutter mobile apps.
- Premium subscription and advertising infrastructure only after product-market validation.

## Roles

- Owner: exclusive access to platform-wide settings, ownership and billing controls.
- Admin: operational management within explicitly assigned permissions.
- Moderator: review reports and apply limited content/account actions.
- Member: use community features and manage their own content.

All privileged actions must be enforced server-side and recorded in an audit log. Hiding UI controls is not authorization.
