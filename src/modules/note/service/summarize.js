
import path from 'node:path'
import * as dotenv from 'dotenv'
dotenv.config({path:path.resolve('./src/config/.env')})





import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY, 
});

export const run = async (text) => {
  const response = await cohere.summarize({
    text: text,
    length: 'medium',
    format: 'paragraph',
    model: 'command', 
  });

  return response.summary
};
