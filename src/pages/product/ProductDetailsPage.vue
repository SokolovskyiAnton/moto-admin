<template>
  <q-page class="q-pa-md">
    <h5 class="q-mb-md q-mt-sm">Update product</h5>
    <q-form @submit="handleSubmit">
      <q-input
        v-model="form.title"
        type="text"
        label="Title"
        filled
        class="full-width"
      />
      <q-input
        v-model="form.description"
        type="textarea"
        label="Description"
        filled
        class="full-width q-mt-md"
      />
      <div class="row q-mt-md">
        <q-input
          v-model="form.price"
          type="text"
          label="Price"
          filled
          class="col q-mr-md"
        />
        <q-input
          v-model="form.oldPrice"
          type="text"
          label="Old price (optional)"
          filled
          class="col q-mr-md"
        />
        <q-input
          v-model="form.weight"
          type="text"
          label="Weight"
          filled
          class="col q-mr-md"
        />
        <q-input
          v-model="form.speed"
          type="text"
          label="Speed (MPH)"
          filled
          class="col q-mr-md"
        />
        <q-input
          v-model="form.mileRange"
          type="text"
          label="Mile range"
          filled
          class="col q-mr-md"
        />
        <q-input
          v-model="form.color"
          label="Color"
          stack-label
          type="text"
          filled
          class="col"
        />
      </div>
      <q-select
        v-model="form.subcategory"
        class="q-mt-md"
        outlined
        label="Choose subcategory"
        :options="subcategories"
        option-label="title"
        emit-value
        map-options
      />
      <q-file
        class="q-mt-md"
        outlined
        filled
        label="Desktop images - Upload file"
        stack-label
        @update:model-value="uploadDesktopFiles"
      >
      </q-file>
      <div v-if="form.desktopImages">
        <q-chip
          v-for="file in form.desktopImages"
          :key="file.key"
          color="primary"
          text-color="white"
          class="cursor-pointer"
          removable
          clickable
          @remove="removeDesktopImages(file.key)"
        >
          {{ file.key }}
        </q-chip>
      </div>
      <q-file
        class="q-mt-md"
        outlined
        filled
        label="Mobile images - Upload file"
        stack-label
        @update:model-value="uploadMobileFiles"
      >
      </q-file>
      <div v-if="form.mobileImages">
        <q-chip
          v-for="file in form.mobileImages"
          :key="file.key"
          color="primary"
          text-color="white"
          class="cursor-pointer"
          removable
          clickable
          @remove="removeMobileImages(file.key)"
        >
          {{ file.key }}
        </q-chip>
      </div>

      <q-select
        class="q-mt-md"
        label="Options (Frame Size)"
        filled
        v-model="form.options"
        use-input
        use-chips
        multiple
        hide-dropdown-icon
        input-debounce="0"
        new-value-mode="add"
      />

      <q-input
        v-model="form.optionsTitle"
        type="text"
        label="Options title"
        filled
        class="col q-mt-md"
      />

      <q-select
        v-model="form.isAvailable"
        class="q-mt-md"
        outlined
        label="Is Available"
        :options="availableOptions"
        option-label="title"
        option-value="value"
        emit-value
        map-options
      />

      <q-btn class="q-mt-md full-width" color="primary" type="submit">Update</q-btn>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
// ToDo add notify
import {computed, onMounted, reactive} from 'vue';
import {useProductStore} from 'stores/product-store';
import {useSubcategoryStore} from 'stores/subcategory-store';
import {useRoute} from 'vue-router';
import {ProductDto} from 'stores/dto/product.dto';
import {useQuasar} from 'quasar';

const productStore = useProductStore();
const subcategoryStore = useSubcategoryStore();
const $q = useQuasar();
const route = useRoute();
const id = route.params.id;

const form = reactive<Omit<ProductDto, 'id'>>({
  title: '',
  description: '',
  isAvailable: false,
  price: 0,
  oldPrice: 0,
  weight: 0,
  speed: 0,
  mileRange: 0,
  subcategory: null,
  desktopImages: [],
  mobileImages: [],
  color: '',
  optionsTitle: '',
  options: []
})

const subcategories = computed(() => subcategoryStore.getSubcategories)
const availableOptions = computed(() => {
  return [
    {
      title: 'Yes',
      value: true
    },
    {
      title: 'No',
      value: false
    }
  ]
})
async function handleSubmit() {
  await productStore.update(form, +id)
  $q.notify({
    type: 'positive',
    message: 'Product is updated',
    position: 'top-right'
  })
}

async function uploadDesktopFiles(value: Blob) {
  const file = await productStore.upload(value)
  form.desktopImages.push(file)
}
async function uploadMobileFiles(value: Blob) {
  const file = await productStore.upload(value);
  form.mobileImages.push(file);
}

async function removeDesktopImages(key: string) {
  await productStore.deleteFile(key);
  form.desktopImages = form.desktopImages.filter((item) => item.key !== key)
}
async function removeMobileImages(key: string) {
  await productStore.deleteFile(key);
  form.mobileImages = form.mobileImages.filter((item) => item.key !== key)
}


onMounted(async () => {
  const product = (await productStore.get(+id)).data
  await subcategoryStore.getAllSubcategories();
  form.title = product.title
  form.optionsTitle = product.optionsTitle
  form.options = product.options
  form.color = product.color
  form.description = product.description
  form.speed = product.speed;
  form.isAvailable = product.isAvailable;
  form.mileRange = product.mileRange
  form.price = product.price
  form.weight = product.weight
  form.oldPrice = product.oldPrice;
  form.subcategory = product.subcategory
  form.desktopImages = product.desktopImages;
  form.mobileImages = product.mobileImages
})
</script>
