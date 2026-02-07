import { OpenAIApi, Configuration } from 'openai';
import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';

const prisma = new PrismaClient();
const redis = new Redis();
const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

export async function analyzeSentiment(interactionText) {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Analyze the sentiment of the following text: "${interactionText}"`,
      max_tokens: 60,
    });

    const sentiment = response.data.choices[0].text.trim();
    return sentiment;
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    throw new Error('Sentiment analysis failed');
  }
}

export async function trackSentiment(interactionId, interactionText) {
  try {
    const sentiment = await analyzeSentiment(interactionText);

    await prisma.interaction.update({
      where: { id: interactionId },
      data: { sentiment },
    });

    await redis.set(`interaction:${interactionId}:sentiment`, sentiment);
  } catch (error) {
    console.error('Error tracking sentiment:', error);
    throw new Error('Tracking sentiment failed');
  }
}

export async function getSentiment(interactionId) {
  try {
    const cachedSentiment = await redis.get(`interaction:${interactionId}:sentiment`);
    if (cachedSentiment) {
      return cachedSentiment;
    }

    const interaction = await prisma.interaction.findUnique({
      where: { id: interactionId },
      select: { sentiment: true },
    });

    if (!interaction) {
      throw new Error('Interaction not found');
    }

    return interaction.sentiment;
  } catch (error) {
    console.error('Error retrieving sentiment:', error);
    throw new Error('Retrieving sentiment failed');
  }
}