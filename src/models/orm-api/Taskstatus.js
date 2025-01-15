import MyBaseModel from 'src/models/helpers/MyBaseModel';
import Task from 'src/models/orm-api/Task';

export default class Taskstatus extends MyBaseModel {
    static entity = 'taskstatus';
    static entityUrl = '/api/tasks-tatuses';
    static primaryKey = 'id';
    static titleKey = 'name';
    static entityHumanName = 'Taskstatus';
    static openRecord(pVal, item, router){
      router.push({
        name: '/lists/tasks-tatuses/:rId/:rName',
        params: {
          rId: pVal,
          rName: pVal,
        },
      })
    }

    static parentWithables = [

    ];

    static rules = {
        readables: () => true,
        readable: (item) => true,
        editable: (item) => true,
        creatable: () => true,
    };


    static hooks = {
        createComplete: (response) => {
        },
    };

    static fieldsMetadata = {
        'id': {},
            'name': {},
            'description': {},
      'created_at': {
        autoFill(item){
          if (item.created_at){
            return item.created_at
          } else {
            const currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
            return currentTimestamp
          }
        },
      },
      'updated_at': {
        autoFill(item){
          const currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
          return currentTimestamp
        }
      },
    };

    static fields() {
        return {
            'id': this.attr('').nullable(),
            'name': this.attr(''),
            'description': this.attr('').nullable(),
            'created_at': this.attr('').nullable(),
            'updated_at': this.attr('').nullable(),
            'tasks': this.hasMany(Task, 'status_id')
        };
    }

    static FetchAll(relationships = [], flags = {}, moreHeaders = {}, options = { page: 1, limit: 15, filters: {}, clearPrimaryModelOnly: false }) {
        return this.customSupabaseApiFetchAll(
            `${this.baseUrl}${this.entityUrl}`,
            [...this.parentWithables, ...relationships],
            flags,
            this.mergeHeaders(moreHeaders),
            options,
            this
        );
    }

    static FetchById(id, relationships = [], flags = {}, moreHeaders = {}) {
        return this.customSupabaseApiFetchById(
            `${this.baseUrl}${this.entityUrl}`,
            id,
            [...this.parentWithables, ...relationships],
            flags,
            this.mergeHeaders(moreHeaders),
            this
        );
    }

    static Store(entity, relationships = [], flags = {}, moreHeaders = {}) {
        return this.customSupabaseApiStore(
            `${this.baseUrl}${this.entityUrl}`,
            entity,
            [...this.parentWithables, ...relationships],
            flags,
            this.mergeHeaders(moreHeaders),
            this
        );
    }

    static Update(entity, relationships = [], flags = {}, moreHeaders = {}) {
        return this.customSupabaseApiUpdate(
            `${this.baseUrl}${this.entityUrl}`,
            entity,
            [...this.parentWithables, ...relationships],
            flags,
            this.mergeHeaders(moreHeaders),
            this
        );
    }

    static Delete(entityId, flags = {}, moreHeaders = {}) {
        return this.customSupabaseApiDelete(
            `${this.baseUrl}${this.entityUrl}`,
            entityId,
            flags,
            this.mergeHeaders(moreHeaders),
            this
        );
    }
}
