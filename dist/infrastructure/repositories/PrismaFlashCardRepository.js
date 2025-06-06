"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaFlashCardRepository = void 0;
const FlashCard_1 = require("../../domain/entities/FlashCard");
const openai_utils_1 = require("../../utils/openai.utils");
class PrismaFlashCardRepository {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    createFlashCards(flashCardRequest, deckId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { topic, description, quantityFlashcards, difficultyLevel } = flashCardRequest;
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
            const responseOpenAI = yield (0, openai_utils_1.createCompletionFlashcards)(systemMessage, userMessage);
            let flashCardsData = [];
            try {
                const response = JSON.parse(responseOpenAI ? responseOpenAI : '{}');
                if (response.flashCards && Array.isArray(response.flashCards)) {
                    flashCardsData = response.flashCards.map((flashCard) => ({
                        deckId: deckId,
                        question: flashCard.question,
                        answer: flashCard.answer,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    }));
                }
                else {
                    throw new Error('Invalid response format: flashcards not found or not an array');
                }
            }
            catch (error) {
                console.error('Error parsing JSON response or mapping flashcards', error);
            }
            yield this.prismaClient.flashCard.createMany({
                data: flashCardsData,
            });
            return flashCardsData;
        });
    }
    updateFlashCardById(id, flashCard) {
        return __awaiter(this, void 0, void 0, function* () {
            const getProfile = yield this.prismaClient.flashCard.findUnique({
                where: { id },
            });
            const flashCardData = yield this.prismaClient.flashCard.update({
                where: { id: id },
                data: Object.assign(Object.assign({}, getProfile), { deckId: flashCard.deckId ? flashCard.deckId : getProfile === null || getProfile === void 0 ? void 0 : getProfile.deckId, question: flashCard.question
                        ? flashCard.question
                        : getProfile === null || getProfile === void 0 ? void 0 : getProfile.question, answer: flashCard.answer ? flashCard.answer : getProfile === null || getProfile === void 0 ? void 0 : getProfile.answer, updatedAt: new Date() }),
            });
            return flashCardData;
        });
    }
    getFlashCardsByDeckId(deckId) {
        return __awaiter(this, void 0, void 0, function* () {
            const flashCardsData = yield this.prismaClient.flashCard.findMany({
                where: { deckId },
            });
            return flashCardsData.map((flashCard) => new FlashCard_1.FlashCard(flashCard.deckId, flashCard.question, flashCard.answer, flashCard.createdAt, flashCard.updatedAt, flashCard.id));
        });
    }
    deleteFlashCardById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prismaClient.flashCard.delete({
                where: { id },
            });
        });
    }
}
exports.PrismaFlashCardRepository = PrismaFlashCardRepository;
//# sourceMappingURL=PrismaFlashCardRepository.js.map