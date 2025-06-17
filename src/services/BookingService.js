const BookingRepository = require('../repositories/BookingRepository');
const RoomRepository = require('../repositories/RoomRepository');
const Booking = require('../models/BookingModel'); 

const EXACT_DURATION_MS = 2 * 60 * 60 * 1000;

const BookingService = {
    criar: async (data) => {
        const newBooking = new Booking(data);
        newBooking.validate();

        const { room_id, dia_hora_reserva, dia_hora_fim_reserva, num_pessoas } = data;

        const inicio = new Date(dia_hora_reserva);
        const fim = new Date(dia_hora_fim_reserva);

        const durationMs = fim.getTime() - inicio.getTime();
        if (durationMs !== EXACT_DURATION_MS) {
            throw new Error('A duração da reserva deve ser exatamente 2 horas.');
        }

        const room = await RoomRepository.buscarPorId(room_id);
        if (!room) {
            throw new Error('Sala não encontrada.');
        }
        if (num_pessoas > room.capacidade_maxima) {
            throw new Error(`Número de pessoas (<span class="math-inline">\{num\_pessoas\}\) excede a capacidade máxima da sala \(</span>{room.capacidade_maxima}).`);
        }

        const isOverlapping = await BookingRepository.verificarSobreposicao(room_id, inicio, fim);
        if (isOverlapping) {
            throw new Error('A sala já está reservada para o período solicitado neste período.');
        }

        return await BookingRepository.criar(newBooking);
    },

    listar: async () => {
        return await BookingRepository.listar();
    },

    buscarPorId: async (id) => {
        return await BookingRepository.buscarPorId(id);
    },

    atualizar: async (id, data) => {
        const updatedBooking = new Booking({ id, ...data });
        updatedBooking.validate(true);

        const { room_id, dia_hora_reserva, dia_hora_fim_reserva, num_pessoas } = data;

        const inicio = new Date(dia_hora_reserva);
        const fim = new Date(dia_hora_fim_reserva);

        const durationMs = fim.getTime() - inicio.getTime();
        if (durationMs !== EXACT_DURATION_MS) {
            throw new Error('A duração da reserva deve ser exatamente 2 horas.');
        }

        const room = await RoomRepository.buscarPorId(room_id);
        if (!room) {
            throw new Error('Sala não encontrada.');
        }
        if (num_pessoas > room.capacidade_maxima) {
            throw new Error(`Número de pessoas (<span class="math-inline">\{num\_pessoas\}\) excede a capacidade máxima da sala \(</span>{room.capacidade_maxima}).`);
        }

        const isOverlapping = await BookingRepository.verificarSobreposicao(room_id, inicio, fim, id);
        if (isOverlapping) {
            throw new Error('A sala já está reservada para o período solicitado neste período.');
        }

        return await BookingRepository.atualizar(id, updatedBooking);
    },

    excluir: async (id) => {
        return await BookingRepository.excluir(id);
    }
};

module.exports = BookingService;