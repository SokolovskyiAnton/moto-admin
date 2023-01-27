<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Admin panel
        </q-toolbar-title>

        <div>
          <q-btn @click="logout">Logout</q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Pages
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import {useAuthStore} from 'stores/auth-store';
import {useRouter} from 'vue-router';

const store = useAuthStore();
const router = useRouter();
const essentialLinks = [
  {
    title: 'Category',
    link: '/category'
  },
  {
    title: 'Subcategory',
    link: '/subcategory'
  },
  {
    title: 'Products',
    link: '/product'
  },
  {
    title: 'Orders',
    link: '/order'
  }
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
async function logout() {
  await store.logout();
  await router.push({ name: 'auth' });
}
</script>
