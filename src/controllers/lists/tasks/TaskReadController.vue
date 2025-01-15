<template>

    <div>
        <q-card class="q-mb-md">
            <taskRead :id="id" />
        </q-card>
    </div>
</template>

<script>
import taskRead from 'src/views/lists/tasks/TaskRead.vue'

export default {
    name: 'Task-read-controller',
    components: {
        taskRead,
    },

    data() {
        return {
            id: +this.$route.params.rId
        }
    },
}
</script>