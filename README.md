# LangChain.js 迷你示例

这是一个使用 LangChain.js 的简单示例项目，展示了如何使用 LangChain 与 OpenAI API 进行交互。

## 功能
- 使用 OpenAI 的 GPT-3.5-turbo 模型
- 演示了 PromptTemplate 的使用
- 展示了如何构建简单的 Chain

## 安装

1. 安装依赖：
```bash
npm install
```

2. 配置环境变量：
   - 复制 `.env.example` 文件为 `.env`
   - 在 `.env` 文件中填入你的 OpenAI API 密钥

## 运行示例

```bash
node example.js
```

## 代码说明

这个示例展示了 LangChain.js 的以下核心概念：

1. 模型初始化（ChatOpenAI）
2. 提示模板（PromptTemplate）
3. 输出解析器（StringOutputParser）
4. Chain 的构建和执行

示例程序会让 AI 讲一个关于程序员的笑话。
