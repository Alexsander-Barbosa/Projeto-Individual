const BookingRepository = require('../repositories/BookingRepository');
const RoomRepository = require('../repositories/RoomRepository');

const EXACT_DURATION_MS = 2 * 60 * 60 * 1000;

const BookingService = {
    criar: async (data) => {
        const { employee_id, room_id, dia_hora_reserva, dia_hora_fim_reserva, num_pessoas } = data;
        if (!employee_id || !room_id || !dia_hora_reserva || !dia_hora_fim_reserva || !num_pessoas) {
            throw new Error('Todos os campos da reserva são obrigatórios.');
        }

        const inicio = new Date(dia_hora_reserva);
        const fim = new Date(dia_hora_fim_reserva);

        if (fim <= inicio) {
            throw new Error('A data/hora de fim da reserva deve ser posterior à data/hora de início.');
        }

        const durationMs = fim.getTime() - inicio.getTime();
        if (durationMs !== EXACT_DURATION_MS) {
            throw new Error('A duração da reserva deve ser exatamente 2 horas.');
        }

        const room = await RoomRepository.buscarPorId(room_id);
        if (!room) {
            throw new Error('Sala não encontrada.');
        }
        if (num_pessoas > room.capacidade_maxima) {
            throw new Error(`Número de pessoas (${num_pessoas}) excede a capacidade máxima da sala (${room.capacidade_maxima}).`);
        }

        const isOverlapping = await BookingRepository.verificarSobreposicao(room_id, inicio, fim);
        if (isOverlapping) {
            throw new Error('A sala já está reservada para o período solicitado neste período.');
        }

        return await BookingRepository.criar({
            employee_id, room_id, dia_hora_reserva, dia_hora_fim_reserva, num_pessoas
        });
    },

    listar: async () => {
        return await BookingRepository.listar();
    },

    buscarPorId: async (id) => {
        return await BookingRepository.buscarPorId(id);
    },

    atualizar: async (id, data) => {
        const { employee_id, room_id, dia_hora_reserva, dia_hora_fim_reserva, num_pessoas } = data;
        if (!employee_id || !room_id || !dia_hora_reserva || !dia_hora_fim_reserva || !num_pessoas) {
            throw new Error('Todos os campos da reserva são obrigatórios para atualização.');
        }

        const inicio = new Date(dia_hora_reserva);
        const fim = new Date(dia_hora_fim_reserva);

        if (fim <= inicio) {
            throw new Error('A data/hora de fim da reserva deve ser posterior à data/hora de início.');
        }

        const durationMs = fim.getTime() - inicio.getTime();
        if (durationMs !== EXACT_DURATION_MS) {
            throw new Error('A duração da reserva deve ser exatamente 2 horas.');
        }

        const room = await RoomRepository.buscarPorId(room_id);
        if (!room) {
            throw new Error('Sala não encontrada.');
        }
        if (num_pessoas > room.capacidade_maxima) {
            throw new Error(`Número de pessoas (${num_pessoas}) excede a capacidade máxima da sala (${room.capacidade_maxima}).`);
        }

        const isOverlapping = await BookingRepository.verificarSobreposicao(room_id, inicio, fim, id);
        if (isOverlapping) {
            throw new Error('A sala já está reservada para o período solicitado neste período.');
        }

        return await BookingRepository.atualizar(id, {
            employee_id, room_id, dia_hora_reserva, dia_hora_fim_reserva, num_pessoas
        });
    },

    excluir: async (id) => {
        return await BookingRepository.excluir(id);
    }
};

module.exports = BookingService;