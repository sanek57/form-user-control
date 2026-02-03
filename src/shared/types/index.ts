export const RECORD_TYPES = ['LDPA', 'Локальная'] as const
export type RecordType = (typeof RECORD_TYPES)[number]
export const STORAGE_KEY = 'users'

export interface ILabel {
    text: string
}

export interface IUser {
    id?: number
    labels?: string
    labelsArr?: ILabel[]
    type: RecordType
    login: string
    password: string | null
}

export const optionsType = [
    { id: 'LDPA', name: 'LDPA' },
    { id: 'LOCAL', name: 'Локальная' },
]
