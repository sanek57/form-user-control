export type RecordType = 'LDPA' | 'Локальная'

interface ILabel {
    text: string
}

export interface IUser {
    id?: number
    labels?: ILabel[]
    type: RecordType
    login: string
    password: string | null
}
