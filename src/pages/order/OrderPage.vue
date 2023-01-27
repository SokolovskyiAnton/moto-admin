<template>
  <q-page class="q-pa-md">
    <q-table
      title="Orders"
      :rows="orders"
      :columns="columns"
      row-key="name"
      :rows-per-page-options="[12]"
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
          <q-btn dense round flat color="grey" @click="showOrder(props.row.id)" icon="edit"></q-btn>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import {useOrderStore} from 'stores/order-store';
import {computed, onMounted} from 'vue';
import {OrderDto} from 'stores/dto/order.dto';
import {useRouter} from 'vue-router';

const store = useOrderStore();
const router = useRouter();

const columns = computed(() => {
  return [
    {
      name: 'id',
      field: 'id',
      required: true,
      label: 'Id',
      align: 'left',
    },
    { name: 'transaction_id', field: 'transaction_id', align: 'left', label: 'Trans. id'},
    { name: 'user_email', field: 'user_email', align: 'left', label: 'User email' },
    { name: 'amount_total', field: 'amount_total', align: 'left', label: 'Amount total'},
    { name: 'complete', field: 'complete', align: 'left', label: 'Complete'},
    { name: 'actions', field: 'actions', label: 'Actions', align:'center' },
  ]
})
const orders = computed<OrderDto[]>(() => {
  return store.getOrders
})

function showOrder(id: number) {
  router.push({ name: 'order-details', params: { id } })
}

onMounted(async () => {
  await store.getAllOrders();
})
</script>
