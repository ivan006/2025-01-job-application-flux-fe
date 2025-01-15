<template>

            <SuperRecord
                :model="superRecordModel"
                :id="+$route.params.rId"
                :displayMapField="true"
                @initialLoadHappened="$emit('initialLoadHappened')"
                :templateOverview="templateListGrid"
                :allowedTabs="['overview']"
            >
            </SuperRecord>
</template>

<script>
import { SuperRecord } from 'wizweb-fe'
import User from 'src/models/User'
import {computed} from "vue";
import VueCookies from "vue-cookies";

export default {
    name: 'User-read',
    components: { SuperRecord },
    computed: {
        superRecordModel() {
            return User
        },
    },
  data(){
      return {

        templateListGrid: {
          class: "q-pa-md q-col-gutter-md",
          cols: [
            {
              width: 12,
              dataPoint: {
                type: "function",
                function: (item) => `${item.name}`,
                label: "",
                tag: "div",
                class: "text-h6",
                hideLabel: true,
              },
            },
            {
              width: 3,
              dataPoint: {
                type: "function",
                function: (item) => `${item.email}`,
                label: "Email",
                // xOrientation: true,
              },
            },
            {
              width: 12,
              dataPoint: {
                hideLabel: true,
                field: "actions",
              },
            },
          ],
        },
      }
  }
}
</script>

<style scoped></style>
