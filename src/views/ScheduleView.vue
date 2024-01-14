<template>
    <Session name="hello" :time_start="new Date()" :participants="[]"></Session>
</template>

<script setup lang="ts">
import api from '@/api/Api';
import Session from '@/components/Session.vue';

const items = await api().getSchedule()

</script>