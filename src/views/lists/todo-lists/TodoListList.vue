<template>
    <SuperTable
        :showMap="true"
        :model="superTableModel"
        @clickRow="openRecord"
        :displayMapField="false"
        :parentKeyValuePair="parentKeyValuePair"
        :fetchFlags="fetchFlags"
        :noBorder="noBorder"
        :templateListTable="templateListTable"
        :relationships="['tasks']"
    />
</template>

<script>
import { SuperTable } from 'wizweb-fe'
import TodoList from 'src/models/orm-api/TodoList'

export default {
    name: 'TodoList-list',
    components: {
        SuperTable,
    },

    props: {
        noBorder: {
          type: Boolean,
          default: () => {
            return false
          }
        },
        parentKeyValuePair: {
            type: Object,
            default: () => ({})
        },
        fetchFlags: {
            type: Object,
            default: () => ({})
        }
    },
  data(){
    return {
      templateListTable: [
        // {
        //   type: "function",
        //   function: (item) => `${item.dayNumber}`,
        //   label: "Day",
        // },
        // {
        //   type: "function",
        //   function: (item) => `${item.date} `,
        //   label: "Date",
        // },
        {
          field: "id",
        },
        {
          field: "name",
        },
        {
          type: "function",
          function: (item) => `${item.tasks.filter(task => task.status_id === 1).length}/${item.tasks.length}`,
          label: "Completion",
        },
        {
          field: "created_at",
        },
        {
          field: "updated_at",
        },
        {
          hideLabel: true,
          field: "actions",
        },

      ],
    }
  },

    computed: {
        superTableModel() {
            return TodoList
        },
    },
    methods: {
        openRecord(pVal, item, router) {
            router.push({
                name: '/lists/todo-lists/:rId/:rName',
                params: {
                    rId: pVal,
                    rName: pVal,
                },
            })
        },
    },
}
</script>
