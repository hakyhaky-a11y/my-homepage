import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Loader2, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendStreamRequest } from "@/lib/sse";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "学什么比较好？",
  "未来教育行业怎么样？",
  "怎么规划职业发展？",
];

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const streamingContentRef = useRef("");

  // 自动滚动到底部
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const flushToState = useCallback(() => {
    const content = streamingContentRef.current;
    setMessages((prev) => {
      const copy = [...prev];
      const last = copy[copy.length - 1];
      if (last?.role === "assistant") copy[copy.length - 1] = { ...last, content };
      return copy;
    });
  }, []);

  const handleSend = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming) return;

      setInput("");
      streamingContentRef.current = "";
      abortRef.current = new AbortController();

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: trimmed,
      };
      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: "",
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setIsStreaming(true);

      await sendStreamRequest({
        functionUrl: `${supabaseUrl}/functions/v1/wenxin-text-generation`,
        requestBody: {
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        },
        supabaseAnonKey,
        signal: abortRef.current.signal,
        onData: (data) => {
          if (data === "[DONE]") return;
          try {
            const parsed = JSON.parse(data);
            const chunk = parsed.choices?.[0]?.delta?.content ?? "";
            if (!chunk) return;
            streamingContentRef.current += chunk;
            flushToState();
          } catch {
            // 跳过无法解析的帧
          }
        },
        onComplete: () => {
          flushToState();
          setIsStreaming(false);
        },
        onError: (error) => {
          console.error("Stream error:", error);
          streamingContentRef.current = "回复失败，请稍后重试。";
          flushToState();
          setIsStreaming(false);
        },
      });
    },
    [messages, isStreaming, flushToState]
  );

  const handleAbort = () => {
    abortRef.current?.abort();
    setIsStreaming(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      className="flex flex-col h-full bg-card border border-border rounded-xl overflow-hidden"
    >
      {/* 聊天区标题 */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <Bot className="w-4 h-4 text-primary-foreground" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Huky 的数字分身</p>
          <p className="text-xs text-muted-foreground">可以问我关于教育、学习、规划的问题</p>
        </div>
      </div>

      {/* 消息列表 */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">你好！我是 Huky 的数字分身</p>
              <p className="text-xs text-muted-foreground">你可以问我关于教育、学习、职业规划的问题</p>
            </div>
            {/* 推荐问题 */}
            <div className="flex flex-wrap gap-2 justify-center max-w-xs">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleSend(q)}
                  className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/5 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === "user"
                    ? "bg-accent"
                    : "bg-primary"
                }`}
              >
                {msg.role === "user" ? (
                  <User className="w-3.5 h-3.5 text-accent-foreground" />
                ) : (
                  <Bot className="w-3.5 h-3.5 text-primary-foreground" />
                )}
              </div>
              <div
                className={`max-w-[75%] px-3 py-2 rounded-lg text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {msg.content || (
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 输入区 */}
      <div className="p-3 border-t border-border bg-muted/30">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入你的问题..."
            rows={1}
            className="flex-1 min-w-0 resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
          />
          {isStreaming ? (
            <Button
              variant="outline"
              size="icon"
              onClick={handleAbort}
              className="shrink-0"
            >
              <StopCircle className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              size="icon"
              onClick={() => handleSend(input)}
              disabled={!input.trim()}
              className="shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}