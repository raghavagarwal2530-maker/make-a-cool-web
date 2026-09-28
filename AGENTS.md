<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Base44 dev environment

- Run: `docker compose -f docker-compose.base44.yml up -d` → preview on host port 3000 (Vite dev server on 8080 inside the container; `@lovable.dev/vite-tanstack-config` forces port 8080).
- Deps are installed with bun from `bun.lock` (`--frozen-lockfile`); there is no npm lockfile. `node_modules` lives in a named volume.
- Backend is a hosted Supabase project; the public URL/publishable key come from the committed `.env` (Vite loads it automatically). No secrets are needed to boot.
- `SUPABASE_SERVICE_ROLE_KEY` / `LOVABLE_CRON_SECRET` are read only by `src/integrations/supabase/client.server.ts` / `cron-auth.ts`, which no route imports yet — they'd need to be added via Base44 secrets if server functions start using them.
- Verify: `curl localhost:3000/` returns the "WorkWave" page; routes: /, /about, /pricing, /how-it-works, /get-started (Supabase email OTP), /volunteer.
