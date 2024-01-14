<template>
    kek
</template>

<script setup lang="ts">
import api from '@/api/Api';

const items = await api().getSchedule()

</script>