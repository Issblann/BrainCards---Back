import OpenAI from 'openai';
import envs from './env';

const openaiConfig = new OpenAI({
  apiKey: envs.openaiKey,
  organization: envs.openainOrgId,
});

export const getCompletion = async (prompt: string) => {
  try {
    const completion = await openaiConfig.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
    });
    console.log(completion.choices[0].message);
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error getting completion ', error);
    throw error;
  }
};
