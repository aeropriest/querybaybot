import { getGptAnswer } from "@/lib/openai/";
const TelegramBot = require("node-telegram-bot-api");

async function handler(req, res) {
  console.log(process.env.TELEGRAM_API_TOKEN);
  const bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN);
  let ctx = req.body.callback_query || req.body.message;
  console.log(ctx);
  if (ctx) {
    try {
      console.log(ctx, "My bot handler received");
      // let message = `Hi 👋 ${ctx.from.first_name} I am SuitsBot! \n You can send me documents and I then ask questions about them.`;
      const answer = await getGptAnswer(ctx.text);
      bot.sendMessage(ctx.chat.id, answer);
      return res.status(200).json({ name: "Hello Suites!!!" });
    } catch (error) {
      console.error(error.message);
      bot.sendMessage(ctx.chat.id, "Error! " + error.message);
      return res.status(200).json({ name: error.message });
    }
  }
  const { question } = req.query;
  console.log(question);
  const answer = await getGptAnswer(question);
  return res.status(200).json({ question, answer });
}

export default handler;
