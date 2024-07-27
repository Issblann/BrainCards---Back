import { Deck } from './Deck';

class Box {
  boxName: string;
  userId: string;
  decks: Deck[];
  createdAt: Date;
  updatedAt?: Date;
  id?: string;

  constructor(
    boxName: string,
    userId: string,
    decks: Deck[],
    createdAt: Date,
    updatedAt: Date,
    id?: string
  ) {
    this.boxName = boxName;
    this.userId = userId;
    this.decks = decks;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.id = id;
  }
}
export { Box };
