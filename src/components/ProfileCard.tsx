import { motion } from "framer-motion";
import { Briefcase, Lightbulb, Sparkles } from "lucide-react";

const AVATAR_URL = "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_b3ac335f-dccc-47e4-b4fb-2a06e7150534.jpg";

const infoItems = [
  { icon: Briefcase, label: "现在主要在做", value: "教育产品设计" },
  { icon: Lightbulb, label: "我的擅长", value: "教产融通" },
  { icon: Sparkles, label: "一个比较有记忆点的特点", value: "星星也是光" },
];

export function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center text-center space-y-5"
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

      {/* 三个栏目：横排小字副标题 */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        {infoItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.08 }}
            className="flex items-center gap-1 text-xs text-muted-foreground"
          >
            <item.icon className="w-3 h-3 text-primary/70" />
            <span className="text-muted-foreground/80">{item.label}：</span>
            <span className="text-foreground/90 font-medium">{item.value}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}