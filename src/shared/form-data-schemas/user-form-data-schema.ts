import * as z from 'zod'
import { RECORD_TYPES } from '../types'

export const UserBaseSchema = z.object({
    labels: z
        .string()
        .max(50, { message: 'Метки не могут превышать 50 символов' })
        .optional()
        .default(''),
    type: z
        .enum(RECORD_TYPES, {
            required_error: 'Выберите тип записи',
            invalid_type_error: 'Неверный тип записи',
        })
        .default('Локальная'),
    login: z
        .string({
            required_error: 'Логин обязателен',
        })
        .min(1, { message: 'Логин обязателен' })
        .max(100, { message: 'Логин не может превышать 100 символов' })
        .trim(),
    password: z
        .string()
        .min(1, { message: 'Пароль обязателен' })
        .max(100, { message: 'Пароль не может превышать 100 символов' })
        .nullable()
        .default(''),
})