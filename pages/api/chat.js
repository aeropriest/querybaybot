const Telegraf = require('telegraf');
const openai = require('openai');
const bot = new Telegraf('6224174210:AAEgme9G0zIvBwCN8eWbJ70Lm3FO2NWNDZY');

openai.apiKey = "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";

bot.on('message', (ctx) => {
  // Send the user's message to the ChatGPT API
  openai
    .engines
    .get("davinci")
    .completions({
        prompt: ctx.message.text,
        max_tokens: 50,
        temperature: 0.5
    })
    .then(response => {
    // Send the response from ChatGPT back to the user
      ctx.reply(response.choices[0].text)
    })
    .catch(console.error);
});

bot.startPolling();