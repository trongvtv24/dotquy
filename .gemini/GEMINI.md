## Solo Builder Project Reference

### CONTEXT OVERFLOW RECOVERY
**When context gets full or you feel lost in a long session:**
1. Re-read the solo-builder skill: `C:\Users\Trong\.gemini\antigravity\skills\solo-builder\SKILL.md`
2. Re-read `docs/MASTER_PLAN.md` for project overview and phase index
3. Re-read the CURRENT phase's `SPEC.md` and `IMPLEMENTATION.md`
4. Follow the workflow strictly - especially the checkpoints below!

### WORKFLOW CHECKPOINTS (MANDATORY - DO NOT SKIP!)
| After Step | Action |
| --- | --- |
| Phase 1 (Master Plan) complete | -> Present summary -> STOP for Human review |
| Phase 2 (Review) approved | -> Begin per-phase build cycle |
| Step 3.4 (Test Plan) created | -> STOP for Human review of test plan |
| Step 3.6 (Tests) complete | -> Validate phase -> Move to next phase |

**CRITICAL:** After finishing each phase's implementation, you MUST:
1. Create TEST_PLAN.md for that phase
2. STOP and wait for Human approval
3. DO NOT run any tests until Human reviews TEST_PLAN.md!

### Primary Documentation
- `docs/MASTER_PLAN.md` - Product overview & phase index
- `docs/phase_N_<name>/SPEC.md` - Current phase requirements
- `docs/phase_N_<name>/IMPLEMENTATION.md` - Current phase task tracking
- `docs/phase_N_<name>/TEST_PLAN.md` - Current phase test cases

### Context Rule
ONLY read docs for the CURRENT phase. Do NOT load all phases into context.

### Project Summary
- **App Type**: Web App (Admin Dashboard)
- **Tech Stack**: Next.js, TypeScript, TailwindCSS, Supabase
- **Core Features**: Article Management (CRUD), Supabase Auth, Experience Page Integration
- **Current Phase**: Phase 1 (Research & Plan)

### Coding Guidelines
- Follow current phase's `IMPLEMENTATION.md` for tasks
- Use typed language (TypeScript) as specified in MASTER_PLAN.md
- Mark completed tasks with `[x]`
- Keep code minimal and focused
