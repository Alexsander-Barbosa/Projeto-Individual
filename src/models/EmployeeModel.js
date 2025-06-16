const Joi = require('joi');

class Employee {
    constructor({ id, nome, departamento }) {
        this.id = id;
        this.nome = nome;
        this.departamento = departamento;
    }

    static getValidationSchema(isUpdate = false) {
        const schema = Joi.object({
            id: Joi.number().integer().min(1).optional(),
            nome: Joi.string().trim().min(3).max(100).required().messages({
                'string.empty': 'O nome do funcionário não pode ser vazio.',
                'string.min': 'O nome do funcionário deve ter no mínimo {#limit} caracteres.',
                'string.max': 'O nome do funcionário deve ter no máximo {#limit} caracteres.',
                'any.required': 'O nome do funcionário é obrigatório.'
            }),
            departamento: Joi.string().trim().min(3).max(100).required().messages({
                'string.empty': 'O departamento não pode ser vazio.',
                'string.min': 'O departamento deve ter no mínimo {#limit} caracteres.',
                'string.max': 'O departamento deve ter no máximo {#limit} caracteres.',
                'any.required': 'O departamento é obrigatório.'
            })
        });

        return schema;
    }

    validate(isUpdate = false) {
        const { error } = Employee.getValidationSchema(isUpdate).validate(this, { abortEarly: false, allowUnknown: true });
        if (error) {
            const messages = error.details.map(detail => detail.message.replace(/['"]/g, ''));
            throw new Error(`Erro de validação: ${messages.join('; ')}`);
        }
    }
}

module.exports = Employee;