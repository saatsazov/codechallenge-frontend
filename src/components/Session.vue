<template>
    <div>
        {{ $props.name }} - {{ formattedDate }}
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
import { format } from 'date-fns';

const props = defineProps<Session>()

const formattedDate = computed<string>((): string => {
    const result = format(props.session_start, "MMM do yyyy h:mma")

    if (props.session_end == null) {
        // session has no formal ending
        return result
    }

    if (props.session_end < props.session_start) {
        // ending before start. Consider ending time invalid and ignore it
        return result
    }

    const diffInMills: number = props.session_end.getTime() - props.session_start.getTime();

    const totalSeconds = Math.floor(diffInMills / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    if (totalHours < 4) {
        // if difference between dates is less than magic number of hours show second date as time only
        return result + ' - ' + format(props.session_end, 'h:mm a')
    }

    return result + ' - ' + format(props.session_end, "MMM do yyyy h:mma")
})

</script>