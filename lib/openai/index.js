import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { ConversationChain } from "langchain/chains";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { BufferMemory } from "langchain/memory";

// const chat = new ChatOpenAI({ temperature: 0 });

export const getGptAnswer = async (question) => {
  try {
    // const response = await chat.call([new HumanChatMessage(question)]);
    const llm = new ChatOpenAI({ temperature: 0, verbose: true });
    const prompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(
        "The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know."
      ),
      new MessagesPlaceholder("history"),
      HumanMessagePromptTemplate.fromTemplate("{input}"),
    ]);

    const memory = new BufferMemory({ returnMessages: true });

    const chain = new ConversationChain({
      memory,
      prompt,
      llm,
    });

    const response = await chain.call({
      input: question,
    });
    return response.response.trim();
  } catch (error) {
    console.error(`Error generating answer: ${error.message}`);
    throw new Error("Error generating GPT answer", error.message);
  }
};
