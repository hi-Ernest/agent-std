import dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ProxyAgent, setGlobalDispatcher } from "undici";

setGlobalDispatcher(new ProxyAgent(process.env.HTTPS_PROXY));
// 1) 加载环境变量
dotenv.config();

const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo", // 使用稳定可用的模型
  temperature: 0.7,
  maxRetries: 0,
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 120000,
});

async function translate(text, targetLanguage) {
  try {
    // 快速检查 key 是否加载
    console.log(process.env.OPENAI_API_KEY);
    console.log(process.env.HTTPS_PROXY);
    console.log("Preparing translation request...");

    const messages = [
      new SystemMessage(
        `You are a professional translator. Translate the user's English input into ${targetLanguage}. Keep meaning faithful, tone natural.`
      ),
      new HumanMessage(text),
    ];

    console.log("Calling OpenAI API...");
    const res = await model.invoke(messages);
    return typeof res?.content === "string"
      ? res.content
      : JSON.stringify(res?.content);
  } catch (error) {
    console.error("An error occurred during the translation process:", {
      name: error?.name,
      message: error?.message,
      attemptNumber: error?.attemptNumber,
      retriesLeft: error?.retriesLeft,
    });

    // 常见 timeout 提示
    if (
      String(error?.message || "")
        .toLowerCase()
        .includes("timeout")
    ) {
      console.log("Suggestions:");
      console.log(
        "1) Check if the network can connect to api.openai.com (or use a proxy and set HTTPS_PROXY)"
      );
      console.log(
        "2) Increase timeout (set to 60000ms, if still timeout, increase again)"
      );
      console.log(
        "3) If using a custom gateway, confirm that OPENAI_API_BASE_URL is reachable"
      );
    }
    throw error;
  }
}

async function main() {
  try {
    const out = await translate("Hello, how are you?", "Chinese");
    console.log("Translation:", out);
  } catch (e) {
    console.error("Error:", e?.message || e);
  }
}

main();
