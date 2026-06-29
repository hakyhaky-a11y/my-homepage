import { motion } from "framer-motion";
import { Briefcase, Lightbulb, Sparkles, ArrowUpRight } from "lucide-react";
import { ProfileCard } from "@/components/ProfileCard";
import { ChatPanel } from "@/components/ChatPanel";

const infoItems = [
  { icon: Briefcase, value: "教育产品设计" },
  { icon: Lightbulb, value: "教产融通" },
  { icon: Sparkles, value: "星星也是光" },
];

const cases = [
  {
    title: "某职业教育平台产品设计",
    description: "从0到1搭建职业教育学习平台，覆盖课程、社群、测评三大模块，服务10万+学员。",
    tags: ["产品设计", "职业教育"],
  },
  {
    title: "错题集整理与复习工具",
    description: "K12 阶段错题整理与复习工具，支持多学科错题分类、智能组卷、错题重练，帮助学生高效查漏补缺。",
    tags: ["K12", "学习工具"],
  },
  {
    title: "家长高考认知系列课程",
    description: "面向高中生家长的高考认知系列课程，涵盖志愿填报、升学规划、心理调适三大主题，累计服务5000+家庭。",
    tags: ["家长教育", "高考规划"],
  },
];

export function HomePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-primary/5 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl pointer-events-none" />

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-6 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
          <div className="md:col-span-4 md:sticky md:top-16">
            <ProfileCard />

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-4 md:mt-6 flex flex-wrap gap-2 justify-center md:justify-start"
            >
              {infoItems.map((item) => (
                <div
                  key={item.value}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/60 text-xs text-foreground/80"
                >
                  <item.icon className="w-3.5 h-3.5 text-primary/70" />
                  <span>{item.value}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="md:col-span-8 space-y-10 md:space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="h-[70vh] md:h-[600px] rounded-xl md:rounded-2xl shadow-xl shadow-primary/5 border border-border/50 overflow-hidden"
            >
              <ChatPanel />
            </motion.div>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-4 md:space-y-6"
            >
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-foreground">设计案例</h2>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">一些我做过的教育产品设计</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {cases.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                    className="group p-4 md:p-5 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2 md:mb-3">
                      <h3 className="text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-3 md:mb-4">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>

        <footer className="mt-12 md:mt-20 text-center">
          <p className="text-xs text-muted-foreground/60">
            © 2026 Huky
          </p>
        </footer>
      </main>
    </div>
  );
}