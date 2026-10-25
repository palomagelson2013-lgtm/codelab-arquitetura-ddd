/**
 * Entidade de Domínio: User
 * Contém apenas regras de negócio. Sem dependência de Sequelize, Express, etc.
 */
class User {
  constructor({ id, username, email, fullName, bio, profilePicture, isAdmin, challengesCount }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.fullName = fullName;
    this.bio = bio || '';
    this.profilePicture = profilePicture;
    this.isAdmin = !!isAdmin;
    this.challengesCount = challengesCount || 0;
  }

  updateProfile({ fullName, bio }) {
    if (fullName) this.fullName = fullName;
    if (bio !== undefined) this.bio = bio;
  }

  incrementChallengesCount() {
    this.challengesCount += 1;
  }
}

module.exports = User;
