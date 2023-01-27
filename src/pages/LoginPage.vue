<template>
  <q-page class="full-height flex justify-center items-center">
      <q-form
        @submit="onSubmit"
        class="form"
      >
        <q-input
          class="q-mt-md"
          type="text"
          label="Email"
          v-model="form.email"
        />

        <q-input
          class="q-mt-md"
          type="password"
          label="Password"
          v-model="form.password"
        />

        <div class="q-mt-md text-center">
          <q-btn label="Submit" type="submit" color="primary"/>
        </div>
      </q-form>
  </q-page>
</template>

<script lang="ts" setup>

import {reactive} from 'vue';
import {useAuthStore} from 'stores/auth-store';
import {useRouter} from 'vue-router';

const form = reactive({
  email: '',
  password: ''
})
const store = useAuthStore();
const router = useRouter();
async function onSubmit() {
  await store.login(form)
  await router.push({name: 'category'})
}
</script>

<style lang="scss">
.form {
  width: 450px;
  border: 1px solid #cbc7c7;
  border-radius: 10px;
  padding: 30px;
}
</style>
