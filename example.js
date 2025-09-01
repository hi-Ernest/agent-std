import { ChatDeepseek } from "@langchain/community/chat_models/deepseek";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";

// 加载环境变量
dotenv.config();

// 创建 DeepSeek Chat 实例
const model = new ChatDeepseek({
  apiKey: process.env.DEEPSEEK_API_KEY,
  modelName: "deepseek-chat", // 使用默认的 chat 模型
  temperature: 0.7,
});

async function askAboutDinner() {
  try {
    // 使用 LangChain 调用 DeepSeek
    const response = await model.invoke("What should I eat for dinner?");

    const suggestion = response.content;

    // 准备要保存的数据
    const memoryData = {
      timestamp: new Date().toISOString(),
      question: "What should I eat for dinner?",
      response: suggestion,
      model: "deepseek-chat",
    };

    // 保存到本地 JSON 文件
    const memoryFile = path.join(process.cwd(), "agent-memory.json");

    // 检查文件是否存在，如果存在则读取现有内容
    let existingMemories = [];
    try {
      const fileContent = await fs.readFile(memoryFile, "utf8");
      existingMemories = JSON.parse(fileContent);
    } catch (error) {
      // 如果文件不存在或无法解析，使用空数组
      console.log("Creating new memory file...");
    }

    // 添加新的记忆
    existingMemories.push(memoryData);

    // 保存更新后的记忆
    await fs.writeFile(
      memoryFile,
      JSON.stringify(existingMemories, null, 2),
      "utf8"
    );

    console.log("AI的建议:", suggestion);
    console.log("记忆已保存到 agent-memory.json");
  } catch (error) {
    console.error("发生错误:", error);
  }
}

// 运行程序
askAboutDinner();
