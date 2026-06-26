# DESIGN.md

## Vibe
- Editorial Magazine × Swiss Design — 干净利落的排版驱动，蓝橙撞色作为视觉锚点，大量留白营造呼吸感

## Color
- Primary: #2563EB（蓝色）
- On Primary: #FFFFFF
- Accent: #F97316（橙色）
- On Accent: #FFFFFF
- Background: #FAFAFA
- Foreground: #09090B
- Muted: #E8ECF0
- Border: #E4E4E7
- Secondary: #3F3F46

色彩规则：
- Primary/On Primary 对比度 ≥ 4.5:1 ✓
- Accent/On Accent 对比度 ≥ 4.5:1 ✓
- Primary 与 Accent 色相差明显 ✓
- 背景大面积使用中性色，Primary/Accent 仅用于按钮、图标、激活态等小面积

## Typography
- Heading: Poppins (family: 'Poppins', weight: 700, url: https://resource-static.bj.bcebos.com/fonts-skill/Poppins_Bold.ttf)
- Body: vivo Sans (family: 'vivoSans', weight: 400, url: https://resource-static.bj.bcebos.com/fonts-skill/vivoSans_Regular.ttf)

## Visual Language
- 核心视觉签名：蓝橙双色几何色块叠加（低透明度色块作为背景装饰元素，不遮挡内容）
- 材质与深度：无阴影，通过细线分割和色块区分层级
- 容器与按钮：卡片使用细描边（border: 1px solid border），按钮使用 Primary/Accent 实色填充
- 布局节奏：个人信息区与聊天区左右分栏（桌面端），移动端上下堆叠

## Animation
- 入场：头像和文字从下方淡入上移（300ms ease-out）
- 交互：按钮 hover 轻微缩放（scale 1.02），聊天消息淡入（200ms）
- 滚动/过渡：无

## Forbidden
- 禁止大块纯色铺底（Hero/Banner/操作区等）
- 禁止圆角卡片+通用投影作为核心视觉签名
- 禁止 Emoji 图标、CSS 伪装 Logo

## Additional Notes
- 所有用户可见文案使用中文
- 响应式设计：桌面端双栏布局，移动端单栏堆叠
- 聊天区需要固定高度，内部滚动