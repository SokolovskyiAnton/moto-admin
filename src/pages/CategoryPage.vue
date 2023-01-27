<template>
  <q-page class="q-pa-md">
    <q-table
      title="Categories"
      :rows="categories"
      :columns="columns"
      row-key="name"
      :rows-per-page-options="[]"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          label="Create"
          no-caps
          @click="createCategory"
        />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn dense round flat color="grey" @click="editCategory(props.row.id)" icon="edit"></q-btn>
          <q-btn dense round flat color="grey" @click="removeCategory(props.row.id)" icon="delete"></q-btn>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import CategoryCreateModal from 'components/category/CategoryCreateModal.vue';
import CategoryDetailsModal from 'components/category/CategoryDetailsModal.vue';
import {useCategoryStore} from 'stores/category-store';
import {computed, onMounted} from 'vue';
import {useQuasar} from 'quasar';

const store = useCategoryStore();
const $q = useQuasar();

const categories = computed(() => store.getCategories)

const columns = computed(() => {
  return [
    {
      name: 'id',
      field: 'id',
      required: true,
      label: 'Id',
      align: 'left',
    },
    { name: 'title', field: 'title', align: 'left', label: 'Title'},
    { name: 'description', field: 'description', align: 'left', label: 'Description', classes: 'description' },
    { name: 'actions', field: 'actions', label: 'Actions', align:'center' },
  ]
})

function editCategory(id: number) {
  $q.dialog({
    component: CategoryDetailsModal,
    componentProps: {
      id
    }
  })
}

async function removeCategory(id: number) {
  $q.dialog({
    title: 'Are you sure ?',
    ok: 'Yes',
    cancel: true
  }).onOk( () => {
    void store.delete(id)
  })
}

function createCategory() {
  $q.dialog({
    component: CategoryCreateModal
  })
}

onMounted(async () => {
  await store.getAllCategories();
})
</script>
