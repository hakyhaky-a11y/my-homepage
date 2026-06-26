import { motion } from "framer-motion";
import { Briefcase, Lightbulb, Sparkles } from "lucide-react";
import { ProfileCard } from "@/components/ProfileCard";
import { ChatPanel } from "@/components/ChatPanel";

const infoItems = [
  { icon: Briefcase, label: "现在主要在做", value: "教育产品设计" },
  { icon: Lightbulb, label: "我的擅长", value: "教产融通" },
  { icon: Sparkles, label: "一个比较有记忆点的特点", value: "星星也是光" },
];

export function HomePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* 装饰性几何色块 */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-primary/3 rounded-full pointer-events-none" />

      {/* 主内容 */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 py-8 md:py-16">
        {/* 页面标题 */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
            Personal Homepage
          </p>
          <h2 className="text-lg font-medium text-foreground">
            欢迎来到我的个人空间
          </h2>
        </div>

        {/* 上下布局：头像在上，聊天框在下 */}
        <div className="flex flex-col items-center gap-8">
          {/* 个人信息 */}
          <ProfileCard />

          {/* 聊天区 */}
          <div className="w-full max-w-xl">
            <div className="h-[500px] md:h-[560px]">
              <ChatPanel />
            </div>
          </div>
        </div>

        {/* 页脚 */}
        <footer className="mt-12 text-center space-y-4">
          {/* 三个栏目：底部横排小字 */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1"
          >
            {infoItems.map((item) => (
              <div key={item.label} className="flex items-center gap-1 text-xs text-muted-foreground">
                <item.icon className="w-3 h-3 text-primary/70" />
                <span className="text-muted-foreground/80">{item.label}：</span>
                <span className="text-foreground/90 font-medium">{item.value}</span>
              </div>
            ))}
          </motion.div>

          <p className="text-xs text-muted-foreground">
            © 2026 Huky · 教育产品专家，史哲人类爱好者
          </p>
        </footer>
      </main>
    </div>
  );
}