import { defineStore } from 'pinia'
import type { IUser } from '../types'

interface UserState {
    users: IUser[] | null
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        users: null,
    }),
    actions: {
        async initUsers() {
        },
        addUser(user: IUser) {

        },
        deleteUser(id: number) {

        },
    },
})
