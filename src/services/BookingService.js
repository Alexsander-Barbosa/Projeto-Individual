// src/services/BookingService.js (CORRIGIDO)

const BookingRepository = require('../repositories/BookingRepository');
const RoomRepository = require('../repositories/RoomRepository'); // Para buscar capacidade da sala

// Defina a duração exata da reserva (em milissegundos)
const EXACT_DURATION_MS = 2 * 60 * 60 * 1000; // 2 horas

const BookingService = {
    criar: async (data) => {
        // Validação: Campos necessários
        const { employee_id, room_id, dia_hora_reserva, dia_hora_fim_reserva, num_pessoas } = data;
        if (!employee_id || !room_id || !dia_hora_reserva || !dia_hora_fim_reserva || !num_pessoas) {
            throw new Error('Todos os campos da reserva são obrigatórios.');
        }

        const inicio = new Date(dia_hora_reserva);
        const fim = new Date(dia_hora_fim_reserva);

        // 1. Validação: Fim após Início
        if (fim <= inicio) {
            throw new Error('A data/hora de fim da reserva deve ser posterior à data/hora de início.');
        }

        // 2. Validação: Duração Exata
        const durationMs = fim.getTime() - inicio.getTime();
        if (durationMs !== EXACT_DURATION_MS) {
            throw new Error('A duração da reserva deve ser exatamente 2 horas.');
        }

        // 3. Validação: Capacidade Máxima da Sala
        const room = await RoomRepository.buscarPorId(room_id);
        if (!room) {
            throw new Error('Sala não encontrada.');
        }
        if (num_pessoas > room.capacidade_maxima) {
            throw new Error(`Número de pessoas (${num_pessoas}) excede a capacidade máxima da sala (${room.capacidade_maxima}).`);
        }

        // 4. Validação: Conflito de Horário (Assumindo que você já adicionou verificarSobreposicao no Repository)
        const isOverlapping = await BookingRepository.verificarSobreposicao(room_id, inicio, fim);
        if (isOverlapping) {
            throw new Error('A sala já está reservada para o período solicitado neste período.');
        }

        // Se todas as validações passarem, chama o repositório
        return await BookingRepository.criar({
            employee_id, room_id, dia_hora_reserva, dia_hora_fim_reserva, num_pessoas
        });
    },

    listar: async () => {
        // O Service pede ao Repository para listar
        return await BookingRepository.listar();
    },

    buscarPorId: async (id) => {
        // O Service pede ao Repository para buscar por ID
        return await BookingRepository.buscarPorId(id);
    },

    atualizar: async (id, data) => {
        // Validação: Campos necessários
        const { employee_id, room_id, dia_hora_reserva, dia_hora_fim_reserva, num_pessoas } = data;
        if (!employee_id || !room_id || !dia_hora_reserva || !dia_hora_fim_reserva || !num_pessoas) {
            throw new Error('Todos os campos da reserva são obrigatórios para atualização.');
        }

        const inicio = new Date(dia_hora_reserva);
        const fim = new Date(dia_hora_fim_reserva);

        // 1. Validação: Fim após Início
        if (fim <= inicio) {
            throw new Error('A data/hora de fim da reserva deve ser posterior à data/hora de início.');
        }

        // 2. Validação: Duração Exata
        const durationMs = fim.getTime() - inicio.getTime();
        if (durationMs !== EXACT_DURATION_MS) {
            throw new Error('A duração da reserva deve ser exatamente 2 horas.');
        }

        // 3. Validação: Capacidade Máxima da Sala
        const room = await RoomRepository.buscarPorId(room_id);
        if (!room) {
            throw new Error('Sala não encontrada.');
        }
        if (num_pessoas > room.capacidade_maxima) {
            throw new Error(`Número de pessoas (${num_pessoas}) excede a capacidade máxima da sala (${room.capacidade_maxima}).`);
        }

        // 4. Validação: Conflito de Horário (para atualização, ignorando a própria reserva)
        const isOverlapping = await BookingRepository.verificarSobreposicao(room_id, inicio, fim, id);
        if (isOverlapping) {
            throw new Error('A sala já está reservada para o período solicitado neste período.');
        }

        // Se todas as validações passarem, chama o repositório para atualizar
        return await BookingRepository.atualizar(id, {
            employee_id, room_id, dia_hora_reserva, dia_hora_fim_reserva, num_pessoas
        });
    },

    excluir: async (id) => {
        // O Service pede ao Repository para excluir
        return await BookingRepository.excluir(id);
    }
};

module.exports = BookingService;