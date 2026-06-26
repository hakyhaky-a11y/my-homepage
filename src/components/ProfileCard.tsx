import { motion } from "framer-motion";
import { Briefcase, Heart, Sparkles } from "lucide-react";

const AVATAR_URL = "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_b3ac335f-dccc-47e4-b4fb-2a06e7150534.jpg";

const infoItems = [
  {
    icon: Briefcase,
    label: "现在主要在做",
    value: "教育产品设计与营销",
  },
  {
    icon: Heart,
    label: "我的兴趣",
    value: "产品设计与营销",
  },
  {
    icon: Sparkles,
    label: "一个比较有记忆点的特点",
    value: "就是没有",
  },
];

export function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center text-center space-y-6"
    >
      {/* 头像 */}
      <div className="relative">
        <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-primary">
          <img
            src={AVATAR_URL}
            alt="Huky 头像"
            className="w-full h-full object-cover"
          />
        </div>
        {/* 在线状态指示器 */}
        <div className="absolute bottom-1 right-1 w-4 h-4 bg-accent rounded-full border-2 border-background" />
      </div>

      {/* 名字和一句话介绍 */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Huky
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-xs">
          教育产品专家，史哲人类爱好者
        </p>
      </div>

      {/* 个人信息详情 */}
      <div className="w-full max-w-sm space-y-3">
        {infoItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border"
          >
            <div className="mt-0.5 shrink-0">
              <item.icon className="w-4 h-4 text-primary" />
            </div>
            <div className="text-left min-w-0">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="text-sm font-medium text-foreground">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}