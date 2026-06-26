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
      {/* 装饰性几何色块 — 蓝色天空 + 橙色活力 */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/5 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/6 rounded-full translate-y-1/3 -translate-x-1/4 pointer-events-none" />
      <div className="absolute top-1/3 right-1/5 w-48 h-48 bg-accent/6 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-accent/4 rounded-full pointer-events-none" />

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

        {/* 左右布局：头像在左，聊天框在右 */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-start">
          {/* 左侧：个人信息 */}
          <div className="md:col-span-2 flex flex-col items-center">
            <ProfileCard />

            {/* 三个栏目：头像下方横排 */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1"
            >
              {infoItems.map((item) => (
                <div key={item.label} className="flex items-center gap-1 text-xs text-muted-foreground">
                  <item.icon className="w-3 h-3 text-primary/70" />
                  <span className="text-muted-foreground/80">{item.label}：</span>
                  <span className="text-foreground/90 font-medium">{item.value}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 右侧：聊天区 */}
          <div className="md:col-span-3">
            <div className="h-[500px] md:h-[560px]">
              <ChatPanel />
            </div>
          </div>
        </div>

        {/* 页脚 */}
        <footer className="mt-12 text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 Huky · 教育产品专家，史哲人类爱好者
          </p>
        </footer>
      </main>
    </div>
  );
}