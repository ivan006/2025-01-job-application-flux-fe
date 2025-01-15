<template>

    <div>
        <taskList
            :parentKeyValuePair="parentKeyValuePair"
            :fetchFlags="fetchFlags"
        />
    </div>
</template>

<script>
import taskList from 'src/views/lists/tasks/TaskList.vue'

export default {
    name: 'Task-list-controller',
    components: {
        taskList,
    },

    data() {
        return {
            parentKeyValuePair: {},
            fetchFlags: {}
        }
    },
}
</script>