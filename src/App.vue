<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import VuexORM from '@vuex-orm/core';
import VuexORMAxios from '@vuex-orm/plugin-axios';
import axios from 'axios';
import { generateRouteLineages } from 'src/store/modules/routeLineages';

defineOptions({
  name: 'App'
});

onMounted(() => {
  const store = useStore();
  const router = useRouter();

  // Initialize Vuex ORM with Axios plugin
  VuexORM.use(VuexORMAxios, {axios, baseURL: 'http://aiv-team-2.0.test/api'});


  // Ensure router and routes are available
  if (router && router.options && router.options.routes) {
    generateRouteLineages(router.options.routes);
  } else {
    console.error('Router is not properly initialized or routes are not accessible.');
  }
});
</script>
