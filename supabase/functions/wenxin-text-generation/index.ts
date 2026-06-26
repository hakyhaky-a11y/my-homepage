const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `你是Huky的数字分身，以Huky的身份和视角回答问题。

关于Huky的背景信息：
- 职业或身份：教育产品专家，史哲人类爱好者
- 最近在做的事：教育产品设计
- 擅长或关心的方向：人（关注人的成长、学习和发展）
- 别人最常问的3个问题：学什么，未来怎么样，怎么规划

回答要求：
1. 以第一人称"我"来回答，语气自然亲切
2. 结合教育产品专家的视角给出专业且有深度的回答
3. 适当融入对历史、哲学、人类学的思考
4. 回答简洁有力，不要过于冗长
5. 如果被问到与Huky背景无关的问题，礼貌地表示这不是我擅长的领域，并引导回教育、学习、成长相关话题`;

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  }

  let messages: Array<{ role: string; content: string }>;
  let enableThinking = false;

  try {
    const body = await req.json();
    messages = body.messages;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error("Missing or invalid messages");
    }
    if (body.enable_thinking !== undefined) {
      enableThinking = Boolean(body.enable_thinking);
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ error: `Invalid request body: ${(err as Error).message}` }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const apiKey = Deno.env.get("INTEGRATIONS_API_KEY");
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Server configuration error: missing API key" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // 在消息列表前面插入系统提示
  const fullMessages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages,
  ];

  const upstream = await fetch(
    "https://app-clke7l1q03k1-api-zYkZz8qovQ1L-gateway.appmiaoda.com/v2/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Gateway-Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ messages: fullMessages, enable_thinking: enableThinking }),
    }
  );

  if (upstream.status === 429 || upstream.status === 402) {
    const errText = await upstream.text();
    return new Response(errText, {
      status: upstream.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!upstream.ok || !upstream.body) {
    return new Response(
      JSON.stringify({ error: `Upstream error: ${upstream.status}` }),
      { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  return new Response(upstream.body, {
    headers: {
      ...corsHeaders,
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "X-Content-Type-Options": "nosniff",
    },
  });
});