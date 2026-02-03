<template>
    <div
        class="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10"
    >
        <div class="w-full max-w-3xl">
            <Header @add="addEmptyUser" />
            <ListUsers
                :users="users"
                @add="addEmptyUser"
                @delete=""
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import ListUsers from '@/components/ListUsers.vue'
import { useUserStore } from '@/shared/store/user-store'
import type { IUser } from '@/shared/types'
import { reactive } from 'vue'

const { users, addUser, deleteUser } = useUserStore()

const emptyUser = reactive<IUser>({
    labels: '',
    login: '',
    password: '',
    type: 'Локальная',
})

const addEmptyUser = () => {
    addUser(emptyUser)
}
</script>

<style scoped></style>
