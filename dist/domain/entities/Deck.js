"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deck = void 0;
class Deck {
    constructor(userId, title, createdAt, updatedAt, id, description, flashCards, boxId) {
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
exports.Deck = Deck;
//# sourceMappingURL=Deck.js.map