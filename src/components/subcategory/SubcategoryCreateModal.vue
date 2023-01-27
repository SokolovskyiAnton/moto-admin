<template>
  <q-dialog
    ref="dialogRef"
  >
    <q-card class="create">
      <q-card-section class="flex justify-end">
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="">
        <q-input
          v-model="form.title"
          label="Title"
          type="text"
          outlined
        />
        <q-input
          class="q-mt-md"
          label="Description"
          v-model="form.description"
          type="textarea"
          outlined
        />
        <q-select
          v-model="form.category"
          class="q-mt-md"
          outlined
          label="Category"
          :options="categories"
          option-label="title"
          option-value="id"
          emit-value
          map-options
        />
      </q-card-section>
      <q-card-actions class="q-pa-md" align="right">
        <q-btn color="primary" @click="createSubcategory" :disable="isLoading" class="full-width q-mt-lg">Create</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { useDialogPluginComponent } from 'quasar'
import {computed, reactive, ref} from 'vue'
import {useCategoryStore} from 'stores/category-store';
import {useSubcategoryStore} from 'stores/subcategory-store';

const { dialogRef, onDialogHide } = useDialogPluginComponent()
const categoryStore = useCategoryStore();
const subcategoryStore = useSubcategoryStore()
const isLoading = ref(false)
const form = reactive({
  title: '',
  description: '',
  category: null
})

const categories = computed(() => {
  return [{id: null, title: 'Delete category'}, ...categoryStore.getCategories]
})

async function createSubcategory() {
  try {
    isLoading.value = true
    await subcategoryStore.create(form)
  } finally {
    isLoading.value = false
    onDialogHide()
  }
}
</script>

<style lang="scss">
.create {
  width: 640px;
}
</style>
