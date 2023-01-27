<template>
  <q-item
    :to="link"
  >
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
export interface EssentialLinkProps {
  title: string;
  link?: string;
}
defineProps<EssentialLinkProps>()
</script>
