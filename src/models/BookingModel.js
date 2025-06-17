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

    static getValidationSchema(isUpdate = false) {
        const schema = Joi.object({
            id: Joi.number().integer().min(1).optional(),
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

        return schema;
    }

    validate(isUpdate = false) {
        const { error } = Booking.getValidationSchema(isUpdate).validate(this, { abortEarly: false, allowUnknown: true });
        if (error) {
            const messages = error.details.map(detail => detail.message.replace(/['"]/g, ''));
            throw new Error(`Erro de validação: ${messages.join('; ')}`);
        }
    }
}

module.exports = Booking;