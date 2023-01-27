<template>
  <q-page class="q-pa-md">
    <q-table
      title="Products"
      :rows="products"
      :columns="columns"
      row-key="name"
      :rows-per-page-options="[]"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          label="Create"
          no-caps
          @click="createProduct"
        />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn dense round flat color="grey" @click="editProduct(props.row.id)" icon="edit"></q-btn>
          <q-btn dense round flat color="grey" @click="removeProduct(props.row.id)" icon="delete"></q-btn>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import {useProductStore} from 'stores/product-store';
import {computed, onMounted} from 'vue';
import {useQuasar} from 'quasar';
import {useRouter} from 'vue-router';

const productStore = useProductStore();
const $q = useQuasar();
const router = useRouter();

const products = computed(() => {
  return productStore.getProductsList.map((product) => {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      color: product.color,
      subcategory: product.subcategory ? product.subcategory.title : null
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
    { name: 'price', field: 'price', align: 'left', label: 'Price' },
    { name: 'subcategory', field: 'subcategory', align: 'left', label: 'Subcategory' },
    { name: 'color', field: 'color', align: 'left', label: 'Color' },
    { name: 'actions', field: 'actions', label: 'Actions', align:'center' },
  ]
})

function createProduct() {
  router.push({ name: 'product-create' })
}

function editProduct(id: number) {
  router.push({ name: 'product-details', params: { id } })
}

async function removeProduct(id: number) {
  $q.dialog({
    title: 'Are you sure ?',
    ok: 'Yes',
    cancel: true
  }).onOk( () => {
    void productStore.delete(id);
  })
}

onMounted(async () => {
  await productStore.getAll();
})
</script>
