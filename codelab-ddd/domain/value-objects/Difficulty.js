/**
 * Value Object: Difficulty
 * Garante que apenas valores válidos existam no domínio.
 */
const VALID = ['facil', 'medio', 'dificil'];

class Difficulty {
  constructor(value) {
    if (!VALID.includes(value)) {
      throw new Error(`Dificuldade inválida: ${value}. Valores permitidos: ${VALID.join(', ')}`);
    }
    this.value = value;
  }

  equals(other) {
    return other instanceof Difficulty && this.value === other.value;
  }

  toString() {
    return this.value;
  }
}

module.exports = Difficulty;
