const Joi = require('joi');

class Booking {
    constructor({ id, employee_id, room_id, dia_hora_reserva, dia_hora_fim_reserva, num_pessoas }) {
        this.id = id;
        this.employee_id = employee_id;
        this.room_id = room_id;
        this.dia_hora_reserva = dia_hora_reserva;
        this.dia_hora_fim_reserva = dia_hora_fim_reserva;
        this.num_pessoas = num_pessoas;
    }

    // Schema de validação para um Booking
    static getValidationSchema(isUpdate = false) {
        const schema = Joi.object({
            id: Joi.number().integer().min(1).optional(), // ID é opcional para criação, mas pode ser validado se presente
            employee_id: Joi.number().integer().required().messages({
                'any.required': 'O ID do funcionário é obrigatório.',
                'number.base': 'O ID do funcionário deve ser um número inteiro.'
            }),
            room_id: Joi.number().integer().required().messages({
                'any.required': 'O ID da sala é obrigatório.',
                'number.base': 'O ID da sala deve ser um número inteiro.'
            }),
            dia_hora_reserva: Joi.date().iso().required().messages({
                'any.required': 'A data e hora de início da reserva são obrigatórias.',
                'date.iso': 'A data e hora de início da reserva devem estar no formato ISO 8601 (YYYY-MM-DDTHH:mm:ssZ).'
            }),
            dia_hora_fim_reserva: Joi.date().iso().required().greater(Joi.ref('dia_hora_reserva')).messages({
                'any.required': 'A data e hora de fim da reserva são obrigatórias.',
                'date.iso': 'A data e hora de fim da reserva devem estar no formato ISO 8601 (YYYY-MM-DDTHH:mm:ssZ).',
                'date.greater': 'A data e hora de fim da reserva devem ser posteriores à data e hora de início.'
            }),
            num_pessoas: Joi.number().integer().min(1).required().messages({
                'any.required': 'O número de pessoas é obrigatório.',
                'number.base': 'O número de pessoas deve ser um número inteiro.',
                'number.min': 'O número de pessoas deve ser no mínimo 1.'
            })
        });

        // Se for uma atualização, todos os campos devem ser opcionais para permitir atualizações parciais
        // No seu caso, sua lógica de service exige todos os campos, então manteremos 'required'
        // Se você quiser permitir atualizações parciais, removeria o .required() e usaria .optional()
        // ou .default() no schema, e passaria { presence: 'optional' } no .validate()
        return schema;
    }

    // Método para validar uma instância do Booking
    validate(isUpdate = false) {
        const { error } = Booking.getValidationSchema(isUpdate).validate(this, { abortEarly: false, allowUnknown: true });
        if (error) {
            // Mapeia os detalhes do erro para mensagens mais claras
            const messages = error.details.map(detail => detail.message.replace(/['"]/g, ''));
            throw new Error(`Erro de validação: ${messages.join('; ')}`);
        }
    }
}

module.exports = Booking;