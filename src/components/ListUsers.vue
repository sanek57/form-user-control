<template>
    <div class="flex flex-col justify-center gap-2 mt-4">
        <div
            v-if="users?.length"
            class="flex flex-col"
        >
            <div
                class="grid grid-cols-[2fr_1.5fr_2fr_1.5fr_80px] gap-4 px-4 py-3 border-b text-sm font-medium text-muted-foreground text-left"
            >
                <span>Метки</span>
                <span>Тип записи</span>
                <span>Логин</span>
                <span>Пароль</span>
                <span></span>
            </div>
            <User
                v-for="user in users"
                :user="user"
                :key="user.id"
                @delete="$emit('delete', user.id as number)"
                @save=""
            />
        </div>
        <div
            v-else
            class="flex flex-col items-center p-4"
        >
            <span class="text-sm">Учетных записей пока нет. </span>
            <a
                @click.prevent="$emit('add')"
                class="text-sm underline cursor-pointer text-muted-foreground"
                >Создать запись</a
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IUser } from '@/shared/types'
import User from './User.vue'

const props = defineProps<{
    users: IUser[] | null
}>()

defineEmits<{
    (e: 'delete', id: number): void
    (e: 'add'): void
}>()

console.log(123, props.users)
</script>
