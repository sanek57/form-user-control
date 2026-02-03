<template>
    <form
        class="grid grid-cols-[2fr_1.5fr_2fr_1.5fr_80px] gap-4 px-4 py-3"
        @submit.prevent="onSubmit"
    >
        <FormField
            name="labels"
            v-slot="{ componentField }"
        >
            <FormControl>
                <Input
                    v-bind="componentField"
                    type="textarea"
                />
            </FormControl>
        </FormField>
        <FormField
            name="type"
            v-slot="{ componentField }"
        >
            <FormControl>
                <UiSelect
                    v-bind="componentField"
                    :options="optionsType"
                    placeholder="Выберите тип"
                />
            </FormControl>
        </FormField>
        <FormField
            name="login"
            v-slot="{ componentField }"
        >
            <FormControl>
                <Input v-bind="componentField" />
            </FormControl>
        </FormField>
        <FormField
            name="password"
            v-slot="{ componentField }"
        >
            <FormControl>
                <Input
                    v-bind="componentField"
                    type="password"
                />
            </FormControl>
        </FormField>
        <Button
            variant="ghost"
            @click.prevent="emits('delete', user.id as number)"
            class="group text-muted-foreground hover:text-red-600 hover:bg-red-50"
        >
            <Trash2
                class="h-5 w-5 transition-colors group-hover:text-red-600"
            />
        </Button>
    </form>
</template>

<script setup lang="ts">
import { optionsType, type IUser } from '@/shared/types'
import { Trash2 } from 'lucide-vue-next'

import Input from '@/components/ui/input/Input.vue'
import { FormField } from './ui/form'
import FormControl from './ui/form/FormControl.vue'
import Button from '@/components/ui/button/Button.vue'
import { useCreateUserForm } from '@/composables/user/use-create-user-form'
import UiSelect from './ui/select/UiSelect.vue'

defineProps<{
    user: IUser
}>()

const emits = defineEmits<{
    (e: 'delete', id: number): void
    (e: 'save', user: IUser): void
}>()

const { handleSubmit } = useCreateUserForm({})

const onSubmit = handleSubmit(values => {})
</script>
