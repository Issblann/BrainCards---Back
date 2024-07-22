import { FlashCard } from './FlashCard';

class Deck {
  id?: string;
  userId: string;
  boxId?: string | null;
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
    boxId?: string,
    flashCards?: FlashCard[]
  ) {
    this.id = id;
    this.userId = userId;
    this.boxId = boxId;
    this.title = title;
    this.flashCards = flashCards;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
export { Deck };
