import * as z from 'zod'
import { RECORD_TYPES } from '../types'

export const UserBaseSchema = z
    .object({
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
            .max(100, { message: 'Логин не может превышать 100 символов' })
            .trim(),
        password: z
            .string()
            .max(100, { message: 'Логин не может превышать 100 символов' })
            .optional()
            .default(''),
    })
    .refine(
        data => {
            if (data.type === 'LDPA') {
                return !data.password || data.password.trim() === ''
            }
            return !!data.password && data.password.trim() !== ''
        },
        {
            message: 'Пароль обязателен при выборе типа "Локальная"',
            path: ['password'],
        },
    )
    .transform(data => {
        if (data.type === 'LDPA') {
            return {
                ...data,
                password: null,
            }
        }
        return data
    })
