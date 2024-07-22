import { FlashCard } from './FlashCard';

class Deck {
  id?: string;
  userId: string;
  boxId?: string;
  title: string;
  FlashCard: FlashCard[];
  createdAt: Date;
  updatedAt?: Date;

  constructor(
    userId: string,
    title: string,
    FlashCard: FlashCard[],
    createdAt: Date,
    updatedAt: Date,
    id?: string,
    boxId?: string
  ) {
    this.id = id;
    this.userId = userId;
    this.boxId = boxId;
    this.title = title;
    this.FlashCard = FlashCard;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
export { Deck };
