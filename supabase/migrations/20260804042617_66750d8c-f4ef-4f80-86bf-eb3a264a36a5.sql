CREATE TABLE public.audit_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  url text NOT NULL,
  checks text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'queued',
  progress int NOT NULL DEFAULT 0,
  score int,
  results jsonb NOT NULL DEFAULT '[]'::jsonb,
  error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.audit_runs TO authenticated;
GRANT ALL ON public.audit_runs TO service_role;
ALTER TABLE public.audit_runs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own audit runs" ON public.audit_runs FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER update_audit_runs_updated_at BEFORE UPDATE ON public.audit_runs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_messages TO authenticated;
GRANT ALL ON public.chat_messages TO service_role;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own chat messages" ON public.chat_messages FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.data_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider text NOT NULL,
  property text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX one_active_connection_per_user ON public.data_connections (user_id) WHERE active;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.data_connections TO authenticated;
GRANT ALL ON public.data_connections TO service_role;
ALTER TABLE public.data_connections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own connections" ON public.data_connections FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER update_data_connections_updated_at BEFORE UPDATE ON public.data_connections FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();