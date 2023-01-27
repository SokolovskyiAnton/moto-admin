<template>
  <q-page class="q-pa-md">
    <q-table
      title="Subcategories"
      :rows="subcategories"
      :columns="columns"
      row-key="name"
      :rows-per-page-options="[]"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          label="Create"
          no-caps
          @click="createSubcategory"
        />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn dense round flat color="grey" @click="editSubcategory(props.row.id)" icon="edit"></q-btn>
          <q-btn dense round flat color="grey" @click="removeSubcategory(props.row.id)" icon="delete"></q-btn>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import SubcategoryCreateModal from 'components/subcategory/SubcategoryCreateModal.vue';
import {useSubcategoryStore} from 'stores/subcategory-store';
import {useQuasar} from 'quasar';
import {computed, onMounted} from 'vue';
import SubcategoryDetailsModal from 'components/subcategory/SubcategoryDetailsModal.vue';

const store = useSubcategoryStore();
const $q = useQuasar();

const subcategories = computed(() => {
  return store.getSubcategories.map((sub) => {
    return {
      id: sub.id,
      title: sub.title,
      description: sub.description,
      category: sub.category ? sub.category.title : null
     }
  })
});

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
    { name: 'category', field: 'category', align: 'left', label: 'Category'},
    { name: 'actions', field: 'actions', label: 'Actions', align:'center' },
  ]
})

function createSubcategory() {
  $q.dialog({
    component: SubcategoryCreateModal
  })
}

function editSubcategory(id: number) {
  $q.dialog({
    component: SubcategoryDetailsModal,
    componentProps: {
      id,
    }
  })
}

async function removeSubcategory(id: number) {
  $q.dialog({
    title: 'Are you sure ?',
    ok: 'Yes',
    cancel: true
  }).onOk( () => {
    void store.delete(id);
  })
}

onMounted(async () => {
  await store.getAllSubcategories();
})
</script>
