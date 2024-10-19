<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

import { useEventStore } from '@/stores/event'

const eventStore = useEventStore()


</script>

<template>
  <div v-if="(eventStore.alert)" class="toast">
    <div class="alert" :class="`alert-${eventStore.data.status}`">
      <span>{{ eventStore.data.message }}</span>
    </div>
  </div>
  <RouterView />
</template>
