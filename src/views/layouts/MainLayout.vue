<template>
  <MainLayoutHelper>
    <template v-slot:menu>
      <template v-for="link in linksList" :key="link.title || link.groupTitle">
        <template v-if="link.groupTitle">
          <q-item-label header>{{ link.groupTitle }}</q-item-label>

          <EssentialLink
            v-for="sublink in link.links"
            :key="sublink.title"
            v-bind="sublink"
            :active-route="activeRoute"
            :indent="true"
          />
        </template>
        <template v-else>
          <EssentialLink
            v-bind="link"
            :active-route="activeRoute"
            :indent="false"
          />
        </template>
      </template>
    </template>
    <template v-slot:default>
      <q-page-container>


        <div class="q-mb-md">
          <BreadcrumbsComp />
        </div>
        <router-view @route-changed="updateActiveRoute" />
      </q-page-container>
    </template>
  </MainLayoutHelper>
</template>

<script setup>
import {computed, ref, watch} from 'vue';
import { useRoute } from 'vue-router';
import EssentialLink from 'src/views/EssentialLink.vue';
import MainLayoutHelper from "src/views/layouts/MainLayoutHelper.vue";
import BreadcrumbsComp from "src/views/BreadcrumbsComp.vue";
import VueCookies from "vue-cookies";

defineOptions({
  name: 'MainLayout'
});

const route = useRoute();
const activeRoute = ref(route.path);

watch(route, (newRoute) => {
  activeRoute.value = newRoute.path;
});

const session = computed(() => {
  return VueCookies.get('VITE_AUTH');
});

const linksList = computed(() => {

  const linksList = [
    ///
  ];


  if (session.value){
    const myAccount = `/lists/users/${session.value.user.id}/${session.value.user.name}`


    linksList.push({
      icon: 'person',
      title: 'My Account',
      route: myAccount,
    })
    linksList.push({
      icon: 'logout',
      title: 'Logout',
      function: ()=>{
        VueCookies.remove('VITE_AUTH');
        window.location.href = '/';

      },
    })
  } else {

    linksList.push({
      icon: 'person',
      title: 'Login',
      route: '/login',
    })
    linksList.push({
      icon: 'edit',
      title: 'Register',
      route: '/register',
    })
  }

  linksList.push({
    // icon: 'event',
    icon: 'info',
    title: 'About',
    route: '/about',
  })

  return linksList

});



function updateActiveRoute(newRoute) {
  activeRoute.value = newRoute;
}
</script>
