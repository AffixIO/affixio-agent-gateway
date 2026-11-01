# HMRC trusts-store

Repository: https://github.com/hmrc/trusts-store

The service stores a trust claim against an authenticated internal identifier and exposes authenticated GET and POST flows. A narrowly scoped AffixIO experiment could provide an integrity receipt for a write event containing only a canonical request digest, policy version, timestamp and outcome. It must not include the trust identifier, internal identifier, authentication headers or payload contents in a hosted proof request.

The repository is Apache-2.0 and issue-enabled. No separate contribution guide was published, so any discussion should be a question first, not a code proposal. The existing authentication and HMRC data-minimisation model remains authoritative.
