/**
 * Use Case: CreateChallenge
 * Orquestra a criação de um desafio.
 * Depende apenas de ports (interfaces), nunca de implementações concretas.
 */
const Challenge = require('../../domain/entities/Challenge');
const Difficulty = require('../../domain/value-objects/Difficulty');
const ChallengeCreated = require('../../domain/events/ChallengeCreated');

class CreateChallenge {
  /**
   * @param {IChallengeRepository} challengeRepository
   * @param {IEventPublisher} eventPublisher
   * @param {IStorageService} storageService
   */
  constructor({ challengeRepository, eventPublisher, storageService }) {
    this.challengeRepository = challengeRepository;
    this.eventPublisher = eventPublisher;
    this.storageService = storageService;
  }

  async execute({ userId, title, description, difficulty, coverImageFile }) {
    const difficultyVO = new Difficulty(difficulty || 'facil');
    const coverImagePath = await this.storageService.save(coverImageFile);

    const challenge = new Challenge({
      title,
      description,
      difficulty: difficultyVO.toString(),
      coverImage: coverImagePath,
      userId
    });

    const saved = await this.challengeRepository.save(challenge);

    // Publica evento de domínio (desacoplamento via mensageria)
    await this.eventPublisher.publish(new ChallengeCreated({
      challengeId: saved.id,
      userId,
      title: saved.title,
      difficulty: saved.difficulty
    }));

    return saved;
  }
}

module.exports = CreateChallenge;
