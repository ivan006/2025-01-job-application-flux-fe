<template>
  <div>
    <template v-if="isSmallScreen">
      <!--<template v-if="true">-->
      <q-layout
        view="lHh Lpr lFf"
        style="background-color: #F8F8F8; padding-bottom: 50px;"

      >
        <q-header elevated style="" class="bg-primary">
          <q-toolbar>

            <q-avatar>
              <!--<img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">-->

              <q-icon name="school" size="lg" style="opacity: 50%" />
            </q-avatar>

            <q-toolbar-title>{{ siteTitle }}</q-toolbar-title>
            <q-btn
              flat
              dense
              round
              icon="menu"
              aria-label="Menu"
              @click="toggleLeftDrawer"
            />
          </q-toolbar>
        </q-header>
        <q-drawer
          v-model="leftDrawerOpen"
          show-if-above
          bordered
          side="right"
        >
          <q-list>
            <q-item-label header>
              <!--Essential Links-->
              &nbsp;
            </q-item-label>
            <slot name="menu"></slot>
          </q-list>
        </q-drawer>
        <div class="q-px-md">
          <div class="q-pb-md">
            <slot name="default"></slot>
          </div>
        </div>
      </q-layout>
    </template>
    <template v-else>



      <q-toolbar class="bg-primary text-white">
        <div class="container-md row no-wrap items-center bg-primary text-white">

          <!--<q-btn flat round dense icon="menu" class="q-mr-sm" />-->
          <q-avatar>
            <!--<img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">-->
            <q-icon name="school" size="lg" style="opacity: 50%" />
          </q-avatar>

          <q-toolbar-title>{{ siteTitle }}</q-toolbar-title>

          <!--<q-btn flat round dense icon="whatshot" />-->
          <slot name="menu"></slot>
        </div>

      </q-toolbar>

      <div class="container-md">
        <div class="q-px-md">
          <div class="q-pb-md">
            <slot name="default"></slot>
          </div>
        </div>
      </div>


      <!--<q-layout-->
      <!--  view="lHh Lpr lFf"-->
      <!--  style="background-color: #F8F8F8; padding-bottom: 50px;"-->

      <!--&gt;-->
      <!--  <q-header elevated style="background-color: rgb(0, 31, 63);">-->
      <!--    <q-toolbar>-->
      <!--      <q-btn-->
      <!--        flat-->
      <!--        dense-->
      <!--        round-->
      <!--        icon="menu"-->
      <!--        aria-label="Menu"-->
      <!--        @click="toggleLeftDrawer"-->
      <!--      />-->
      <!--    </q-toolbar>-->
      <!--  </q-header>-->
      <!--  <q-drawer-->
      <!--    v-model="leftDrawerOpen"-->
      <!--    show-if-above-->
      <!--    bordered-->
      <!--  >-->
      <!--    <q-list>-->
      <!--      <q-item-label header>-->
      <!--        &lt;!&ndash;Essential Links&ndash;&gt;-->
      <!--        &nbsp;-->
      <!--      </q-item-label>-->
      <!--      <slot name="menu"></slot>-->
      <!--    </q-list>-->
      <!--  </q-drawer>-->
      <!--  <div class="q-px-md">-->
      <!--    <div class="q-pb-md">-->
      <!--      <slot name="default"></slot>-->
      <!--    </div>-->
      <!--  </div>-->
      <!--</q-layout>-->


      <!--<div class="row no-wrap">-->
      <!--  <div  class="" style="width: 300px; border-right: 1px solid rgba(0, 0, 0, 0.12);">-->
      <!--    <q-list style="padding-top: 10px;">-->
      <!--      <slot name="menu"></slot>-->
      <!--    </q-list>-->
      <!--  </div>-->
      <!--  <div  class="" style="flex: 1; overflow: auto; background-color: 	#F8F8F8; min-height: 100vh;">-->

      <!--    <div class="q-pa-md container-md">-->

      <!--      <slot name="default"></slot>-->
      <!--    </div>-->
      <!--  </div>-->
      <!--</div>-->
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isSmallScreen = ref(false);

const checkScreenWidth = () => {
  isSmallScreen.value = window.innerWidth <= 1151;
};



const leftDrawerOpen = ref(false);
const siteTitle = ref('Lorum Ipsum');

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

onMounted(() => {
  checkScreenWidth();
  window.addEventListener('resize', checkScreenWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenWidth);
});
</script>

