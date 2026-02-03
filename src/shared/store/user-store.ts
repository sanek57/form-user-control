import { defineStore } from 'pinia'

// api
import { userApi } from '../api/api-instance'

// constants
import { STORAGE_KEY, type IUser } from '../types'
import { userControl } from '@/features/user'

interface UserState {
    users: IUser[] | null
}

export const useUserStore = defineStore(STORAGE_KEY, {
    state: (): UserState => {
        const savedUsers = userApi.getFromLocalStorage<IUser[] | null>(
            STORAGE_KEY,
        )

        return {
            users: savedUsers
                ? userControl.prepareGetUsers(savedUsers as IUser[])
                : [],
        }
    },
    actions: {
        addUser(user: IUser) {
            const newUser: IUser = userControl.prepareSetUser(user)

            this.users?.push(newUser)
            this.$save()
        },
        updateUser(user: IUser) {
            console.log(4, user)
            if (this.users) {
                this.users = this.users.map(u => {
                    if (u.id === user.id) {
                        return userControl.prepareSetUser(user)
                    }
                    return u
                })
            }
            this.$save()
        },
        deleteUser(id: number) {
            this.users?.filter(u => u.id !== id)
            this.$save()
        },
        $save() {
            userApi.saveToLocalStorage<IUser[] | null>(STORAGE_KEY, this.users)
        },
    },
})
