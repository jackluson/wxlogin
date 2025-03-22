# 微信公众号登录验证系统

这是一个基于 Next.js 开发的微信公众号登录验证系统，通过公众号菜单触发生成验证码，用户在网页端输入验证码完成登录认证。

## 功能特点

- 使用微信公众号作为身份验证渠道
- 通过菜单触发生成6位数验证码
- Redis存储验证码和用户信息
- JWT认证保持登录状态
- 响应式UI设计，支持移动端和桌面端

## 工作原理

1. 用户在网页端访问登录页面，页面显示引导用户关注公众号
2. 用户关注公众号后，向公众号发送一条内容为【验证码】的消息
3. 服务端接收到微信菜单点击事件，生成6位数验证码，并通过微信消息回复给用户
4. 用户在网页端输入收到的验证码
5. 系统验证码正确后，生成JWT令牌并将用户重定向到Dashboard页面

## 快速开始

### 使用Docker Compose

1. 克隆仓库到本地

```bash
git clone https://github.com/liyaodev/wxlogin.git
cd wxlogin
```

2. 创建环境变量文件

```bash
cp .env.example .env
```

修改`.env`文件，填入您的微信公众号配置和JWT密钥

3. 启动服务

```bash
docker-compose up -d
```

4. 访问服务

服务将在 http://localhost:3000 运行

### 手动部署

1. 安装依赖

```bash
npm install
```

2. 配置环境变量

```bash
cp .env.example .env.local
```

修改`.env.local`文件，填入您的微信公众号配置和Redis连接信息

3. 启动开发服务器

```bash
npm run dev
```

4. 构建生产版本

```bash
npm run build
npm run start
```

## 微信公众号配置

在公众号管理后台配置服务器
   - URL: `https://您的域名/api/wechat/event`
   - Token: 与您在环境变量中设置的`WECHAT_TOKEN`相同
   - EncodingAESKey: 可以使用微信后台自动生成

## 安全考虑

- 验证码有效期设为5分钟，减少暴力破解风险
- JWT令牌过期时间设为1天，您可以根据需要调整
- Redis连接应当启用密码保护
- 微信公众号Token和Secret应妥善保管

## 项目结构

```
wxlogin/
├── src/
│   ├── components/
│   │   └── VerificationCodeInput.tsx  # 验证码输入组件
│   ├── lib/
│   │   ├── auth.ts                    # JWT认证相关函数
│   │   ├── redis.ts                   # Redis连接和操作
│   │   └── wechat.ts                  # 微信公众号API封装
│   ├── pages/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── verify.ts          # 验证码验证API
│   │   │   └── wechat/
│   │   │       └── event.ts           # 微信事件处理API
│   │   ├── _app.tsx                   # Next.js应用配置
│   │   ├── dashboard.tsx              # 登录后的仪表盘页面
│   │   ├── index.tsx                  # 首页（重定向到登录页）
│   │   └── login.tsx                  # 登录页面
│   └── styles/
│       └── globals.css                # 全局样式（Tailwind CSS）
├── public/
│   └── qrcode.png                     # 公众号二维码图片
├── .env.example                       # 环境变量示例
├── docker-compose.yml                 # Docker Compose配置
├── Dockerfile                         # Docker构建文件
├── next.config.js                     # Next.js配置
├── package.json                       # 项目依赖
├── tailwind.config.js                 # Tailwind CSS配置
└── tsconfig.json                      # TypeScript配置
```

## 技术栈

- Next.js: React框架，用于构建前后端一体化应用
- Redis: 存储验证码和用户信息
- JWT: 用户认证与会话管理
- Tailwind CSS: UI样式库
- TypeScript: 类型安全的JavaScript超集
- Docker: 容器化部署

