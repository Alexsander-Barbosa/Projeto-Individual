const Joi = require('joi');

class Room {
    constructor({ id, numero_sala, capacidade_maxima }) {
        this.id = id;
        this.numero_sala = numero_sala;
        this.capacidade_maxima = capacidade_maxima;
    }

    static getValidationSchema(isUpdate = false) {
        const schema = Joi.object({
            id: Joi.number().integer().min(1).optional(),
            numero_sala: Joi.number().integer().min(1).required().messages({
                'any.required': 'O número da sala é obrigatório.',
                'number.base': 'O número da sala deve ser um número inteiro.',
                'number.min': 'O número da sala deve ser no mínimo 1.'
            }),
            capacidade_maxima: Joi.number().integer().min(1).required().messages({
                'any.required': 'A capacidade máxima é obrigatória.',
                'number.base': 'A capacidade máxima deve ser um número inteiro.',
                'number.min': 'A capacidade máxima deve ser no mínimo 1.'
            })
        });

        return schema;
    }

    validate(isUpdate = false) {
        const { error } = Room.getValidationSchema(isUpdate).validate(this, { abortEarly: false, allowUnknown: true });
        if (error) {
            const messages = error.details.map(detail => detail.message.replace(/['"]/g, ''));
            throw new Error(`Erro de validação: ${messages.join('; ')}`);
        }
    }
}

module.exports = Room;