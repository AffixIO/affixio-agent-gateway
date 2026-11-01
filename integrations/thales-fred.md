# Thales Fred

Repository: https://github.com/ThalesGroup/fred

Fred already treats identity, access control, audit and evaluation as first-class concerns. The smallest useful AffixIO experiment would be an optional execution receipt around an agent tool call:

1. hash the tool name, selected resource and canonical arguments;
2. ask the local policy gate for an allow or deny decision;
3. execute only after an allow decision;
4. store a redacted, signed receipt beside the existing audit event.

The experiment should remain optional, local-first and disabled by default. It should not send document contents or operator identity to a hosted service.
