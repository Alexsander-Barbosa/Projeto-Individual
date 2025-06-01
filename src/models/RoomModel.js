class Room {
  constructor({ id, numero_sala, capacidade_maxima }) {
    this.id = id;
    this.numero_sala = numero_sala;
    this.capacidade_maxima = capacidade_maxima;
  }
}

module.exports = Room;