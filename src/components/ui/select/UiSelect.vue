<template>
    <Select
        v-bind="$attrs"
        class="cursor-pointer"
        :default-value="props.defaultValue"
        :multiple="Array.isArray(props.modelValue)"
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
    >
        <SelectTrigger :class="['w-full', props.class]">
            <SelectValue :placeholder="props.placeholder" />
        </SelectTrigger>
        <SelectContent
            :filterable="false"
            class="min-w-70 max-h-80 w-max"
        >
            <div class="overflow-y-auto">
                <SelectGroup>
                    <slot name="prepend" />
                    <SelectItem
                        v-for="(option, i) in props.options"
                        :key="i"
                        :value="getValue(option)"
                        class="cursor-pointer"
                    >
                        <slot
                            name="option-label"
                            :scope="option"
                        >
                            {{ getLabel(option) }}
                        </slot>
                    </SelectItem>
                    <slot name="append" />
                </SelectGroup>
            </div>
        </SelectContent>
    </Select>
</template>

<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { computed } from 'vue'

const props = withDefaults(
    defineProps<{
        placeholder?: string
        options?: Record<string | number, any>[] | number[] | string[] | null
        modelValue?:
            | Record<string | number, any>
            | number
            | string
            | null
            | Record<string | number, any>[]
            | string[]
            | number[]
        valueKey?: string
        labelKey?: string
        class?: any
        placeholderSearch?: string
        defaultValue?: string
    }>(),
    {
        valueKey: 'id',
        labelKey: 'name',
    },
)

const emits = defineEmits<{
    'update:modelValue': [value: any]
}>()

function getValue(option: number | string | Record<string | number, any>) {
    if (typeof option === 'object') {
        return option[props.valueKey]
    }
    return option
}

function getLabel(option: number | string | Record<string | number, any>) {
    if (typeof option === 'object') {
        return option[props.labelKey]
    }
    return option
}
</script>
