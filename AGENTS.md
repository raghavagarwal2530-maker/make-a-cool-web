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

- Run: `docker compose -f docker-compose.base44.yml up -d` → preview on host port 3000 (Vite dev server on 3000 inside the container; `--strictPort false` overrides `@lovable.dev/vite-tanstack-config`'s forced port).
- Deps are installed with bun from `bun.lock` (`--frozen-lockfile`) using the `oven/bun:1.2-debian` image; `node_modules` lives in an anonymous volume so host installs don't leak in.
- Backend is a hosted Supabase project; the public URL/publishable key come from the committed `.env` (Vite loads it automatically) and are mirrored in `.env.base44-defaults`. No secrets are needed to boot.
- `SUPABASE_SERVICE_ROLE_KEY` / `LOVABLE_CRON_SECRET` are read only by `src/integrations/supabase/client.server.ts` / `cron-auth.ts`, which no route imports yet — add them via Base44 secrets if server functions start using them.
- Routes: `/`, `/about`, `/pricing`, `/how-it-works`, `/get-started` (Supabase email OTP), `/volunteer`, `/find-work` (browse mock gigs by distance), `/post-a-gig` (AI reconfirm + location, mock client-side AI in `src/lib/gig-ai.ts`).
- Verify: `curl localhost:3000/` returns the "WorkWave" page; `bunx tsc --noEmit` and `bun run build` both pass.
- Note: client-side navigation in the preview can report a non-fatal hydration mismatch warning; SSR serves every route correctly.
