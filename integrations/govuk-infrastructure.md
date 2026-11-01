# GOV.UK infrastructure

Repository: https://github.com/alphagov/govuk-infrastructure

This repository manages Terraform, container images and GitHub workflows for GOV.UK infrastructure. A useful AffixIO experiment would be an optional signed change receipt around a planned infrastructure operation: canonical plan digest, repository commit, workflow run, policy decision and timestamp. It should never sign secrets, state files or credentials, and it must not replace existing GitHub, Terraform or cloud approval controls.

The repository is MIT-licensed and issue-enabled. Its README documents Terraform versioning, pre-commit hooks and Vale documentation checks. Any future implementation should preserve those checks and begin as a design discussion.
