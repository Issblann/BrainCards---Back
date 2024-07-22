import { Deck } from './Deck';

class Box {
  title: string;
  userId: string;
  Decks: Deck[];
  createdAt: Date;
  updatedAt?: Date;
  id?: string;

  constructor(
    title: string,
    userId: string,
    Decks: Deck[],
    createdAt: Date,
    updatedAt: Date,
    id?: string
  ) {
    this.title = title;
    this.userId = userId;
    this.Decks = Decks;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.id = id;
  }
}
export { Box };
