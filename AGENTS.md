# Contribution workflow

Before changing files on a task branch:

1. Synchronize the branch with the latest GitHub default branch (`main`). Fetch
   and merge/rebase `origin/main` before editing whenever a remote is available.
2. If the workspace provides the latest default-branch commit without an
   `origin` remote, merge that commit before creating the task commit.
3. Keep a follow-up pull request limited to its new change. Do not recreate or
   reapply changes that have already been merged into `main`.
4. Resolve and commit any branch conflicts before calling `make_pr`.
5. Confirm the final branch has no conflict markers and compare its diff against
   the latest default branch, not against an older task branch.

For static asset changes, update the cache-busting version consistently in
`index.html` and in any versioned JavaScript module imports.
