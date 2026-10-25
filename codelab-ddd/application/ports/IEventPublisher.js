/**
 * Port de saída: Publicador de eventos de domínio.
 * Implementação concreta (RabbitMQ, Redis Pub/Sub, etc.) fica em infrastructure/messaging.
 */
class IEventPublisher {
  async publish(domainEvent) {
    throw new Error('Not implemented');
  }
}

module.exports = IEventPublisher;
