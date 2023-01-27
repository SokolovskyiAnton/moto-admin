<template>
  <q-page class="q-pa-md">
    <q-input
      v-model="order.first_name"
      type="text"
      label="First name"
      filled
      class="full-width"
    />
    <q-input
      v-model="order.last_name"
      type="text"
      label="Last name"
      filled
      class="full-width q-mt-md"
    />
    <div class="row q-mt-md">
      <q-input
        v-model="order.city"
        type="text"
        label="City"
        filled
        class="col q-mr-md"
      />
      <q-input
        v-model="order.country"
        type="text"
        label="Country"
        filled
        class="col q-mr-md"
      />
      <q-input
        v-model="order.address"
        type="text"
        label="Address"
        filled
        class="col q-mr-md"
      />
      <q-input
        v-model="order.zip"
        type="text"
        label="Zip"
        filled
        class="col q-mr-md"
      />
    </div>
    <q-input
      v-model="order.phone"
      type="text"
      label="Phone"
      filled
      class="full-width q-mt-md"
    />
    <q-input
      v-model="order.user_email"
      type="text"
      label="User email"
      filled
      class="full-width q-mt-md"
    />
    <q-input
      v-model="order.transaction_id"
      type="text"
      label="Trans. id"
      filled
      class="full-width q-mt-md"
    />
    <q-input
      v-model="order.complete"
      type="text"
      label="Complete"
      filled
      class="full-width q-mt-md"
    />
    <q-input
      v-model="order.amount_total"
      type="text"
      label="Amount"
      filled
      class="full-width q-mt-md"
    />

    <div class="q-mt-md" v-if="order.order_items">
      <div class="row">
        <ProductCard v-for="item in order.order_items" :key="item.id" :order_item="item" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {useOrderStore} from 'stores/order-store';
import {useRoute} from 'vue-router';
import {onMounted, ref} from 'vue';
import {OrderDto} from 'stores/dto/order.dto';
import ProductCard from 'components/ProductCard.vue';

const orderStore = useOrderStore();
const route = useRoute();
const isLoading = ref(true)
const order = ref<Omit<OrderDto, 'id' | 'user_id'>>({
  address: '',
  city: '',
  zip: '',
  first_name: '',
  last_name: '',
  country: '',
  amount_total: 0,
  complete: false,
  phone: '',
  order_items: [],
  user_email: '',
  transaction_id: '',
})

onMounted(async () => {
  const id = route.params.id;
  try {
    isLoading.value = true;
    order.value = (await orderStore.get(+id)).data;
  } finally {
    isLoading.value = false
  }

})
</script>

