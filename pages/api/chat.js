// import getGptAnswer from '@/lib/openai';

export default async function handler(req, res) {
  console.log('Request arrived:', req.query);
  const question = req.query.question;
  let answer = process.env.OPENAI_API_KEY;//"Invalid question, please try again";
//   try {
//     answer = await getGptAnswer(question);
//   } catch (error) {
//     console.error(error);
//   }
  res.status(200).json({ answer });
}

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
