import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 200, headers: corsHeaders });

  const defaultProvider = Deno.env.get("DEFAULT_PROVIDER") || "gemini";
  const defaultModel = Deno.env.get("DEFAULT_MODEL") || "gemini-2.5-flash-lite";

  const geminiKey = Deno.env.get("GEMINI_API_KEY") || "";
  const openaiKey = Deno.env.get("OPENAI_API_KEY") || "";

  const defaultAvailable =
    (defaultProvider === "gemini" && geminiKey.length > 0) ||
    (defaultProvider === "openai" && openaiKey.length > 0);

  return new Response(
    JSON.stringify({
      status: "ok",
      default_ai_available: defaultAvailable,
      default_provider: defaultProvider,
      default_model: defaultModel,
    }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});
