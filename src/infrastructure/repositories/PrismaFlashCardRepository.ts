import { PrismaClient } from '@prisma/client';
import { IFlashCardsRepository } from '../../domain/repositories/IFlashCardsRepository';
import { FlashCard, FlashCardRequest } from '../../domain/entities/FlashCard';
import { createCompletionFlashcards } from '../../utils/openai.utils';

class PrismaFlashCardRepository implements IFlashCardsRepository {
  private prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async createFlashCards(
    flashCardRequest: FlashCardRequest,
    deckId: string
  ): Promise<FlashCard[]> {
    const { topic, description, quantityFlashcards, difficultyLevel } =
      flashCardRequest;

    const systemMessage = `Generas flashcards automaticas para estudiar. Quiero que generes flashcards para estudiar sobre el tema de: ${topic}. 
    Aquí te doy una descripción adicional para ser más específico, (esta opción es opcional para el usuario): ${description}, 
    genera la cantidad de ${quantityFlashcards} flashcards solicitadas.

    Crea las flashcards con las siguientes características: 

    - Una pregunta clara que resuma la información clave sobre el tema y la descripción proporcionada. 
    - La respuesta correspondiente debe ser breve pero completa. 
    - Asegúrate de que cada flashcard sea diferente y cubra distintos aspectos importantes del tema.
    - El nivel de detalle debe ser adecuado para estudiantes de nivel ${difficultyLevel}.
    Responde en el mismo idioma del usuario. Responde en formato JSON, incluyendo la palabra "json" en la respuesta.
    
    
    `;

    const userMessage = `topic: ${topic}
    description: ${description}
    quantityFlashcards:  ${quantityFlashcards}
    difficultyLevel: ${difficultyLevel}`;

    const responseOpenAI = await createCompletionFlashcards(
      systemMessage,
      userMessage
    );

    let flashCardsData: FlashCard[] = [];
    try {
      const response = JSON.parse(responseOpenAI ? responseOpenAI : '{}');
      if (response.flashCards && Array.isArray(response.flashCards)) {
        flashCardsData = response.flashCards.map((flashCard: FlashCard) => ({
          deckId: deckId,
          question: flashCard.question,
          answer: flashCard.answer,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));
      } else {
        throw new Error(
          'Invalid response format: flashcards not found or not an array'
        );
      }
    } catch (error) {
      console.error('Error parsing JSON response or mapping flashcards', error);
    }

    await this.prismaClient.flashCard.createMany({
      data: flashCardsData,
    });

    return flashCardsData;
  }

  async updateFlashCardById(
    id: string,
    flashCard: FlashCard
  ): Promise<Partial<FlashCard>> {
    const getProfile = await this.prismaClient.flashCard.findUnique({
      where: { id },
    });
    const flashCardData = await this.prismaClient.flashCard.update({
      where: { id: id },
      data: {
        ...getProfile,
        deckId: flashCard.deckId ? flashCard.deckId : getProfile?.deckId,
        question: flashCard.question
          ? flashCard.question
          : getProfile?.question,
        answer: flashCard.answer ? flashCard.answer : getProfile?.answer,
        updatedAt: new Date(),
      },
    });

    return flashCardData;
  }

  async getFlashCardsByDeckId(deckId: string): Promise<FlashCard[]> {
    const flashCardsData = await this.prismaClient.flashCard.findMany({
      where: { deckId },
    });

    return flashCardsData.map(
      (flashCard) =>
        new FlashCard(
          flashCard.deckId,
          flashCard.question,
          flashCard.answer,
          flashCard.createdAt,
          flashCard.updatedAt,
          flashCard.id
        )
    );
  }
}

export { PrismaFlashCardRepository };
