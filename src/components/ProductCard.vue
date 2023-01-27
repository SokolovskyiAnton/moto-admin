<template>
  <div class="q-pa-md bg-orange-1 cursor-pointer" @click="handleClick(order_item.product_id)">
    <div>Product</div>
    <div class="q-mt-md">
      Title: {{ order_item.product_title }}
    </div>
    <div class="q-mt-md">
      Total price: {{ order_item.price }}
    </div>
    <div class="q-mt-md">
      Quantity: {{ order_item.quantity }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {OrderItem} from 'stores/dto/order.dto';
import {useRouter} from 'vue-router';

defineProps<{
  order_item: OrderItem;
}>()

const router = useRouter();

function handleClick(id: number) {
  router.push({ name: 'product-details', params: { id } })
}
</script>

<style lang="scss" scoped>

</style>
