<template>

  <SuperTable
      :showMap="true"
      :model="superTableModel"
      @clickRow="openRecord"
      :displayMapField="false"
      :parentKeyValuePair="parentKeyValuePair"
      :fetchFlags="fetchFlags"
      :templateListGrid="templateListGrid"
      :viewAs="{
          show: [],
          default: 'grid'
        }"
      :allowedFilters="[]"
  />

</template>

<script>
import { SuperTable } from 'wizweb-fe'
import User from 'src/models/User'

export default {
  name: 'User-list',
  components: {
      SuperTable,
  },

  props: {
      parentKeyValuePair: {
          type: Object,
          default: () => ({})
      },
      fetchFlags: {
          type: Object,
          default: () => ({})
      }
  },

  data() {
    return {
      templateListGrid: {
        cols: [
          // {
          //   width: 12,
          //   dataPoint: {
          //     type: "component",
          //     componentPath: () => import('../events/EventImage.vue'),
          //     label: "",
          //     hideLabel: true,
          //   },
          // },
          {
            width: 12,
            class: "q-pa-md q-col-gutter-sm",
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
              // {
              //   width: 3,
              //   dataPoint: {
              //     type: "function",
              //     function: (item) => `${item.email}`,
              //     label: "Email",
              //     // xOrientation: true,
              //   },
              // },
            ]
          },
        ],
      }
    }
  },
  computed: {
      superTableModel() {
          return User
      },
  },
  methods: {
      openRecord(pVal, item, router) {
          router.push({
              name: '/lists/users/:rId/:rName',
              params: {
                  rId: pVal,
                  rName: pVal,
              },
          })
      },
  },
}
</script>
