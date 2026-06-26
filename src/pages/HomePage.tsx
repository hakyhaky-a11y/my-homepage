import { ProfileCard } from "@/components/ProfileCard";
import { ChatPanel } from "@/components/ChatPanel";

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

        {/* 双栏布局 */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-start">
          {/* 左侧：个人信息 */}
          <div className="md:col-span-2">
            <ProfileCard />
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