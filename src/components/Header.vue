<template>
    <div class="flex flex-col justify-center gap-2">
        <div class="flex items-center justify-around p-2">
            <h1 class="text-4xl font-bold">Учетные записи</h1>
            <Button
                id="addUser"
                variant="outline"
                @click="$emit('add')"
            >
                <Plus />
            </Button>
        </div>
        <div
            class="grid grid-cols-[max-content_1fr] items-center gap-2 p-2 bg-muted rounded-sm"
        >
            <CircleQuestionMark />
            <Label for="addUser"
                >Для указания нескольких меток одной пары логин/пароль
                используйте разделитель ;</Label
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { Plus, CircleQuestionMark } from 'lucide-vue-next'

defineEmits<{
    (e: 'add'): void
}>()
</script>
