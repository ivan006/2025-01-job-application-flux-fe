<template>
    <SuperRecord
        :model="superRecordModel"
        :id="+$route.params.rId"
        :displayMapField="true"
        @initialLoadHappened="$emit('initialLoadHappened')"
    >
    </SuperRecord>
</template>

<script>
import { SuperRecord } from 'wizweb-fe'
import TodoList from 'src/models/orm-api/TodoList'

export default {
    name: 'TodoList-read',
    components: { SuperRecord },
    computed: {
        superRecordModel() {
            return TodoList
        },
    },
}
</script>

<style scoped></style>