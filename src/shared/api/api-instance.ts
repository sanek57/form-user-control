import type { IUser } from '../types'

export const userApi = {
    async getUsers(): Promise<IUser[] | []> {
        return []
    },
    async saveUser(user: IUser): Promise<void> {},
}
