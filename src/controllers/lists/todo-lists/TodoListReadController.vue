<template>

    <div>
        <q-card class="q-mb-md">
            <todoListRead :id="id" />
        </q-card>
    </div>
</template>

<script>
import todoListRead from 'src/views/lists/todo-lists/TodoListRead.vue'

export default {
    name: 'TodoList-read-controller',
    components: {
        todoListRead,
    },

    data() {
        return {
            id: +this.$route.params.rId
        }
    },
}
</script>