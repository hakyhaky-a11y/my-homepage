import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Loader2, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendStreamRequest } from "@/lib/sse";
import { supabaseUrl, supabaseAnonKey } from "@/db/supabase";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "学历与学力",
  "未来教育行业怎么样？",
  "专业职业行业",
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
    <div className="flex flex-col h-full bg-card">
      <div className="flex items-center gap-3 px-4 md:px-6 py-3 md:py-4 border-b border-border bg-background/50 backdrop-blur-sm">
        <div className="relative">
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md shadow-primary/20">
            <Bot className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm md:text-base font-semibold text-foreground truncate">Huky 的数字分身</p>
          <p className="text-xs text-muted-foreground truncate">在线 · 聊聊教育、学习和职业规划</p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-3 md:p-5 space-y-3 md:space-y-4 min-h-0 bg-muted/20"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full space-y-5 md:space-y-6 text-center px-2">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Bot className="w-7 h-7 md:w-8 md:h-8 text-primary" />
            </div>
            <div className="space-y-2">
              <p className="text-base md:text-lg font-semibold text-foreground">你好，我是 Huky 的数字分身</p>
              <p className="text-xs md:text-sm text-muted-foreground max-w-sm">
                我可以和你聊聊教育产品、学习方法、职业发展的话题
              </p>
            </div>
            <div className="space-y-2 w-full max-w-sm">
              <p className="text-xs text-muted-foreground text-left">试试问我：</p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleSend(q)}
                    className="text-sm px-4 py-2.5 rounded-xl bg-card border border-border text-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all cursor-pointer text-left flex-1"
                  >
                    {q}
                  </button>
                ))}
              </div>
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
              className={`flex gap-2 md:gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  msg.role === "user"
                    ? "bg-accent"
                    : "bg-primary"
                }`}
              >
                {msg.role === "user" ? (
                  <User className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent-foreground" />
                ) : (
                  <Bot className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-foreground" />
                )}
              </div>
              <div
                className={`max-w-[78%] md:max-w-[75%] px-3 py-2 md:px-3.5 md:py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                    : "bg-card border border-border text-foreground rounded-tl-sm"
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

      <div className="p-3 md:p-4 border-t border-border bg-background/50 backdrop-blur-sm">
        <div className="flex gap-2 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入你的问题..."
            rows={1}
            className="flex-1 min-w-0 resize-none rounded-xl border border-border bg-card px-3 md:px-4 py-2 md:py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 placeholder:text-muted-foreground transition-all"
          />
          {isStreaming ? (
            <Button
              variant="outline"
              size="icon"
              onClick={handleAbort}
              className="shrink-0 h-10 w-10 rounded-xl"
            >
              <StopCircle className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              size="icon"
              onClick={() => handleSend(input)}
              disabled={!input.trim()}
              className="shrink-0 h-10 w-10 rounded-xl shadow-md shadow-primary/20"
            >
              <Send className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}