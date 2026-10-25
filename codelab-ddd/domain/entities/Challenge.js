/**
 * Entidade de Domínio: Challenge
 */
class Challenge {
  constructor({ id, title, description, difficulty, coverImage, userId, viewsCount, likesCount, commentsCount }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.difficulty = difficulty; // Value Object Difficulty
    this.coverImage = coverImage;
    this.userId = userId;
    this.viewsCount = viewsCount || 0;
    this.likesCount = likesCount || 0;
    this.commentsCount = commentsCount || 0;
  }

  incrementViews() {
    this.viewsCount += 1;
  }

  incrementLikes() {
    this.likesCount += 1;
  }

  decrementLikes() {
    if (this.likesCount > 0) this.likesCount -= 1;
  }

  incrementComments() {
    this.commentsCount += 1;
  }

  isOwnedBy(userId) {
    return this.userId === userId;
  }
}

module.exports = Challenge;
