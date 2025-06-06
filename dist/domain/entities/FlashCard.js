"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumDifficultyLevel = exports.FlashCard = void 0;
class FlashCard {
    constructor(deckId, question, answer, createdAt, updatedAt, 
    // image?: string,
    id) {
        this.deckId = deckId;
        this.question = question;
        this.answer = answer;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        // this.image = image;
        this.id = id;
    }
}
exports.FlashCard = FlashCard;
var EnumDifficultyLevel;
(function (EnumDifficultyLevel) {
    EnumDifficultyLevel["EASY"] = "Easy";
    EnumDifficultyLevel["MEDIUM"] = "Medium";
    EnumDifficultyLevel["HARD"] = "Hard";
})(EnumDifficultyLevel || (exports.EnumDifficultyLevel = EnumDifficultyLevel = {}));
//# sourceMappingURL=FlashCard.js.map