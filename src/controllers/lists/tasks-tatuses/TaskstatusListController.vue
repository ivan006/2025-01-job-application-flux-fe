<template>

    <div>
        <taskstatusList
            :parentKeyValuePair="parentKeyValuePair"
            :fetchFlags="fetchFlags"
        />
    </div>
</template>

<script>
import taskstatusList from 'src/views/lists/tasks-tatuses/TaskstatusList.vue'

export default {
    name: 'Taskstatus-list-controller',
    components: {
        taskstatusList,
    },

    data() {
        return {
            parentKeyValuePair: {},
            fetchFlags: {}
        }
    },
}
</script>