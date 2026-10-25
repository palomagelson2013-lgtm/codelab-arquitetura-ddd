/**
 * Domain Event: ChallengeCreated
 * Disparado quando um novo desafio é publicado.
 * Será publicado na camada de mensageria (Questão 2).
 */
class ChallengeCreated {
  constructor({ challengeId, userId, title, difficulty, occurredAt = new Date() }) {
    this.eventName = 'ChallengeCreated';
    this.challengeId = challengeId;
    this.userId = userId;
    this.title = title;
    this.difficulty = difficulty;
    this.occurredAt = occurredAt;
  }
}

module.exports = ChallengeCreated;
