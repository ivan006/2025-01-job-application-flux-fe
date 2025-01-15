<template>

    <div>
        <q-card class="q-mb-md">
            <taskstatusRead :id="id" />
        </q-card>
    </div>
</template>

<script>
import taskstatusRead from 'src/views/lists/tasks-tatuses/TaskstatusRead.vue'

export default {
    name: 'Taskstatus-read-controller',
    components: {
        taskstatusRead,
    },

    data() {
        return {
            id: +this.$route.params.rId
        }
    },
}
</script>