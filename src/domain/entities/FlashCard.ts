class FlashCard {
  deckId: string;
  question: string;
  answer: string;
  // image?: string | null;
  createdAt: Date;
  updatedAt?: Date;
  id?: string;

  constructor(
    deckId: string,
    question: string,
    answer: string,
    createdAt: Date,
    updatedAt: Date,
    // image?: string,
    id?: string
  ) {
    this.deckId = deckId;
    this.question = question;
    this.answer = answer;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    // this.image = image;
    this.id = id;
  }
}

enum EnumDifficultyLevel {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

interface FlashCardRequest {
  topic: string;
  description?: string;
  quantityFlashcards: number;
  difficultyLevel: EnumDifficultyLevel;
}
export { FlashCard, FlashCardRequest, EnumDifficultyLevel };
