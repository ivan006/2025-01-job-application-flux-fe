import { createStore } from 'vuex';
import VuexORM from '@vuex-orm/core';
import VuexORMAxios from '@vuex-orm/plugin-axios';
import axios from 'axios';

import { DBCrudCacheSet } from 'wizweb-fe';

import User from 'src/models/User'
import Session from 'src/models/Session'
import RouteLineage  from "src/models/RouteLineage";
import Taskstatus from 'src/models/orm-api/Taskstatus';
import Task from 'src/models/orm-api/Task';
import TodoList from 'src/models/orm-api/TodoList';

const database = new VuexORM.Database();

database.register(DBCrudCacheSet);
database.register(User)
database.register(Session)
database.register(RouteLineage)
database.register(Taskstatus);
database.register(Task);
database.register(TodoList);
database.register(User);

const store = createStore({
  plugins: [VuexORM.install(database)]
});

export default store;
