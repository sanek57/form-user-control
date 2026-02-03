<template>
    <form
        class="grid gap-4 px-4 py-3 items-center"
        :class="columnCount"
        @submit.prevent="onSubmit"
    >
        <FormField
            name="labels"
            v-slot="{ componentField, errors }"
        >
            <FormItem>
                <FormControl>
                    <Textarea
                        v-bind="componentField"
                        :class="{ 'border-destructive': errors.length > 0 }"
                        @blur="() => autoSaveIfValid('labels')"
                    />
                </FormControl>
            </FormItem>
        </FormField>
        <FormField
            name="type"
            v-slot="{ componentField, errors }"
        >
            <FormItem>
                <FormControl>
                    <UiSelect
                        v-bind="componentField"
                        :options="optionsType"
                        placeholder="Тип"
                        :class="{ 'border-destructive': errors.length > 0 }"
                        @update:modelValue="() => autoSaveIfValid('type')"
                    />
                </FormControl>
            </FormItem>
        </FormField>
        <FormField
            name="login"
            v-slot="{ componentField, errors }"
        >
            <FormItem>
                <FormControl>
                    <Input
                        v-bind="componentField"
                        :class="{ 'border-destructive': errors.length > 0 }"
                        @blur="() => autoSaveIfValid('login')"
                    />
                </FormControl>
            </FormItem>
        </FormField>
        <FormField
            name="password"
            v-if="needsPassword"
            v-slot="{ componentField, errors }"
        >
            <FormItem>
                <FormControl>
                    <Input
                        v-bind="componentField"
                        type="password"
                        :class="{ 'border-destructive': errors.length > 0 }"
                        @blur="() => autoSaveIfValid('password')"
                    />
                </FormControl>
            </FormItem>
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
import { useCreateUserForm } from '@/composables/user/use-create-user-form'
import { Trash2 } from 'lucide-vue-next'

import Input from '@/components/ui/input/Input.vue'
import { Textarea } from '@/components/ui/textarea'
import { FormField, FormControl, FormItem } from '@/components/ui/form'
import Button from '@/components/ui/button/Button.vue'
import UiSelect from '@/components/ui/select/UiSelect.vue'
import { computed, watch } from 'vue'

const props = defineProps<{
    user: IUser
}>()

const emits = defineEmits<{
    (e: 'delete', id: number): void
    (e: 'save', user: IUser): void
}>()

const { handleSubmit, values, validateField } = useCreateUserForm(props.user)

const onSubmit = handleSubmit(values => {
    emits('save', { ...values, id: props.user.id } as IUser)
})

const needsPassword = computed(() => values.type !== 'LDPA')

const columnCount = computed(() =>
    needsPassword.value
        ? 'grid-cols-[2fr_1.5fr_2fr_1.5fr_80px]'
        : 'grid-cols-[2fr_1.5fr_3.5fr_80px]',
)

const autoSaveIfValid = async (
    fieldName: keyof Omit<IUser, 'id' | 'labelsArr'>,
) => {
    const { valid } = await validateField(fieldName)

    if (valid) {
        emits('save', { ...values, id: props.user.id } as IUser)
        console.log(`Сохранено после изменения ${fieldName}`)
    } else {
        console.log(`Не сохраняем — поле ${fieldName} невалидно`)
    }
}
</script>
