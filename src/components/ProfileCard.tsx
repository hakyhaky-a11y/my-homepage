import { motion } from "framer-motion";

const AVATAR_URL = "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_b3ac335f-dccc-47e4-b4fb-2a06e7150534.jpg";

export function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center md:items-start text-center md:text-left space-y-6"
    >
      <div className="relative">
        <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-lg shadow-primary/10">
          <img
            src={AVATAR_URL}
            alt="Huky 头像"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-background" />
      </div>

      <div className="space-y-1.5">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Huky
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
          教育产品专家，史哲人类爱好者
        </p>
      </div>
    </motion.div>
  );
}