const axios = require("axios");

export const getGptAnswer = async (question) => {
  try {
    const response = await axios.post("https://api.openai.com/v1/engines/davinci-codex/completions", {
      prompt: `Question: ${question}\nAnswer:`,
      max_tokens: 50, // Adjust the desired length of the answer
      temperature: 0.7, // Adjust the temperature for controlling randomness
    }, {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    throw new Error("Error generating GPT answer");
  }
};
