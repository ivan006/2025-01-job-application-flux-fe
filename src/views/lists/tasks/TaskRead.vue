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
import Task from 'src/models/orm-api/Task'

export default {
    name: 'Task-read',
    components: { SuperRecord },
    computed: {
        superRecordModel() {
            return Task
        },
    },
}
</script>

<style scoped></style>