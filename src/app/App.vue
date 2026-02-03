<template>
    <div
        class="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10"
    >
        <div class="w-full max-w-2xl border-2 border-red-400">
            <Header @add="console.log('add user');"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';

</script>

<style scoped></style>
