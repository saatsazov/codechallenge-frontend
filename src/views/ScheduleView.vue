<template>
    <div>
        <Session v-for="s in schedule.items" v-bind="s" />
    </div>
</template>

<script setup lang="ts">
import api from '@/api/Api';
import Session from '@/components/Session.vue';

const schedule = await api().getSchedule()

</script>