import { openaiConfig } from '../config/openai.config';

export const createCompletionFlashcards = async (
  systemMessage: string,
  userMessage: string
) => {
  try {
    const completion = await openaiConfig.chat.completions.create({
      model: 'gpt-4o-2024-08-06',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: userMessage },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'flashcards_schema',
          schema: {
            type: 'object',
            properties: {
              flashCards: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    question: {
                      type: 'string',
                      description:
                        'Pregunta clara que resuma la información clave sobre el tema y descripción proporcionada.',
                    },
                    answer: {
                      type: 'string',
                      description:
                        'Respuesta correspondiente a la pregunta, breve pero completa.',
                    },
                  },
                  required: ['question', 'answer'],
                },
              },
            },
          },
        },
      },
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error getting completion ', error);
    throw error;
  }
};
