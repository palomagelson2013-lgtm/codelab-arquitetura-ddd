/**
 * Port (Interface) do repositório de Challenge.
 * A camada de domínio e application dependem desta abstração.
 * A implementação concreta fica em infrastructure/persistence.
 */
class IChallengeRepository {
  async save(challenge) { throw new Error('Not implemented'); }
  async findById(id) { throw new Error('Not implemented'); }
  async findByOwner(userId) { throw new Error('Not implemented'); }
  async findFeed({ page, limit }) { throw new Error('Not implemented'); }
  async delete(id) { throw new Error('Not implemented'); }
}

module.exports = IChallengeRepository;
