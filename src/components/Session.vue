<template>
    <div>
        {{ $props.name }} - {{ $props.time_start }} - {{ $props.time_end }} (or {{ formattedDate }})
        <ul>
            <li v-for="p in $props.participants">
                {{ p.name }}
                roles:
                <span v-for="r in p.roles">{{ r }}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import type { Session } from '@/api/Api';
import { computed } from 'vue';

const props = defineProps<Session>()

const formattedDate = computed<string>((): string => {
    if (props.time_end == null) {
        // session has no formal ending
        return props.time_start.toISOString()
    }

    if (props.time_end < props.time_start) {
        // ending before start. Consider ending time invalid and ignore it
        return props.time_start.toISOString()
    }

    const diffInMills: number = props.time_end.getTime() - props.time_start.getTime();

    const totalSeconds = Math.floor(diffInMills / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    if (totalHours < 4) {
        // if difference between dates is less than magic number of hours show second date as number
        return props.time_start.toISOString() + ' - ' + props.time_end.toTimeString()
    }

    return props.time_start.toISOString() + ' - ' + props.time_end.toISOString()
})

</script>