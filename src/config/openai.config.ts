import OpenAI from 'openai';
import envs from './env';

export const openaiConfig = new OpenAI({
  apiKey: envs.openaiKey,
  organization: envs.openainOrgId,
});
