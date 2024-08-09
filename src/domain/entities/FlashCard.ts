class FlashCard {
  deckId: string;
  question: string;
  answer: string;
  image?: string | null;
  createdAt: Date;
  updatedAt?: Date;
  id?: string;

  constructor(
    deckId: string,
    question: string,
    answer: string,
    createdAt: Date,
    updatedAt: Date,
    image?: string,
    id?: string
  ) {
    this.deckId = deckId;
    this.question = question;
    this.answer = answer;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.image = image;
    this.id = id;
  }
}
export { FlashCard };
