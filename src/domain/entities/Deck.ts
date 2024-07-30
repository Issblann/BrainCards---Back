import { FlashCard } from './FlashCard';
class Deck {
  id?: string;
  userId: string;
  boxId?: string | null;
  description?: string | null;
  title: string;
  flashCards?: FlashCard[];
  createdAt: Date;
  updatedAt?: Date;

  constructor(
    userId: string,
    title: string,
    createdAt: Date,
    updatedAt: Date,
    id?: string,
    description?: string,
    flashCards?: FlashCard[],
    boxId?: string | null
  ) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.flashCards = flashCards;
    this.boxId = boxId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
export { Deck };
