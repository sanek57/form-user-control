export type RecordType = 'LDPA' | 'Локальная'
export const STORAGE_KEY = 'users'

export interface ILabel {
    text: string
}

export interface IUser {
    id?: number
    labels?: ILabel[] | string
    type: RecordType
    login: string
    password: string | null
}
