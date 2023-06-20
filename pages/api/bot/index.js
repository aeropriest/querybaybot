const TelegramBot = require("node-telegram-bot-api");

async function handler(req, res) {
  console.log(process.env.TELEGRAM_API_TOKEN);
  const bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN);
  let ctx = req.body.callback_query || req.body.message;
  console.log(ctx);
  if (!ctx) {
    return res.status(200).json({ message: process.env.TELEGRAM_API_TOKEN });
  }
  try {
    console.log(ctx, "My bot handler received");
    let message = `Hi 👋 ${ctx.from.first_name} I am SuitsBot! \n You can send me documents and I then ask questions about them.`;
    bot.sendMessage(ctx.chat.id, message);
    return res.status(200).json({ name: "Hello Suites!!!" });
  } catch (error) {
    console.error(error.message);
    bot.sendMessage(ctx.chat.id, error.message);
    return res.status(200).json({ name: error.message });
  }
}

export default handler;
