<template>

    <div>
        <todoListList
            :parentKeyValuePair="parentKeyValuePair"
            :fetchFlags="fetchFlags"
        />
    </div>
</template>

<script>
import todoListList from 'src/views/lists/todo-lists/TodoListList.vue'

export default {
    name: 'TodoList-list-controller',
    components: {
        todoListList,
    },

    data() {
        return {
            parentKeyValuePair: {},
            fetchFlags: {}
        }
    },
}
</script>