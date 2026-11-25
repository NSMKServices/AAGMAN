-- Audit trigger function is invoked by table triggers, not through PostgREST RPC.
-- Remove default/public client execution while preserving trigger execution.
revoke all on function public.fn_audit_content_changes() from public, anon, authenticated;
