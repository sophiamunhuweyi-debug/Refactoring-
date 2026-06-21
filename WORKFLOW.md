# Vanguard Engineering — Team Code Workflow

This document defines the software engineering standards, branch strategies, directory structure, and development processes for the Vanguard Engineering team. All team members must strictly adhere to this workflow.

---

## 1. Directory Structure

The repository is organized into a single multi-package monorepo for Frontend, Backend, Database, and Tests:

```
Refactoring-/
├── src/
│   ├── database/           # Relational schema & migration SQL scripts
│   │   └── schema.sql
│   ├── backend/            # API endpoints & server-side logic (Express/Node.js)
│   ├── frontend/           # UI components & state machine (React + Vite + Tailwind)
│   └── integration-tests/  # End-to-end integration test suites
├── docs/                   # Planning, visual designs, and specs
│   └── ui-design.md
├── WORKFLOW.md             # This document
└── README.md
```

---

## 2. Branch & Git Strategy

To ensure clean architecture and continuous delivery without regression, we follow a strict feature branch strategy:

1. **Development Branches:**
   - Never commit directly to the `main` branch.
   - All work must be completed on feature branches branched off `main`.
   - Branch naming convention: `feature/<role>-<short-description>` (e.g., `feature/backend-inquiries-api`, `feature/frontend-landing-page`).

2. **Commit Guidelines:**
   - Use conventional, semantic commit messages:
     - `feat(backend): add POST /api/inquiries route`
     - `feat(frontend): build responsive Hero section`
     - `test(qa): add end-to-end integration tests`
     - `docs(db): draft schema.sql migrations`

3. **Pull Requests (PRs):**
   - Push feature branches to GitHub and open a Pull Request (PR) into the `main` branch.
   - PR titles must reflect the feature and include a clear, concise description of changes and instructions on how to run tests.

---

## 3. Task Lifecycle & Kanban Board

1. **In-Progress:**
   - When a task is assigned, move it to `in-progress` (handled automatically by the Lead via task assignment).
   - Work locally in your home directory or inside the shared sandbox repository path `/home/team/shared/Refactoring-`.

2. **Review & Code Review:**
   - Once work is complete, push your feature branch and open a PR on GitHub.
   - Call `finish_task` with your result, PR URL, and artifacts.
   - This moves the task to `review` and wakes up the Technical Lead.

3. **Approval & Merging:**
   - The Technical Lead reviews your PR on GitHub, checks the code, verifies test output, and uses the `merge_pr` tool to merge your PR into `main`.
   - If everything is solid, the Lead approves the task, moving it to `done`.
   - If changes are needed, the Lead rejects the task with clear feedback, returning it to `in-progress` and waking you up to address it.

---

## 4. Testing & Quality Assurance

- **Zero-Regression Policy:** Every PR must contain relevant unit and component tests (for Frontend/Backend) or end-to-end integration tests (for QA).
- **KPI Metrics:** Code must maintain high test coverage (>90% average) and satisfy all accessibility checkmarks defined in `ui-design.md`.
