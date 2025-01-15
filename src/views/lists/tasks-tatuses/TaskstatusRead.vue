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
import Taskstatus from 'src/models/orm-api/Taskstatus'

export default {
    name: 'Taskstatus-read',
    components: { SuperRecord },
    computed: {
        superRecordModel() {
            return Taskstatus
        },
    },
}
</script>

<style scoped></style>